import type { GlobalConfig } from 'payload'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: 'Navbar',
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
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Link',
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      label: 'CTA Label',
      defaultValue: 'Book a Call',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      label: 'CTA Link',
      defaultValue: '#contact',
    },
  ],
}
