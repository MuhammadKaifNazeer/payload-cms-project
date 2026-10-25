'use client'

import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTheme } from 'next-themes'
import { Check, ChevronDown, ChevronUp, Copy, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
  className?: string
  language: string
  filename?: string
  highlightLines?: number[]
  showLineNumbers?: boolean
  copyButton?: boolean
  copyButtonVisibility?: 'always' | 'onHover'
  showExpandCollapseButtons?: boolean
  buttonVariant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: Array<{
        name: string
        code: string
        language?: string
        highlightLines?: number[]
      }>
    }
)

export const CodeBlock = ({
  className,
  language,
  filename,
  code,
  highlightLines = [],
  showLineNumbers = true,
  copyButton = true,
  copyButtonVisibility = 'always',
  tabs = [],
  showExpandCollapseButtons = true,
  buttonVariant = 'secondary',
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const { resolvedTheme } = useTheme()

  const isDarkTheme = resolvedTheme === 'dark'

  const tabsExist = tabs.length > 0

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeCode = tabsExist ? tabs[activeTab].code : code
  const activeLanguage = tabsExist ? tabs[activeTab].language || language : language
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines

  const codeLines = activeCode?.split('\n') || []
  const oneLiner = codeLines.length === 1

  if (oneLiner) {
    showLineNumbers = false
  }

  const positionClass = 'absolute top-2 right-2'

  const shouldShowButtons = codeLines.length > 20

  useEffect(() => {
    if (showExpandCollapseButtons === false) {
      setIsExpanded(true)
    }
  }, [showExpandCollapseButtons])

  return (
    <div
      className={cn(
        'not-prose relative w-full rounded-lg bg-background border font-mono text-sm overflow-hidden group my-4',
        className,
      )}
    >
      {tabsExist && (
        <div className={'flex flex-col gap-2 px-2 py-2 bg-card border-b'}>
          <div className={'flex items-center justify-between gap-2 w-full'}>
            <ScrollArea className={'flex'}>
              <div className={'flex w-max'}>
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      'px-3 !py-2 text-xs transition-colors font-sans',
                      activeTab === index
                        ? ''
                        : 'text-muted-foreground hover:text-black dark:hover:text-white',
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {copyButton && (
              <CopyButton
                copied={copied}
                onCopy={copyToClipboard}
                visibilityMode={copyButtonVisibility}
              />
            )}
          </div>
        </div>
      )}
      {!tabsExist && filename && (
        <div className={'flex flex-col gap-2 pl-4 pr-2 py-2 bg-card border-b'}>
          <div className={'flex justify-between items-center'}>
            <div className={'text-xs text-muted-foreground'}>{filename}</div>
            {copyButton && (
              <CopyButton
                copied={copied}
                onCopy={copyToClipboard}
                visibilityMode={copyButtonVisibility}
              />
            )}
          </div>
        </div>
      )}
      {!tabsExist && !filename && copyButton && (
        <CopyButton
          copied={copied}
          onCopy={copyToClipboard}
          visibilityMode={copyButtonVisibility}
          positionClass={positionClass}
        />
      )}
      <div
        className={'overflow-hidden transition-all duration-300'}
        style={{
          maxHeight: isExpanded ? 'none' : '27rem',
          transition: 'max-height 0.3s ease',
        }}
      >
        <ScrollArea>
          <SyntaxHighlighter
            language={activeLanguage}
            style={isDarkTheme ? atomDark : undefined}
            customStyle={{
              margin: 0,
              padding: showLineNumbers ? '0.5rem' : '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              overflow: 'hidden',
            }}
            wrapLines={true}
            showLineNumbers={showLineNumbers}
            lineProps={(lineNumber) => ({
              style: {
                backgroundColor: activeHighlightLines.includes(lineNumber)
                  ? isDarkTheme
                    ? 'rgba(255,255,255,0.1)'
                    : '#f0f0f0'
                  : 'transparent',
                display: 'block',
                width: '100%',
              },
            })}
            PreTag="div"
          >
            {String(activeCode)}
          </SyntaxHighlighter>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {shouldShowButtons && showExpandCollapseButtons && (
        <div
          className={cn(
            'absolute bottom-0 left-0 flex items-center justify-center w-full py-4 gap-2',
            isExpanded ? '' : 'bg-gradient-to-t from-background to-transparent',
          )}
        >
          {!isExpanded ? (
            <Button
              variant={buttonVariant}
              onClick={() => setIsExpanded(true)}
              className={'text-xs font-semibold flex items-center gap-2 border'}
            >
              Expand <ChevronDown size={14} />
            </Button>
          ) : (
            <Button
              variant={buttonVariant}
              onClick={() => setIsExpanded(false)}
              className={'text-xs font-semibold flex items-center gap-2 border'}
            >
              Collapse <ChevronUp size={14} />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

const CopyButton = ({
  copied,
  onCopy,
  visibilityMode,
  positionClass = '',
}: {
  copied: boolean
  onCopy: () => void
  visibilityMode: 'always' | 'onHover'
  positionClass?: string
}) => {
  const visibilityClass =
    visibilityMode === 'onHover' ? cn('opacity-0 group-hover:opacity-100 transition-opacity') : ''

  return (
    <Button
      onClick={onCopy}
      variant="outline"
      size="icon"
      className={cn('text-xs z-[2] shrink-0 relative', positionClass, visibilityClass)}
    >
      <span
        className={cn(
          'transition-all absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
      >
        <Check className={'stroke-emerald-500'} size={14} />
      </span>
      <span
        className={cn(
          'transition-all absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        )}
      >
        <Copy size={14} />
      </span>
    </Button>
  )
}
