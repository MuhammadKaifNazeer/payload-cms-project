import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

const TestimonialsSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const testimonialsResult = await payload.find({
    collection: 'testimonials',
  })

  const testimonials = testimonialsResult.docs

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Feedback
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Testimonials
          </h2>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No testimonials available yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:bg-muted"
            >
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <p className="mb-5 text-base leading-7 text-card-foreground/80">
                “{testimonial.testimonial}”
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default TestimonialsSection
