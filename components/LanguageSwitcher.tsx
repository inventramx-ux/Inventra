"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [displayLocale, setDisplayLocale] = React.useState(locale)

  // Detect language on first visit and set cookie with proper options
  React.useEffect(() => {
    const initializeLocale = async () => {
      // Check if cookie exists
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=")
        acc[key] = value
        return acc
      }, {} as Record<string, string>)

      const existingLocale = cookies[COOKIE_NAME]

      // If valid locale cookie exists, use it
      if (existingLocale && SUPPORTED_LOCALES.includes(existingLocale as any)) {
        if (existingLocale !== displayLocale) {
          setDisplayLocale(existingLocale)
        }
        return
      }

      // No valid cookie: detect from navigator.language
      const navLang = navigator.language.toLowerCase()
      const langPrefix = navLang.split("-")[0]
      const detectedLocale = SUPPORTED_LOCALES.includes(langPrefix as any)
        ? langPrefix
        : "en"

      // Set cookie with proper options
      const date = new Date()
      date.setTime(date.getTime() + COOKIE_MAX_AGE * 1000)
      document.cookie = `${COOKIE_NAME}=${detectedLocale}; path=/; expires=${date.toUTCString()}; SameSite=Lax`

      setDisplayLocale(detectedLocale)

      // Sync with server if detected locale differs
      if (detectedLocale !== locale) {
        startTransition(async () => {
          await setUserLocale(detectedLocale)
          router.refresh()
        })
      }
    }

    initializeLocale()
  }, [])

  function handleLocaleChange(newLocale: string) {
    if (newLocale === displayLocale) return

    // Set cookie with path=/ and 1 year expiration (client-side)
    const date = new Date()
    date.setTime(date.getTime() + COOKIE_MAX_AGE * 1000)
    document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; expires=${date.toUTCString()}; SameSite=Lax`

    setDisplayLocale(newLocale)

    // Force locale change via server and refresh
    startTransition(async () => {
      await setUserLocale(newLocale)
      // Use a small delay to ensure cookie is set before refresh
      setTimeout(() => {
        router.refresh()
      }, 100)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 h-9 px-3 rounded-md transition-colors outline-none font-medium text-sm"
          disabled={isPending}
        >
          <span
            className={cn("transition-opacity", isPending && "opacity-60")}
          >
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
