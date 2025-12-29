import Script from "next/script"

export default function LordIconScript() {
  return (
    <Script
      id="lordicon-loader"
      src="https://cdn.lordicon.com/lordicon.js"
      strategy="afterInteractive"
    />
  )
}
