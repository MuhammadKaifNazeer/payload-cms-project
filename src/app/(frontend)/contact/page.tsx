import { getPayload } from 'payload'

import config from '@/payload.config'
import ContactForm from '@/components/ContactForm'

const defaultFields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project',
    required: true,
  },
]

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const contact = (await payload.findGlobal({ slug: 'contact' })) as any

  const title = contact?.title || 'Contact us'
  const description =
    contact?.description ||
    'Tell us about your project and we will get back to you as soon as possible.'
  const phone = contact?.phone || '+1 (555) 123-4567'
  const email = contact?.email || 'hello@yourbrand.com'
  const address = contact?.address || '123 Market Street, San Francisco, CA 94103'
  const hours = contact?.hours || 'Monday - Friday\n9:00 AM - 6:00 PM'
  const formTitle = contact?.form?.title || 'Send us a message'
  const formDescription =
    contact?.form?.description || 'We usually respond within one business day.'
  const formFields =
    Array.isArray(contact?.form?.contactFormFields) && contact.form.contactFormFields.length > 0
      ? contact.form.contactFormFields.map((field: any) => ({
          name: field.name,
          label: field.label,
          type: field.type || 'text',
          placeholder: field.placeholder || '',
          required: Boolean(field.required),
        }))
      : defaultFields

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] border border-border bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Reach us
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a
                  href={`tel:${phone}`}
                  className="mt-1 block text-lg font-semibold text-foreground"
                >
                  {phone}
                </a>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block text-lg font-semibold text-foreground"
                >
                  {email}
                </a>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="mt-1 text-lg font-semibold leading-7 text-foreground">{address}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Hours</p>
                <p className="mt-1 whitespace-pre-line text-lg font-semibold leading-7 text-foreground">
                  {hours}
                </p>
              </div>
            </div>
          </div>

          <ContactForm
            formTitle={formTitle}
            formDescription={formDescription}
            fields={formFields}
          />
        </div>
      </div>
    </main>
  )
}
