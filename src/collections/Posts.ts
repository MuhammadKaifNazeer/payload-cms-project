import {
  BlocksFeature,
  CodeBlock,
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Author',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),

          BlocksFeature({
            blocks: [
              CodeBlock({
                defaultLanguage: 'ts',
                languages: {
                  plaintext: 'Plain Text',

                  // JavaScript / TypeScript
                  js: 'JavaScript',
                  mjs: 'JavaScript',
                  cjs: 'CommonJS',
                  ts: 'TypeScript',
                  jsx: 'JSX',
                  tsx: 'TSX',

                  // Web
                  html: 'HTML',
                  htm: 'HTML',
                  css: 'CSS',
                  scss: 'SCSS',
                  sass: 'Sass',
                  less: 'Less',
                  vue: 'Vue',
                  svelte: 'Svelte',

                  // Data / Config
                  json: 'JSON',
                  jsonc: 'JSON with Comments',
                  yaml: 'YAML',
                  yml: 'YAML',
                  toml: 'TOML',
                  xml: 'XML',
                  csv: 'CSV',

                  // Shell / Terminal
                  bash: 'Bash',
                  shell: 'Shell',
                  sh: 'Shell',
                  zsh: 'Zsh',
                  fish: 'Fish',
                  powershell: 'PowerShell',
                  ps1: 'PowerShell',
                  cmd: 'Batch',

                  // Python
                  py: 'Python',
                  pyw: 'Python',

                  // Java / JVM
                  java: 'Java',
                  kt: 'Kotlin',
                  kts: 'Kotlin Script',
                  scala: 'Scala',
                  groovy: 'Groovy',

                  // C / C++
                  c: 'C',
                  h: 'C Header',
                  cpp: 'C++',
                  cc: 'C++',
                  cxx: 'C++',
                  hpp: 'C++ Header',

                  // C#
                  cs: 'C#',

                  // Go
                  go: 'Go',

                  // Rust
                  rs: 'Rust',

                  // PHP
                  php: 'PHP',

                  // Ruby
                  rb: 'Ruby',
                  erb: 'ERB',

                  // Swift / Objective-C
                  swift: 'Swift',
                  m: 'Objective-C',
                  mm: 'Objective-C++',

                  // Dart
                  dart: 'Dart',

                  // R
                  r: 'R',

                  // SQL / Databases
                  sql: 'SQL',
                  plsql: 'PL/SQL',
                  psql: 'PL/pgSQL',
                  graphql: 'GraphQL',
                  gql: 'GraphQL',

                  // Template Languages
                  ejs: 'EJS',
                  pug: 'Pug',
                  njk: 'Nunjucks',
                  twig: 'Twig',
                  liquid: 'Liquid',

                  // Infrastructure / DevOps
                  dockerfile: 'Dockerfile',
                  docker: 'Docker',
                  tf: 'Terraform',
                  hcl: 'HCL',
                  nginx: 'Nginx',
                },
              }),
            ],
          }),
        ],
      }),
    },
  ],
}
