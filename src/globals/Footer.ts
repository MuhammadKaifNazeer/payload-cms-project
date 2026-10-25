import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image',
    },
    {
      name: 'websiteTitle',
      type: 'text',
      required: true,
      label: 'Website Title',
      defaultValue: 'My Brand',
    },
    {
      name: 'copywriteText',
      type: 'text',
      required: true,
      label: 'Copywrite Text',
    },
  ],
}
