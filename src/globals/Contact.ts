import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Contact',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Contact us',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Page Description',
      defaultValue: 'Tell us about your project and we will get back to you as soon as possible.',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: '+1 (555) 123-4567',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'hello@yourbrand.com',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue: '123 Market Street, San Francisco, CA 94103',
    },
    {
      name: 'hours',
      type: 'textarea',
      label: 'Business Hours',
      defaultValue: 'Monday - Friday\n9:00 AM - 6:00 PM',
    },
    {
      name: 'form',
      type: 'group',
      label: 'Contact Form',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Form Title',
          defaultValue: 'Send us a message',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Form Description',
          defaultValue: 'We usually respond within one business day.',
        },
        {
          name: 'contactFormFields',
          type: 'array',
          label: 'Contact Form Fields',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Field Name',
              admin: {
                description: 'Use a unique key like name, email, phone, company, message',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Field Label',
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              label: 'Field Type',
              defaultValue: 'text',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'tel' },
                { label: 'Textarea', value: 'textarea' },
              ],
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder',
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
