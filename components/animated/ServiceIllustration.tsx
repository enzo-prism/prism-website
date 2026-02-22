import { cn } from "@/lib/utils"

type ServiceIllustrationVariant =
  | "websites"
  | "seo"
  | "ads"
  | "openai"
  | "local"
  | "analytics"
  | "content"
  | "role-developer"
  | "role-designer"
  | "role-marketer"
  | "role-manager"

type ServiceIllustrationProps = {
  variant: ServiceIllustrationVariant
  className?: string
}

const shellClass = cn(
  "transition-[transform,opacity,stroke,fill] duration-300 ease-out motion-reduce:transition-none",
  "group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100",
)

const baseStrokeClass = cn(
  "fill-none stroke-[2.5] stroke-neutral-500 dark:stroke-neutral-300",
  "group-hover:stroke-orange-500 group-focus-visible:stroke-orange-500 group-active:stroke-orange-600",
)

const floatingClass = cn(
  shellClass,
  "group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-active:translate-y-0",
)

const pulseClass = cn(
  shellClass,
  "group-hover:scale-105 group-focus-visible:scale-105 group-active:scale-100",
)

function getIllustration(variant: ServiceIllustrationVariant) {
  switch (variant) {
    case "websites":
      return (
        <>
          <g className={floatingClass}>
            <rect x={18} y={20} width={94} height={50} rx={10} className={baseStrokeClass} />
            <rect x={28} y={30} width={46} height={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
            <rect x={28} y={41} width={65} height={5} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
            <rect x={28} y={50} width={40} height={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
          </g>
          <g className={floatingClass} style={{ transitionDelay: "40ms" }}>
            <rect x={38} y={86} width={80} height={62} rx={10} className={baseStrokeClass} />
            <rect x={49} y={98} width={58} height={5} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
            <rect x={49} y={107} width={58} height={5} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
            <rect x={49} y={116} width={40} height={5} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
          </g>
          <g className={cn(baseStrokeClass, floatingClass, "fill-none")} fill="none">
            <path
              d="M112 45 C 124 45, 140 52, 152 58"
              className={cn(baseStrokeClass, "stroke-[2.5]")}
            />
            <path
              d="M112 45 C 124 58, 136 65, 148 68"
              className={cn(baseStrokeClass, "stroke-[2]")}
            />
            <circle cx={158} cy={72} r={3.5} className="fill-neutral-200 stroke-none dark:fill-neutral-700" />
            <circle cx={145} cy={76} r={2.5} className="fill-orange-300/80 stroke-none" />
          </g>
        </>
      )
    case "seo":
      return (
        <>
          <circle cx={120} cy={72} r={27} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <path
            d="M142 94L158 110"
            className={cn(baseStrokeClass, "stroke-[3]")}
          />
          <path
            d="M118 56a12 12 0 1 0 4 23"
            className={cn(baseStrokeClass, "stroke-[3]")}
          />
          <g className={floatingClass}>
            <path
              d="M58 128h124"
              className={cn(baseStrokeClass, "stroke-[2]")}
            />
            <circle cx={64} cy={128} r={4} className="fill-orange-200 stroke-none" />
            <circle cx={94} cy={128} r={4} className="fill-neutral-200 stroke-none dark:fill-neutral-700" />
            <circle cx={124} cy={128} r={4} className="fill-neutral-200 stroke-none dark:fill-neutral-700" />
            <circle cx={154} cy={128} r={4} className="fill-neutral-300 stroke-none dark:fill-neutral-700" />
            <path
              d="M64 128 Q74 112 86 126"
              className={cn(baseStrokeClass, "fill-none stroke-[2]")}
            />
            <path
              d="M94 128 Q108 108 122 123"
              className={cn(baseStrokeClass, "fill-none stroke-[2]")}
            />
          </g>
          <g className={cn(pulseClass, "text-neutral-400 group-hover:text-orange-400")}>
            <path
              d="M58 56h20v8H58zM81 44h20v20H81zM104 52h22v14h-22z"
              className="fill-neutral-200 dark:fill-neutral-700"
            />
          </g>
        </>
      )
    case "ads":
      return (
        <>
          <circle cx={90} cy={82} r={26} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <circle cx={90} cy={82} r={11} className={cn(baseStrokeClass, "fill-orange-100 dark:fill-orange-950/40")} />
          <path
            d="M90 56V40M90 124V108M116 82H132M48 82H64M105.2 58.8L117 47M62.8 105.2L75 93.4"
            className={cn(baseStrokeClass, "stroke-[2]")}
          />
          <path
            d="M140 126h56M140 98h46M140 70h36"
            className={cn(baseStrokeClass, pulseClass, "stroke-[2.5]")}
          />
          <g className={cn(floatingClass, "fill-none")}>
            <path d="M170 60h10l10 10v20l-10 10h-10z" className={cn(baseStrokeClass, "stroke-[2]")} />
            <path d="M188 55h-45v80h48" className={cn(baseStrokeClass, "stroke-[2]")} />
            <circle cx={188} cy={75} r={4} className="fill-orange-200 stroke-none" />
            <circle cx={188} cy={92} r={4} className="fill-neutral-300 stroke-none" />
            <circle cx={188} cy={109} r={4} className="fill-neutral-300 stroke-none" />
          </g>
        </>
      )
    case "openai":
      return (
        <>
          <path
            d="M56 95l24-20h60l24 20-24 20H80z"
            className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")}
          />
          <g className={floatingClass}>
            <circle cx={58} cy={95} r={6} className="fill-orange-200 stroke-none" />
            <circle cx={120} cy={95} r={6} className="fill-orange-200 stroke-none" />
            <circle cx={182} cy={95} r={6} className="fill-orange-200 stroke-none" />
            <path d="M58 95H120M120 95H182" className={cn(baseStrokeClass, "stroke-[2]")} />
            <path
              d="M67 92l18-14M111 92l18-14M67 98l18 14M111 98l18 14"
              className={cn(baseStrokeClass, "stroke-[2]")}
            />
          </g>
          <g className={cn(pulseClass, "fill-none")}>
            <circle cx={120} cy={74} r={28} className={cn(baseStrokeClass, "stroke-[2]")} />
            <circle cx={120} cy={74} r={20} className={cn(baseStrokeClass, "stroke-[2.5]")} />
          </g>
          <g className={floatingClass}>
            <rect
              x={44}
              y={52}
              width={18}
              height={18}
              rx={4}
              className="fill-neutral-100 stroke-none dark:fill-neutral-800"
            />
            <rect
              x={178}
              y={52}
              width={18}
              height={18}
              rx={4}
              className="fill-neutral-100 stroke-none dark:fill-neutral-800"
            />
            <path d="M53 61h8v8h-8zM53 61h8M53 69h8M61 61v8" className="fill-none stroke-[2] stroke-orange-500" />
          </g>
        </>
      )
    case "local":
      return (
        <>
          <path
            d="M120 38C94 38 72 56 72 86c0 24 28 62 48 82 20-20 48-58 48-82 0-30-22-48-48-48Z"
            className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")}
          />
          <circle cx={120} cy={86} r={14} className="fill-orange-100 stroke-none dark:fill-orange-950/40" />
          <circle cx={120} cy={86} r={7} className="fill-orange-500/90" />
          <g className={floatingClass}>
            <circle cx={96} cy={78} r={4} className="fill-neutral-300 stroke-none dark:fill-neutral-700" />
            <circle cx={144} cy={78} r={4} className="fill-neutral-300 stroke-none dark:fill-neutral-700" />
            <path d="M112 106h16" className={cn(baseStrokeClass, "stroke-[3]")} />
            <path d="M108 114h24" className={cn(baseStrokeClass, "stroke-[2]")} />
          </g>
          <path
            d="M120 38v18"
            className={cn(baseStrokeClass, "stroke-[3]")}
          />
          <g className={cn(pulseClass, "fill-none")}>
            <circle cx={120} cy={118} r={26} className={cn(baseStrokeClass, "stroke-[2]")} />
            <circle cx={120} cy={118} r={12} className={cn(baseStrokeClass, "stroke-[2]")} />
          </g>
        </>
      )
    case "analytics":
      return (
        <>
          <rect
            x={46}
            y={44}
            width={148}
            height={96}
            rx={10}
            className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")}
          />
          <path d="M58 118h124" className={cn(baseStrokeClass, "stroke-[2]")} />
          <path d="M62 112V70M82 112V66M102 112V82M122 112V74M142 112V90M162 112V62" className={cn(baseStrokeClass, "stroke-[2.5]")} />
          <path d="M58 66l18 14 16-18 16 22 18-12 16-18 20 22 16-18 20 10" className={cn(baseStrokeClass, "stroke-[2]")} />
          <circle cx={84} cy={70} r={6} className="fill-orange-200 stroke-none" />
          <circle cx={102} cy={82} r={5} className="fill-orange-100 stroke-none" />
          <circle cx={122} cy={74} r={5} className="fill-orange-200 stroke-none" />
          <circle cx={142} cy={90} r={4} className="fill-orange-100 stroke-none" />
          <circle cx={164} cy={62} r={5} className="fill-orange-200 stroke-none" />
          <g className={cn(pulseClass, "text-neutral-400 group-hover:text-orange-400")}>
            <path
              d="M58 50h30"
              className="stroke-current stroke-[2.5] fill-none"
            />
            <circle cx={78} cy={50} r={3.5} className="fill-current stroke-none" />
          </g>
        </>
      )
    case "content":
      return (
        <>
          <rect x={20} y={34} width={90} height={110} rx={8} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <rect x={34} y={50} width={62} height={8} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <rect x={34} y={66} width={62} height={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <rect x={34} y={80} width={45} height={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <rect x={34} y={94} width={62} height={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <path
            d="M128 56h70M128 74h46M128 92h62M128 110h56"
            className={cn(baseStrokeClass, "stroke-[2.5]")}
          />
          <g className={floatingClass}>
            <rect x={128} y={120} width={84} height={24} rx={8} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-900/60")} />
            <path d="M138 126h64" className={cn(baseStrokeClass, "stroke-[2]")} />
            <path d="M138 132h48" className={cn(baseStrokeClass, "stroke-[2]")} />
          </g>
        </>
      )
    case "role-developer":
      return (
        <>
          <rect x={46} y={40} width={122} height={88} rx={8} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <path d="M62 66h90M62 78h90" className={cn(baseStrokeClass, "stroke-[2.5]")} />
          <path d="M62 90h52" className={cn(baseStrokeClass, "stroke-[2.5]")} />
          <g className={cn(floatingClass, "fill-none")}>
            <circle cx={112} cy={96} r={16} className={cn(baseStrokeClass, "fill-orange-100/70")} />
            <path d="M106 96h12M112 90v12" className="stroke-orange-400 stroke-[3] fill-none" />
            <path d="M90 110l12-20 12 20" className={cn(baseStrokeClass, "fill-none")} />
          </g>
          <g className={cn(floatingClass, "text-neutral-400")}>
            <circle cx={82} cy={56} r={2.5} className="fill-current" />
            <circle cx={90} cy={56} r={2.5} className="fill-current" />
            <circle cx={98} cy={56} r={2.5} className="fill-current" />
            <circle cx={106} cy={56} r={2.5} className="fill-current" />
          </g>
        </>
      )
    case "role-designer":
      return (
        <>
          <rect x={38} y={58} width={160} height={68} rx={9} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <path d="M54 86h16v4H54z" className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <path d="M76 90h28v14h-28z" className={cn(baseStrokeClass, "fill-orange-100 dark:fill-orange-900/40")} />
          <path d="M112 104h20v-8h-20zM132 104h28v-8h-28z" className={baseStrokeClass} />
          <g className={floatingClass}>
            <circle cx={72} cy={114} r={11} className="fill-neutral-100 stroke-none dark:fill-neutral-800" />
            <path d="M66 114h12M72 108v12" className="stroke-orange-400 stroke-[2] fill-none" />
          </g>
          <path
            d="M146 78h40M146 86h40M146 94h26"
            className={cn(baseStrokeClass, "stroke-[2]")}
          />
        </>
      )
    case "role-marketer":
      return (
        <>
          <path
            d="M118 44h-40c-11 0-20 9-20 20v58c0 11 9 20 20 20h84c11 0 20-9 20-20V74L118 44z"
            className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")}
          />
          <path d="M98 78h90v40H98z" className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-900/70")} />
          <path d="M84 92h16M84 104h16M84 116h16" className={cn(baseStrokeClass, "stroke-[2.5]")} />
          <path
            d="M145 96c-10 0-10 20 0 20"
            className={cn(baseStrokeClass, "stroke-[3]")}
          />
          <path
            d="M118 44v16a6 6 0 0 0 6 6h16"
            className={cn(baseStrokeClass, "stroke-[2.5]")}
          />
          <g className={cn(pulseClass, "fill-none")}>
            <path d="M150 116h18" className="stroke-orange-400 stroke-[2.5]" />
            <path d="M150 124h10M150 132h14" className="stroke-orange-400 stroke-[2]" />
          </g>
        </>
      )
    case "role-manager":
      return (
        <>
          <rect x={36} y={42} width={168} height={30} rx={8} className={cn(baseStrokeClass, "fill-white dark:fill-neutral-950")} />
          <rect x={42} y={108} width={56} height={18} rx={6} className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          <rect x={104} y={108} width={56} height={18} rx={6} className={cn(baseStrokeClass, "fill-orange-100 dark:fill-orange-900/40")} />
          <path d="M42 102h142" className={cn(baseStrokeClass, "stroke-[2]")} />
          <g className={floatingClass}>
            <path d="M65 82h24v16H65zM101 74h36v24h-36zM143 80h48v12h-48z" className={cn(baseStrokeClass, "fill-neutral-100 dark:fill-neutral-800")} />
          </g>
          <path
            d="M60 54h120"
            className={cn(baseStrokeClass, "stroke-[2.5]")}
          />
          <circle cx={60} cy={54} r={2.5} className="fill-current stroke-none" />
          <circle cx={90} cy={54} r={2.5} className="fill-current stroke-none" />
          <circle cx={120} cy={54} r={2.5} className="fill-current stroke-none" />
        </>
      )
  }
}

export default function ServiceIllustration({ variant, className }: ServiceIllustrationProps) {
  return (
    <div className={cn("h-full w-full", className)} aria-hidden="true">
      <svg
        viewBox="0 0 240 170"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        focusable="false"
        className="h-full w-full"
        fill="none"
      >
        {getIllustration(variant)}
      </svg>
    </div>
  )
}
