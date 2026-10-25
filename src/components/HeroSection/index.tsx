import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { buttonVariants } from '@/components/ui/button'

const HeroSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let hero: Awaited<ReturnType<typeof payload.findGlobal>> | null = null

  try {
    hero = await payload.findGlobal({ slug: 'hero' })
  } catch {
    hero = null
  }

  const badge = hero?.badge || 'Payload CMS'
  const title = hero?.title || 'Ship your next idea with confidence.'
  const description =
    hero?.description ||
    'Launch a polished digital experience with flexible content, streamlined workflows, and a modern frontend built for growth.'

  const primaryCtaLabel = hero?.primaryCta?.label || 'Go to admin panel'
  const primaryCtaLink = hero?.primaryCta?.link || '/admin'
  const secondaryCtaLabel = hero?.secondaryCta?.label || 'Documentation'
  const secondaryCtaLink = hero?.secondaryCta?.link || 'https://payloadcms.com/docs'

  const heroImage = hero?.image ?? null
  const imageUrl =
    typeof heroImage === 'object' &&
    heroImage !== null &&
    'url' in heroImage &&
    typeof heroImage.url === 'string'
      ? heroImage.url
      : null

  const defaultStats = [
    { label: 'Services', value: '24+' },
    { label: 'Launch time', value: '2x faster' },
    { label: 'Uptime', value: '99.9%' },
  ]

  const stats = Array.isArray(hero?.stats) && hero.stats.length > 0 ? hero.stats : defaultStats

  const isExternalLink = (link: string) => /^https?:\/\//i.test(link)

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-3xl" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {badge}
          </div>

          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCtaLink}
              target={isExternalLink(primaryCtaLink) ? '_blank' : undefined}
              rel={isExternalLink(primaryCtaLink) ? 'noopener noreferrer' : undefined}
              className={buttonVariants({ variant: 'default', size: 'lg' })}
            >
              {primaryCtaLabel}
            </Link>

            <Link
              href={secondaryCtaLink}
              target={isExternalLink(secondaryCtaLink) ? '_blank' : undefined}
              rel={isExternalLink(secondaryCtaLink) ? 'noopener noreferrer' : undefined}
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              {secondaryCtaLabel}
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm"
              >
                <p className="text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-border bg-card/80 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-background">
              {imageUrl ? (
                <div className="relative h-[420px] w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center bg-gradient-to-br from-primary/15 via-background to-secondary/10">
                  <div className="rounded-3xl border border-border bg-background/80 p-8 text-center shadow-sm backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Preview
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-foreground">{title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
