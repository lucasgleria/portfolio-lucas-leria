import { isAssistantLink, type AssistantLink } from '@/lib/assistant-conversation'

export function AssistantAnswer({ response, links = [] }: { response: string; links?: AssistantLink[] }) {
  return <div className="min-w-0 space-y-3">
    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">{response}</p>
    {links.length > 0 && <ul aria-label="Links" className="flex flex-wrap gap-2">
      {links.filter(isAssistantLink).map(link => <li key={link.url}>
        <a href={link.url} target={link.url.startsWith('https:') ? '_blank' : undefined} rel={link.url.startsWith('https:') ? 'noopener noreferrer' : undefined} className="inline-flex min-h-11 items-center rounded-lg border border-emerald-300/20 px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">{link.label}</a>
      </li>)}
    </ul>}
  </div>
}
