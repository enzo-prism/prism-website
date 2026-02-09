export type PixelishEmojiIcon = {
  src: string
  alt: string
}

const FALLBACK_ICON: PixelishEmojiIcon = {
  src: "/pixelish/circle-question.svg",
  alt: "Icon",
}

function normalizeEmoji(input: string) {
  return input
    .trim()
    .replace(/\uFE0F/g, "") // Variation Selector-16 (emoji presentation)
    .replace(/[\u{1F3FB}-\u{1F3FF}]/gu, "") // skin tone modifiers
}

const EMOJI_TO_ICON: Record<string, PixelishEmojiIcon> = {
  // Hearts
  "🤍": { src: "/pixelish/emoji-heart.svg", alt: "Heart icon" },
  "❤": { src: "/pixelish/emoji-heart.svg", alt: "Heart icon" },
  "💖": { src: "/pixelish/emoji-heart.svg", alt: "Heart icon" },

  // Mail / messages
  "📬": { src: "/pixelish/mail.svg", alt: "Mail icon" },
  "📧": { src: "/pixelish/mail.svg", alt: "Mail icon" },
  "💬": { src: "/pixelish/chat-dots.svg", alt: "Chat icon" },
  "🗨": { src: "/pixelish/chat-circle-dots.svg", alt: "Chat icon" },

  // Devices
  "📱": { src: "/pixelish/device-phone.svg", alt: "Phone icon" },
  "📞": { src: "/pixelish/device-phone.svg", alt: "Phone icon" },
  "💻": { src: "/pixelish/device-laptop.svg", alt: "Laptop icon" },
  "🖥": { src: "/pixelish/device-monitor.svg", alt: "Monitor icon" },
  "⌚": { src: "/pixelish/device-watch.svg", alt: "Watch icon" },

  // Media
  "🎥": { src: "/pixelish/media-play.svg", alt: "Video icon" },
  "📸": { src: "/pixelish/device-camera.svg", alt: "Camera icon" },
  "🎤": { src: "/pixelish/device-radio.svg", alt: "Audio icon" },
  "🎙": { src: "/pixelish/device-radio.svg", alt: "Audio icon" },
  "📢": { src: "/pixelish/device-radio.svg", alt: "Broadcast icon" },
  "📣": { src: "/pixelish/device-radio.svg", alt: "Broadcast icon" },

  // Time
  "⏱": { src: "/pixelish/device-stop-clock.svg", alt: "Timer icon" },
  "⏳": { src: "/pixelish/device-stop-clock.svg", alt: "Timer icon" },

  // Growth / analytics
  "📊": { src: "/pixelish/bar-chart-average.svg", alt: "Chart icon" },
  "📈": { src: "/pixelish/graph-chart-high.svg", alt: "Growth chart icon" },
  "🌱": { src: "/pixelish/graph-chart-high.svg", alt: "Growth chart icon" },

  // Tools / systems
  "⚙": { src: "/pixelish/command.svg", alt: "System icon" },
  "🛠": { src: "/pixelish/command.svg", alt: "Tool icon" },
  "🔁": { src: "/pixelish/arrow-refresh.svg", alt: "Refresh icon" },

  // Search / discovery
  "🔍": { src: "/pixelish/lens.svg", alt: "Search icon" },
  "🧭": { src: "/pixelish/lens-plus.svg", alt: "Explore icon" },

  // Navigation pointers
  "👉": { src: "/pixelish/arrow-right.svg", alt: "Arrow icon" },
  "👈": { src: "/pixelish/arrow-left.svg", alt: "Arrow icon" },

  // Commerce
  "💸": { src: "/pixelish/currency-dollar.svg", alt: "Dollar icon" },
  "💵": { src: "/pixelish/currency-dollar.svg", alt: "Dollar icon" },
  "🛍": { src: "/pixelish/handbag.svg", alt: "Shopping bag icon" },

  // Documents / lists
  "📋": { src: "/pixelish/document-letter.svg", alt: "Document icon" },
  "📑": { src: "/pixelish/document-letter.svg", alt: "Document icon" },
  "📰": { src: "/pixelish/document-letter.svg", alt: "Document icon" },
  "📎": { src: "/pixelish/copy.svg", alt: "Copy icon" },
  "🔗": { src: "/pixelish/copy.svg", alt: "Link icon" },
  "🗂": { src: "/pixelish/folder.svg", alt: "Folder icon" },
  "⚖": { src: "/pixelish/kanban.svg", alt: "Table icon" },

  // Calendar
  "📅": { src: "/pixelish/calendar.svg", alt: "Calendar icon" },
  "🗓": { src: "/pixelish/calendar.svg", alt: "Calendar icon" },

  // Status / warnings
  "✅": { src: "/pixelish/checkmark.svg", alt: "Checkmark icon" },
  "☑": { src: "/pixelish/circle-checkmark.svg", alt: "Checkmark icon" },
  "⚠": { src: "/pixelish/circle-exclamation.svg", alt: "Warning icon" },
  "🚫": { src: "/pixelish/close.svg", alt: "Not allowed icon" },

  // Misc
  "✨": { src: "/pixelish/award-plus.svg", alt: "Highlight icon" },
  "⭐": { src: "/pixelish/award.svg", alt: "Star icon" },
  "🚀": { src: "/pixelish/emoji-rocket.svg", alt: "Rocket icon" },
  "⚡": { src: "/pixelish/arrow-refresh.svg", alt: "Fast icon" },
  "💼": { src: "/pixelish/briefcase.svg", alt: "Briefcase icon" },
  "🏪": { src: "/pixelish/house.svg", alt: "Store icon" },
  "🏝": { src: "/pixelish/cloud.svg", alt: "Escape icon" },
  "🧠": { src: "/pixelish/robot.svg", alt: "Brain icon" },
  "🤖": { src: "/pixelish/robot.svg", alt: "Robot icon" },
  "💡": { src: "/pixelish/circle-question.svg", alt: "Idea icon" },
  "🔓": { src: "/pixelish/lock-open.svg", alt: "Unlock icon" },
  "🛡": { src: "/pixelish/lock-closed.svg", alt: "Shield icon" },
  "🧾": { src: "/pixelish/document-letter.svg", alt: "Receipt icon" },
  "🤝": { src: "/pixelish/users.svg", alt: "Handshake icon" },
  "👤": { src: "/pixelish/user.svg", alt: "User icon" },
  "👥": { src: "/pixelish/users.svg", alt: "Users icon" },
  "📦": { src: "/pixelish/folder.svg", alt: "Package icon" },
  "🎓": { src: "/pixelish/award.svg", alt: "Graduation icon" },
  "🖼": { src: "/pixelish/browser.svg", alt: "Image icon" },
  "🎨": { src: "/pixelish/device-tablet.svg", alt: "Design icon" },
  "🖨": { src: "/pixelish/browser.svg", alt: "Print icon" },
  "🕊": { src: "/pixelish/emoji-heart.svg", alt: "Nonprofit icon" },
  "📍": { src: "/pixelish/lens-plus.svg", alt: "Location icon" },
  "🚪": { src: "/pixelish/folder.svg", alt: "Door icon" },

  // Emoji sequences (normalized form keeps ZWJs but strips VS16)
  "🧘‍♀": { src: "/pixelish/emoji-happy.svg", alt: "Wellness icon" },
  "🚴‍♂": { src: "/pixelish/arrow-up.svg", alt: "Bike icon" },
  "👨‍👩‍👧": { src: "/pixelish/users.svg", alt: "Family icon" },

  // Category stand-ins (Pixelish set has no tooth / outdoors icons)
  "🦷": { src: "/pixelish/emoji-happy.svg", alt: "Smile icon" },
  "🪥": { src: "/pixelish/emoji-happy.svg", alt: "Smile icon" },
  "🏔": { src: "/pixelish/cloud.svg", alt: "Mountain icon" },
  "🎿": { src: "/pixelish/arrow-up.svg", alt: "Ski icon" },
  "🎯": { src: "/pixelish/lens-plus.svg", alt: "Target icon" },
}

export function pixelishForEmoji(emoji: string): PixelishEmojiIcon {
  const normalized = normalizeEmoji(emoji)
  return EMOJI_TO_ICON[normalized] ?? FALLBACK_ICON
}
