import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Footer as FooterType } from '@/payload-types'

const Footer = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let footer: FooterType | null = null

  try {
    footer = await payload.findGlobal({ slug: 'footer' })
  } catch {
    footer = null
  }

  const logo = footer?.logo ?? null
  const logoUrl =
    typeof logo === 'object' && logo !== null && 'url' in logo && typeof logo.url === 'string'
      ? logo.url
      : null
  const websiteTitle = footer?.websiteTitle || 'My Brand'
  const currentYear = new Date().getFullYear()
  const copywriteText =
    footer?.copywriteText || `© ${currentYear} ${websiteTitle}. All rights reserved.`

  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted shadow-sm ring-1 ring-border/60">
            {logoUrl ? (
              <img src={logoUrl} alt={websiteTitle} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-foreground">
                {websiteTitle.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Powered by
            </p>
            <p className="text-lg font-semibold tracking-tight text-foreground">{websiteTitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
          <p>{copywriteText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
