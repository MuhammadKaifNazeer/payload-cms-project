import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      defaultValue: 'Payload CMS',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Ship your next idea with confidence.',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      defaultValue:
        'Launch a polished digital experience with flexible content, streamlined workflows, and a modern frontend built for growth.',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Button Label',
          defaultValue: 'Go to admin panel',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Button Link',
          defaultValue: '/admin',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Button Label',
          defaultValue: 'Documentation',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Button Link',
          defaultValue: 'https://payloadcms.com/docs',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Quick Stats',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
  ],
}
