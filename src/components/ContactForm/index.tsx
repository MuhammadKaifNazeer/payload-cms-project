'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
}

type ContactFormProps = {
  formTitle: string
  formDescription: string
  fields: FormField[]
}

const fallbackFields: FormField[] = [
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

export default function ContactForm({ formTitle, formDescription, fields }: ContactFormProps) {
  const formFields = fields && fields.length > 0 ? fields : fallbackFields
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('pending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.')
      }

      setValues({})
      setStatus('success')
      setFeedback('Your message has been sent successfully. We will get back to you soon.')
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Failed to send your message.')
    }
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card/70 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{formTitle}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{formDescription}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formFields.map((field) => {
          const hasValue = values[field.name] ?? ''
          const commonClasses =
            'w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

          return (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium text-foreground">
                {field.label}
                {field.required ? <span className="text-destructive"> *</span> : null}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  value={hasValue}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={5}
                  className={commonClasses}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  value={hasValue}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={commonClasses}
                />
              )}
            </div>
          )
        })}

        {feedback ? (
          <p
            className={`text-sm ${
              status === 'success'
                ? 'text-emerald-600'
                : status === 'error'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
            }`}
          >
            {feedback}
          </p>
        ) : null}

        <Button type="submit" className="w-full sm:w-auto" disabled={status === 'pending'}>
          {status === 'pending' ? 'Sending...' : 'Send message'}
        </Button>
      </form>
    </div>
  )
}
