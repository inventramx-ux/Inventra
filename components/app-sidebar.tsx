"use client"
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'

import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    BarChart3,
    Palette,
    Bell,
    Lock,
    Sparkles,
    ShoppingBag,
    Crown,
    Mail,
    Copy,
    Check,
    ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"
import { useSubscription } from "@/app/contexts/SubscriptionContext"
import { publicationOperations, Publication } from "@/lib/publications"
import { Progress } from "@/components/ui/progress"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
    SidebarSeparator,
    SidebarMenuAction,
} from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const freeItemKeys = [
    {
        titleKey: "dashboard" as const,
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        titleKey: "publications" as const,
        url: "/dashboard/publications",
        icon: ShoppingBag,
    },
    {
        titleKey: "analytics" as const,
        url: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        titleKey: "settings" as const,
        url: "/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    const { user } = useUser()
    const { isPro } = useSubscription()
    const [copied, setCopied] = useState(false)
    const [publications, setPublications] = useState<Publication[]>([])
    const t = useTranslations('sidebar')
    const tc = useTranslations('common')

    // Load publications for progress bar
    useEffect(() => {
        const loadPublications = async () => {
            if (!user?.id) return
            try {
                const pubs = await publicationOperations.getAll(user.id)
                setPublications(pubs)
            } catch (error) {
                console.error("Error loading publications:", error)
            }
        }
        if (user) loadPublications()
    }, [user])

    // Calculate publications from current month
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    const publicationsThisMonth = publications.filter(p => {
      const pubDate = new Date(p.created_at)
      return pubDate.getMonth() === currentMonth && pubDate.getFullYear() === currentYear
    }).length
    
    const MAX_PUBLICATIONS_PER_MONTH = 3
    const progressPercentage = isPro ? 100 : Math.min((publicationsThisMonth / MAX_PUBLICATIONS_PER_MONTH) * 100, 100)

    const copyEmail = () => {
        navigator.clipboard.writeText("inventramx@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const isActive = (url: string) => {
        if (url === "/dashboard") return pathname === "/dashboard"
        return pathname.startsWith(url)
    }

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-r border-white/10 bg-zinc-950">
            <SidebarHeader className="border-b border-white/5 pr-4 py-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent w-full justify-center">
                            <Link href="/">
                                <div className="flex items-center justify-center">
                                    <img src="/inventralogo.png" alt="Inventra" className="h-8 w-auto object-contain" />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Free Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-400">
                        <div className="flex items-center gap-2">
                            {isPro && <Crown className="size-3 text-amber-400" />}
                            <span>{isPro ? "Pro" : t('general')}</span>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {freeItemKeys.map((item) => {
                                const title = t(item.titleKey);
                                return (
                                <SidebarMenuItem key={item.titleKey}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={title}
                                        isActive={isActive(item.url)}
                                        className="text-gray-300 hover:text-white hover:bg-white/10"
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{title}</span>
                                            <ChevronRight className="size-3.5 text-zinc-500 shrink-0 ml-auto group-data-[state=collapsed]:hidden" />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-white/10" />

                {/* Support Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-400">{t('support')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={t('support')}
                                    className="text-gray-300 hover:text-white hover:bg-white/10 h-auto py-2"
                                >
                                    <a href="mailto:inventramx@gmail.com" className="flex items-start gap-3 min-w-0 w-full">
                                        <div className="mt-1">
                                            <Mail className="size-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm font-medium truncate">{t('contact')}</span>
                                            <span className="text-[10px] text-blue-400 truncate font-mono">
                                                inventramx@gmail.com
                                            </span>
                                            <span className="text-[9px] text-gray-500 leading-tight truncate">
                                                {t('responseLess12h')}
                                            </span>
                                        </div>
                                    </a>
                                </SidebarMenuButton>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuAction
                                            onClick={copyEmail}
                                            className="hover:bg-white/10 text-gray-400 hover:text-white"
                                        >
                                            {copied ? (
                                                <Check className="size-3.5 text-green-500" />
                                            ) : (
                                                <Copy className="size-3.5" />
                                            )}
                                        </SidebarMenuAction>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{t('copyEmail')}</TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-white/10" />
            </SidebarContent>

            {/* Publications Progress Bar */}
            <div className="mx-3 mb-2 px-2">
                <Progress 
                    value={progressPercentage}
                    className="h-1.5 bg-white/10 [&>*]:bg-blue-500"
                />
            </div>

            {/* SaaS Admin Dashboard Copyright Banner */}
            <div className="mx-3 my-2 px-3.5 py-1 group-data-[state=collapsed]:hidden text-left select-none">
                <p className="text-[11px] font-bold tracking-wide text-zinc-400">Inventra Dashboard</p>
                <p className="text-[9px] text-zinc-600 mt-0.5">© {new Date().getFullYear()} Todos los derechos reservados</p>
            </div>

            <SidebarFooter className="border-t border-white/10 p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white/5 text-gray-200">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8",
                                    },
                                }}
                            />
                            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                <span className="truncate font-semibold text-white">
                                    {user?.firstName || user?.username || tc('user')}
                                </span>
                                <span className="truncate text-xs text-gray-400">
                                    {user?.primaryEmailAddress?.emailAddress || ""}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
