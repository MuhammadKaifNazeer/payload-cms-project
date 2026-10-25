import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

const ServicesSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const servicesResult = await payload.find({
    collection: 'services',
  })

  const services = servicesResult.docs

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            What we do
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No services yet. Add some entries in the admin panel.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:bg-muted"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Service
              </div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="text-base leading-7 text-muted-foreground">{service.supportline}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ServicesSection
