"use client"

import { useEffect, useState } from "react"

import LordIcon from "@/components/lord-icon"

type BenefitIcon = {
  src: string
  trigger: string
  delay?: string
  state?: string
  colors: string
}

type BenefitCardProps = {
  label: string
  icon: BenefitIcon | null
}

const EXPOSURE_ICON_VARIANTS: BenefitIcon[] = [
  {
    src: "https://cdn.lordicon.com/wyljvnhx.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/jdgfsfzr.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
]

const CUSTOMER_ICON_VARIANTS: BenefitIcon[] = [
  {
    src: "https://cdn.lordicon.com/fqbvgezn.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/ptilahwn.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
]

const LTV_ICON_VARIANTS: BenefitIcon[] = [
  {
    src: "https://cdn.lordicon.com/bhjlcyir.json",
    trigger: "loop",
    state: "loop-cycle",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/eaegfqtv.json",
    trigger: "morph",
    state: "morph-destroyed",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/hpveozzh.json",
    trigger: "loop",
    delay: "1500",
    state: "in-reveal",
    colors: "primary:#121331,secondary:#3080e8",
  },
]

const RELIEF_ICON_VARIANTS: BenefitIcon[] = [
  {
    src: "https://cdn.lordicon.com/cgldjsly.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/ufxddmlg.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
  {
    src: "https://cdn.lordicon.com/khzsycxs.json",
    trigger: "loop",
    delay: "2000",
    colors: "primary:#121331,secondary:#3080e8",
  },
]

const EXPOSURE_LABEL = "more exposure"
const CUSTOMER_LABEL = "more customers"
const LTV_LABEL = "Higher Customer LTV"
const RELIEF_LABEL = "spend less time on tech"

const pickRandomVariant = (variants: BenefitIcon[]) => {
  if (variants.length === 0) return null
  const index = Math.floor(Math.random() * variants.length)
  return variants[index] ?? variants[0]
}

function BenefitCard({ label, icon }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-3 py-3 rounded-xl border border-border/60 bg-card/80 text-center">
      {icon ? (
        <LordIcon
          src={icon.src}
          trigger={icon.trigger}
          delay={icon.delay}
          state={icon.state}
          colors={icon.colors}
          style={{ width: 50, height: 50 }}
          aria-hidden="true"
        />
      ) : (
        <div className="h-[50px] w-[50px]" aria-hidden="true" />
      )}
      <p className="text-xs font-semibold leading-tight text-foreground">{label}</p>
    </div>
  )
}

export default function HeroBenefits() {
  const [exposureIcon, setExposureIcon] = useState<BenefitIcon | null>(null)
  const [customerIcon, setCustomerIcon] = useState<BenefitIcon | null>(null)
  const [ltvIcon, setLtvIcon] = useState<BenefitIcon | null>(null)
  const [reliefIcon, setReliefIcon] = useState<BenefitIcon | null>(null)

  useEffect(() => {
    setExposureIcon(pickRandomVariant(EXPOSURE_ICON_VARIANTS))
    setCustomerIcon(pickRandomVariant(CUSTOMER_ICON_VARIANTS))
    setLtvIcon(pickRandomVariant(LTV_ICON_VARIANTS))
    setReliefIcon(pickRandomVariant(RELIEF_ICON_VARIANTS))
  }, [])

  return (
    <div className="grid w-full max-w-sm grid-cols-2 mx-auto gap-3 sm:max-w-lg sm:grid-cols-4">
      <BenefitCard label={EXPOSURE_LABEL} icon={exposureIcon} />
      <BenefitCard label={CUSTOMER_LABEL} icon={customerIcon} />
      <BenefitCard label={LTV_LABEL} icon={ltvIcon} />
      <BenefitCard label={RELIEF_LABEL} icon={reliefIcon} />
    </div>
  )
}
