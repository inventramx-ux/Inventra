"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { setUserLocale } from "@/i18n/services/locale"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const COOKIE_NAME = "NEXT_LOCALE"
const SUPPORTED_LOCALES = ["en", "es"] as const
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

export function LanguageSwitcher() {
  const locale = useLocale()
  const [isPending, setIsPending] = React.useState(false)
  const [displayLocale, setDisplayLocale] = React.useState<string>(locale)

  // Sync display with actual locale from server whenever it changes
  React.useEffect(() => {
    setDisplayLocale(locale)
  }, [locale])

  // Helper to read cookie value
  function getCookieValue(name: string): string | null {
    if (typeof document === "undefined") return null
    const cookies = document.cookie.split("; ")
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=")
      if (key === name && value) {
        return decodeURIComponent(value)
      }
    }
    return null
  }

  // Helper to set cookie with proper options
  function setCookie(name: string, value: string): void {
    if (typeof document === "undefined") return
    const date = new Date()
    date.setTime(date.getTime() + COOKIE_MAX_AGE * 1000)
    const cookieString = `${name}=${encodeURIComponent(value)}; path=/; expires=${date.toUTCString()}; SameSite=Lax`
    document.cookie = cookieString
    console.log(`[LanguageSwitcher] Cookie set: ${name}=${value}`)
  }

  async function handleLocaleChange(newLocale: string) {
    // Don't change if it's the same locale
    if (newLocale === locale) {
      console.log(`[LanguageSwitcher] Skipping change: newLocale (${newLocale}) === locale (${locale})`)
      return
    }

    console.log(`[LanguageSwitcher] Starting locale change from ${locale} to ${newLocale}`)
    setIsPending(true)

    try {
      // Step 1: Set cookie on client side
      setCookie(COOKIE_NAME, newLocale)

      // Step 2: Call server action to set cookie on server side
      console.log(`[LanguageSwitcher] Calling setUserLocale(${newLocale})`)
      await setUserLocale(newLocale)
      console.log(`[LanguageSwitcher] setUserLocale completed`)

      // Step 3: Verify cookie was set
      const cookieValue = getCookieValue(COOKIE_NAME)
      console.log(`[LanguageSwitcher] Cookie verification: ${COOKIE_NAME}=${cookieValue}`)

      // Step 4: Wait a moment then reload page forcefully
      console.log(`[LanguageSwitcher] Reloading page in 150ms`)
      setTimeout(() => {
        window.location.reload()
      }, 150)
    } catch (error) {
      console.error("[LanguageSwitcher] Error during locale change:", error)
      setIsPending(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 h-9 px-3 rounded-md transition-colors outline-none font-medium text-sm"
          disabled={isPending}
          title={`Current locale: ${locale}`}
        >
          <span className={cn("transition-opacity", isPending && "opacity-60")}>
            {displayLocale.toUpperCase()}
          </span>
          <span className="sr-only">Cambiar idioma / Change language</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-950/95 backdrop-blur-md border-white/10 text-white min-w-[140px] shadow-2xl"
      >
        <DropdownMenuItem
          onClick={() => handleLocaleChange("es")}
          className="flex items-center justify-between cursor-pointer focus:bg-white/10 focus:text-white py-2.5 px-3 transition-colors"
        >
          <span className="text-sm font-medium">Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          className="flex items-center justify-between cursor-pointer focus:bg-white/10 focus:text-white py-2.5 px-3 transition-colors"
        >
          <span className="text-sm font-medium">English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
