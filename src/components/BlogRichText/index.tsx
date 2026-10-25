import { RichText } from '@payloadcms/richtext-lexical/react'

import type {
  SerializedTableCellNode,
  SerializedTableNode,
  SerializedTableRowNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { CodeBlock } from '../CodeBlock'
import type { JSXConverterArgs, JSXConverters } from '@payloadcms/richtext-lexical/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  data: SerializedEditorState
}

const converters = ({ defaultConverters }: { defaultConverters: JSXConverters }) => ({
  ...defaultConverters,

  table: ({ node, nodesToJSX }: JSXConverterArgs<SerializedTableNode>) => {
    const isHeaderRow = (row: SerializedTableRowNode) =>
      row.children.length > 0 &&
      row.children.every(
        (cell) =>
          cell.type === 'tablecell' &&
          'headerState' in cell &&
          typeof cell.headerState === 'number' &&
          (cell.headerState & 1) === 1,
      )
    const isTableRow = (child: (typeof node.children)[number]): child is SerializedTableRowNode =>
      child.type === 'tablerow'
    const headerRows = node.children.filter((child) => isTableRow(child) && isHeaderRow(child))
    const bodyRows = node.children.filter((child) => isTableRow(child) && !isHeaderRow(child))

    return (
      <div className="not-prose my-8 w-full rounded-lg border border-border overflow-hidden">
        <Table className="w-full" style={{ textAlign: node.format || undefined }}>
          {headerRows.length > 0 ? (
            <TableHeader className="bg-muted/50">{nodesToJSX({ nodes: headerRows })}</TableHeader>
          ) : null}
          {bodyRows.length > 0 ? <TableBody>{nodesToJSX({ nodes: bodyRows })}</TableBody> : null}
        </Table>
      </div>
    )
  },
  tablerow: ({ node, nodesToJSX }: JSXConverterArgs<SerializedTableRowNode>) => (
    <TableRow>{nodesToJSX({ nodes: node.children })}</TableRow>
  ),
  tablecell: ({ node, nodesToJSX }: JSXConverterArgs<SerializedTableCellNode>) => {
    const Cell = node.headerState > 0 ? TableHead : TableCell

    return (
      <Cell
        colSpan={node.colSpan && node.colSpan > 1 ? node.colSpan : undefined}
        rowSpan={node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined}
        className={node.headerState > 0 ? 'bg-muted/50 font-semibold text-foreground' : undefined}
        style={{
          ...(node.backgroundColor ? { backgroundColor: node.backgroundColor } : {}),
          textAlign: node.format || undefined,
        }}
      >
        {nodesToJSX({ nodes: node.children })}
      </Cell>
    )
  },
  blocks: {
    ...defaultConverters.blocks,

    Code: ({ node }: { node: any }) => {
      const { code, language, blockName } = node.fields
      return (
        <CodeBlock filename={blockName || undefined} language={language || undefined} code={code} />
      )
    },
  },
})

export function BlogRichText({ data }: Props) {
  return <RichText data={data} converters={converters} />
}
