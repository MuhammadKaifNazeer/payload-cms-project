import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import { ThemeToggler } from '@/components/theme-toggler'
import Link from 'next/link'

const Navbar = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let navbar: Awaited<ReturnType<typeof payload.findGlobal>> | null = null

  try {
    navbar = await payload.findGlobal({ slug: 'navbar' })
  } catch {
    navbar = null
  }

  const navLinks = navbar?.navLinks ?? []
  const logo = navbar?.logo ?? null
  const logoUrl =
    typeof logo === 'object' && logo !== null && 'url' in logo && typeof logo.url === 'string'
      ? logo.url
      : null
  const websiteTitle = navbar?.websiteTitle || 'My Brand'
  const ctaLabel = navbar?.ctaLabel || 'Book a Call'
  const ctaLink = navbar?.ctaLink || '#contact'

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={websiteTitle}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {websiteTitle.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {websiteTitle}
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) => (
            <a
              key={`${link.label ?? 'nav-link'}-${index}`}
              href={link.href ?? '#'}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label ?? 'Link'}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href={ctaLink}>
            <Button variant="default">{ctaLabel}</Button>
          </Link>
          <ThemeToggler />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
