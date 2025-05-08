'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ColorProvider } from './color-provider'

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
    >
      <ColorProvider>{children}</ColorProvider>
    </NextThemesProvider>
  )
}
