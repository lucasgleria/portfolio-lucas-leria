'use client'

import { useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/portfolio/content'

export function PortfolioDialog({ open, onClose, title, description, language, children }: {
  open: boolean; onClose: () => void; title: string; description: string; language: Language; children: ReactNode
}) {
  const returnFocus = useRef<HTMLElement | null>(null)
  return (
    <Dialog open={open} onOpenChange={next => { if (!next) onClose() }}>
      <DialogContent
        lang={language}
        showCloseButton={false}
        className="flex max-h-[90dvh] flex-col overflow-hidden border-white/15 bg-portfolio-surface p-0 text-gray-100 sm:max-w-5xl"
        onOpenAutoFocus={() => { returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null }}
        onCloseAutoFocus={event => { event.preventDefault(); if (returnFocus.current?.isConnected) returnFocus.current.focus() }}
      >
        <header className="border-b border-white/10 p-5 pr-20 sm:p-6 sm:pr-20">
          <DialogTitle className="text-xl leading-7">{title}</DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-6 text-gray-400">{description}</DialogDescription>
        </header>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label={language === 'pt-BR' ? 'Fechar janela' : 'Close dialog'} className="absolute top-3 right-3 size-11 text-gray-300 hover:bg-white/10 hover:text-white">
          <X aria-hidden="true" />
        </Button>
        <div className="terminal-scrollbar min-h-0 overflow-y-auto p-5 sm:p-6">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
