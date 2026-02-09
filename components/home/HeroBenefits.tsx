import PixelishIcon from "@/components/pixelish/PixelishIcon"

type BenefitCardProps = {
  label: string
  iconSrc: string
}

const BENEFITS: BenefitCardProps[] = [
  {
    label: "more exposure",
    iconSrc: "/pixelish/lens.svg",
  },
  {
    label: "more customers",
    iconSrc: "/pixelish/users.svg",
  },
  {
    label: "Higher Customer LTV",
    iconSrc: "/pixelish/bar-chart-high.svg",
  },
  {
    label: "spend less time on tech",
    iconSrc: "/pixelish/device-stop-clock.svg",
  },
]

function BenefitCard({ label, iconSrc }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-3 py-3 rounded-xl border border-border/60 bg-card/80 text-center">
      <PixelishIcon src={iconSrc} alt="" size={44} aria-hidden={true} className="opacity-95" />
      <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] font-pixel text-foreground">
        {label}
      </p>
    </div>
  )
}

export default function HeroBenefits() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 mx-auto gap-3 sm:max-w-lg sm:grid-cols-4">
      {BENEFITS.map((benefit) => (
        <BenefitCard key={benefit.label} {...benefit} />
      ))}
    </div>
  )
}
