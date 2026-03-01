import type { SalesChatVisualTokens, SalesChatVisualStyle } from "@/components/sales-chat/types"

export const MAX_MESSAGE_CHARS = 1200
export const REQUEST_TIMEOUT_MS = 12_000
export const DEFAULT_FALLBACK_MESSAGE =
  "I can't continue this chat right now. The fastest path is to book a live call with our team."
export const HANDOFF_FALLBACK_MESSAGE =
  "A specialist is ready to help. Please use booking and we'll route you immediately."

export const SALES_CHAT_VISUAL_TOKENS: Record<SalesChatVisualStyle, SalesChatVisualTokens> = {
  "dark-minimal": {
    launcherButton:
      "group relative h-12 rounded-full border border-white/22 bg-[#090b10]/94 px-4 text-zinc-100 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all duration-180 ease-out hover:-translate-y-0.5 hover:border-white/34 hover:bg-[#0d1016]/96 hover:shadow-[0_20px_45px_-28px_rgba(0,0,0,0.95)] focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-0 active:translate-y-0",
    launcherText: "mr-2 text-sm font-semibold tracking-[0.08em] text-zinc-100 transition-colors duration-180",
    launcherStatus:
      "rounded-full border border-white/18 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-300",
    windowContent:
      "top-1/2 h-[min(760px,82vh)] w-[min(660px,92vw)] max-w-[660px] -translate-y-1/2 overflow-hidden rounded-[30px] border border-white/16 bg-[linear-gradient(180deg,rgba(10,12,16,0.96),rgba(9,11,15,0.93))] p-0 text-white shadow-[0_32px_90px_-52px_rgba(0,0,0,0.95)] backdrop-blur-[10px]",
    windowOverlay: "bg-black/34 backdrop-blur-[1px]",
    fullscreenContent:
      "h-[100dvh] w-screen max-w-none border-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.98),rgba(8,10,14,0.96))] p-0 text-white backdrop-blur-[6px] [&>button]:hidden",
    panelGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_42%)]",
    headerBorder: "border-b border-white/12",
    headerIconWrap: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.04]",
    headerTitle: "truncate text-[1.02rem] font-semibold text-zinc-100",
    headerSubtext: "text-xs text-zinc-400",
    headerStatus: "font-medium text-emerald-300",
    headerActionButton: "border border-white/18 bg-white/[0.03] text-zinc-100 hover:bg-white/[0.08]",
    welcomeBubble: "rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-zinc-100",
    transcriptFrame: "min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/28",
    promptChip:
      "rounded-2xl border border-white/14 bg-white/[0.03] text-xs font-medium !normal-case !font-sans !tracking-[0.015em] text-zinc-200 transition-colors duration-150 hover:bg-white/[0.06]",
    assistantBubble:
      "max-w-[86%] rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-2.5 text-zinc-100 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.95)]",
    userBubble:
      "max-w-[86%] rounded-2xl border border-white/18 bg-white/[0.09] px-4 py-2.5 text-zinc-50 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.95)]",
    composerFrame: "rounded-2xl border border-white/14 bg-black/35 p-2",
    composerInput:
      "max-h-40 min-h-[54px] resize-none border-0 bg-transparent py-3 pr-14 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0",
    composerCount: "text-[11px] text-zinc-400",
    bookingText: "text-xs text-zinc-400 sm:text-sm",
  },
  "minimal-glass": {
    launcherButton:
      "group relative h-12 rounded-full border border-white/30 bg-slate-950/82 px-4 text-slate-50 shadow-[0_14px_36px_-24px_rgba(56,189,248,0.68)] backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/50 hover:bg-slate-900/88 hover:shadow-[0_18px_42px_-22px_rgba(56,189,248,0.75)] focus-visible:ring-2 focus-visible:ring-cyan-200/50 focus-visible:ring-offset-0 active:translate-y-0",
    launcherText: "mr-2 text-sm font-semibold tracking-[0.08em] text-slate-100 transition-colors duration-200",
    launcherStatus:
      "rounded-full border border-emerald-300/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-100",
    windowContent:
      "top-1/2 h-[min(760px,82vh)] w-[min(660px,92vw)] max-w-[660px] -translate-y-1/2 overflow-hidden rounded-[30px] border border-white/24 bg-[linear-gradient(150deg,rgba(15,23,42,0.70),rgba(30,41,59,0.44))] p-0 text-white shadow-[0_36px_115px_-48px_rgba(0,0,0,0.92)] backdrop-blur-[18px]",
    windowOverlay:
      "bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,0.19),transparent_40%),radial-gradient(circle_at_72%_70%,rgba(59,130,246,0.14),transparent_44%),rgba(2,6,23,0.36)] backdrop-blur-[2px]",
    fullscreenContent:
      "h-[100dvh] w-screen max-w-none border-0 bg-[linear-gradient(165deg,rgba(2,6,23,0.92),rgba(15,23,42,0.86))] p-0 text-white backdrop-blur-xl [&>button]:hidden",
    panelGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_78%_84%,rgba(59,130,246,0.10),transparent_40%)]",
    headerBorder: "border-b border-white/16",
    headerIconWrap: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/6",
    headerTitle: "truncate text-[1.02rem] font-semibold text-white",
    headerSubtext: "text-xs text-slate-300/90",
    headerStatus: "font-medium text-emerald-300",
    headerActionButton: "border border-white/24 bg-white/4 text-slate-100 hover:bg-white/10",
    welcomeBubble: "rounded-2xl border border-white/18 bg-white/[0.045] px-4 py-3 text-slate-100",
    transcriptFrame: "min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/14 bg-black/18",
    promptChip:
      "rounded-2xl border border-white/20 bg-white/[0.03] text-xs font-medium !normal-case !font-sans !tracking-[0.015em] text-slate-100 transition-colors duration-150 hover:bg-white/[0.08]",
    assistantBubble:
      "max-w-[86%] rounded-2xl border border-white/18 bg-white/[0.055] px-4 py-2.5 text-slate-100 shadow-[0_10px_26px_-20px_rgba(0,0,0,0.92)]",
    userBubble:
      "max-w-[86%] rounded-2xl border border-cyan-200/35 bg-[linear-gradient(150deg,rgba(56,189,248,0.58),rgba(59,130,246,0.48))] px-4 py-2.5 text-white shadow-[0_10px_24px_-18px_rgba(56,189,248,0.7)]",
    composerFrame: "rounded-2xl border border-white/20 bg-black/22 p-2",
    composerInput:
      "max-h-40 min-h-[54px] resize-none border-0 bg-transparent py-3 pr-14 text-sm leading-relaxed text-slate-100 placeholder:text-slate-400 focus-visible:ring-0",
    composerCount: "text-[11px] text-slate-300/85",
    bookingText: "text-xs text-slate-300/95 sm:text-sm",
  },
  default: {
    launcherButton:
      "group relative h-12 rounded-full border border-cyan-200/35 bg-slate-950/90 px-4 text-slate-50 shadow-[0_16px_42px_-26px_rgba(56,189,248,0.75)] backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-cyan-200/80 hover:bg-slate-900/95 hover:text-white hover:shadow-[0_24px_58px_-28px_rgba(56,189,248,0.9)] active:translate-y-0 active:shadow-[0_16px_42px_-26px_rgba(56,189,248,0.75)]",
    launcherText: "mr-2 text-sm font-semibold tracking-[0.08em] text-slate-100 transition-colors duration-200 group-hover:text-white",
    launcherStatus:
      "rounded-full border border-emerald-300/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-100 transition-colors duration-200 group-hover:border-emerald-200/75 group-hover:bg-emerald-400/20 group-hover:text-emerald-50",
    windowContent:
      "top-1/2 h-[min(760px,82vh)] w-[min(680px,92vw)] max-w-[680px] -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/20 bg-[#060b14]/88 p-0 text-white shadow-[0_40px_130px_-45px_rgba(15,23,42,0.95)] backdrop-blur-2xl",
    windowOverlay: "",
    fullscreenContent: "h-[100dvh] w-screen max-w-none border-0 bg-[#050912]/96 p-0 text-white backdrop-blur-xl [&>button]:hidden",
    panelGlow:
      "pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(59,130,246,0.16),transparent_48%),radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.22),transparent_45%)]",
    headerBorder: "border-b border-white/15",
    headerIconWrap: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5",
    headerTitle: "truncate text-base font-semibold text-white sm:text-lg",
    headerSubtext: "text-xs text-slate-300",
    headerStatus: "inline-flex items-center gap-1 text-emerald-300",
    headerActionButton: "border border-white/20 bg-white/5 text-slate-100 hover:bg-white/10",
    welcomeBubble: "rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-slate-100",
    transcriptFrame: "min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/15 bg-black/20",
    promptChip:
      "rounded-xl border border-white/15 bg-black/20 text-xs !normal-case !font-sans !tracking-[0.015em] text-slate-100 transition-colors duration-150 hover:bg-white/10",
    assistantBubble:
      "max-w-[86%] rounded-2xl border border-white/20 bg-white/[0.06] px-3.5 py-2.5 text-slate-100 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.95)]",
    userBubble:
      "max-w-[86%] rounded-2xl border border-blue-300/35 bg-gradient-to-br from-blue-500/90 to-cyan-500/85 px-3.5 py-2.5 text-white shadow-[0_14px_30px_-22px_rgba(15,23,42,0.95)]",
    composerFrame: "rounded-2xl border border-white/20 bg-black/30 p-2 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.95)]",
    composerInput:
      "max-h-40 min-h-[56px] resize-none border-0 bg-transparent py-3 pr-14 text-sm leading-relaxed text-slate-100 placeholder:text-slate-400 focus-visible:ring-0",
    composerCount: "text-xs text-slate-300",
    bookingText: "text-xs text-slate-300 sm:text-sm",
  },
}
