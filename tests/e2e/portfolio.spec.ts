import { test, expect, type Page } from '@playwright/test'

const treinoSlug = 'treino-ia-offline-first-workout-planning-pwa'
async function runCommand(page: Page, command: string) {
  const input = page.getByRole('textbox', { name: 'Comando do terminal', exact: true })
  await input.fill(command)
  await input.press('Enter')
  return input
}

test('language comes before interface selection and survives route navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Português (Brasil)', exact: true }).last().click()
  await page.getByRole('button', { name: 'Interface visual', exact: true }).click()
  await expect(page).toHaveURL(/\/visual\?lang=pt-BR/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideias em software.')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideias em software.')
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Escolha sua interface' })).toBeVisible()
})

test('project search normalizes accents, filters categories and recovers from an empty result', async ({ page }) => {
  await page.goto('/visual?lang=pt-BR')
  const search = page.getByLabel('Buscar projetos', { exact: true })
  await search.fill('inteligencia')
  await expect(page.locator('#projects article')).toHaveCount(3)
  await search.fill('no-matching-project-here')
  await expect(page.getByText('Nenhum projeto encontrado.', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Limpar filtros', exact: true }).click()
  await page.getByRole('button', { name: 'Jogos', exact: true }).click()
  await expect(page.locator('#projects article')).toHaveCount(2)
  await expect(page.locator('#projects')).toContainText('The Forca')
})

test('project details close with Escape, restore focus and fit the viewport', async ({ page }) => {
  await page.goto('/visual?lang=pt-BR')
  const trigger = page.getByRole('button', { name: 'Ver detalhes: Treino IA', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: 'Treino IA', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test('Terminal history traverses every command, restores draft and clears the output', async ({ page }) => {
  await page.goto('/terminal?lang=pt-BR')
  await runCommand(page, 'about')
  await runCommand(page, 'skills')
  const input = await runCommand(page, 'projects')
  await input.fill('rascunho')
  for (const command of ['projects', 'skills', 'about']) { await input.press('ArrowUp'); await expect(input).toHaveValue(command) }
  for (const command of ['skills', 'projects', 'rascunho']) { await input.press('ArrowDown'); await expect(input).toHaveValue(command) }
  await runCommand(page, 'clear')
  await expect(page.getByRole('log', { name: 'Saída dos comandos' })).toBeEmpty()
})

test('Terminal project dialog and nested details return focus to the command input', async ({ page }) => {
  await page.goto('/terminal?lang=pt-BR')
  const input = await runCommand(page, 'production')
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: 'Projetos, produtos e cases', exact: true })).toBeVisible()
  await dialog.getByRole('button', { name: 'Ver detalhes: vault-template', exact: true }).click()
  await expect(page.getByRole('dialog').last().getByRole('heading', { name: 'vault-template', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('heading', { name: 'Projetos, produtos e cases', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(input).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test('assistant receives the selected locale and identifies a local answer', async ({ page }) => {
  await page.goto('/terminal?lang=pt-BR')
  await runCommand(page, 'lerchat')
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('textbox', { name: 'Sua pergunta' }).fill('vault-template')
  const request = page.waitForRequest(request => request.url().endsWith('/api/ler'))
  await dialog.getByRole('button', { name: 'Enviar', exact: true }).click()
  expect((await request).postDataJSON().language).toBe('pt-BR')
  await expect(dialog.getByRole('log')).toContainText('Template público')
  await expect(dialog.getByText('Base profissional local', { exact: true })).toBeVisible()
})

test('chat recovers after an HTTP rate-limit response', async ({ page }) => {
  await page.route('**/api/ler', route => route.fulfill({ status: 429, contentType: 'application/json', body: '{}' }))
  await page.goto('/terminal?lang=pt-BR')
  await runCommand(page, 'lerchat')
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('textbox', { name: 'Sua pergunta' }).fill('vault-template')
  await dialog.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(dialog.getByRole('log')).toContainText('Muitas solicitações')
  await expect(dialog.getByRole('textbox', { name: 'Sua pergunta' })).toBeEnabled()
})

test('direct project page is server rendered, reloadable and links back to the selected language', async ({ page, request }) => {
  const url = `/projects/${treinoSlug}?lang=pt-BR`
  const response = await request.get(url)
  expect(response.status()).toBe(200)
  const html = await response.text()
  expect(html).toContain('Minha contribuição')
  expect(html).toContain('Treino IA')
  await page.goto(url)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Treino IA')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Problema', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Voltar aos projetos', exact: true }).click()
  await expect(page).toHaveURL(/\/visual\?lang=pt-BR#projects/)
})
