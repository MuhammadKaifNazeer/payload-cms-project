import type { CollectionConfig } from 'payload'

const formatSubmittedData = (data: Record<string, unknown> | null | undefined) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return ''
  }

  return Object.entries(data)
    .map(([key, value]) => {
      const humanKey = key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
      const formattedValue =
        typeof value === 'string' ? value : value === null ? 'null' : JSON.stringify(value)

      return `${humanKey}: ${formattedValue}`
    })
    .join('\n')
}

export const ContactFormResponses: CollectionConfig = {
  slug: 'contact-form-responses',
  access: {
    create: () => false,
    read: () => true,
  },
  admin: {
    useAsTitle: 'responseText',
    group: 'Contact',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) {
          return data
        }

        if (data.submittedData && typeof data.submittedData === 'object') {
          data.responseText = formatSubmittedData(data.submittedData as Record<string, unknown>)
        }

        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc) {
          return doc
        }

        if (!doc.responseText && doc.submittedData && typeof doc.submittedData === 'object') {
          doc.responseText = formatSubmittedData(doc.submittedData as Record<string, unknown>)
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'submittedData',
      type: 'json',
      label: 'Submitted Data',
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'responseText',
      type: 'textarea',
      label: 'Response (Read-Only)',
      admin: {
        readOnly: true,
        className: 'response-text-field',
      },
    },
  ],
}
