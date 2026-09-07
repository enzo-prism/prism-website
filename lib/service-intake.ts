export type IntakeService = 'website' | 'content' | 'ads'

export type IntakeGoal = { value: string; label: string; icon: string }

const sharedEndpoint =
  process.env.NEXT_PUBLIC_WEBSITE_INTAKE_FORM_ENDPOINT ||
  'https://formspree.io/f/xrpzlkrd'

export const SERVICE_INTAKE_CONFIG = {
  website: {
    label: 'Website',
    eyebrow: 'PRO website intake',
    submitLabel: 'Start my website',
    goalHeading: 'Why do you want a new website?',
    timelineHeading: 'When do you want your new website live?',
    timelineHelper: 'This helps us scope the first version.',
    goalField: 'why_new_website',
    endpoint: sharedEndpoint,
    goals: [
      {
        value: 'more_customers',
        label: 'More customers',
        icon: '/lordicon/attract-customers.json',
      },
      {
        value: 'better_design',
        label: 'Better design',
        icon: '/lordicon/web-design.json',
      },
      {
        value: 'better_analytics',
        label: 'Better analytics',
        icon: '/lordicon/line-chart.json',
      },
      {
        value: 'all_of_the_above',
        label: 'All of the above',
        icon: '/lordicon/rocket-space.json',
      },
    ],
  },
  content: {
    label: 'Content',
    eyebrow: 'Content intake',
    submitLabel: 'Start my content',
    goalHeading: 'What should your content do for you?',
    timelineHeading: 'When do you want to start creating?',
    timelineHelper: 'This helps us plan your first content.',
    goalField: 'content_goal',
    endpoint:
      process.env.NEXT_PUBLIC_CONTENT_INTAKE_FORM_ENDPOINT ||
      'https://formspree.io/f/mwlkrezj',
    goals: [
      {
        value: 'build_trust',
        label: 'Build trust',
        icon: '/lordicon/attract-customers.json',
      },
      {
        value: 'grow_audience',
        label: 'Grow my audience',
        icon: '/lordicon/line-chart.json',
      },
      {
        value: 'consistent_content',
        label: 'Post consistently',
        icon: '/lordicon/appointment-schedule.json',
      },
      {
        value: 'all_of_the_above',
        label: 'All of the above',
        icon: '/lordicon/rocket-space.json',
      },
    ],
  },
  ads: {
    label: 'Ads',
    eyebrow: 'Ads intake',
    submitLabel: 'Start my ads',
    goalHeading: 'What should your ads help you achieve?',
    timelineHeading: 'When do you want your ads live?',
    timelineHelper: 'This helps us plan your first campaign.',
    goalField: 'ads_goal',
    endpoint:
      process.env.NEXT_PUBLIC_ADS_INTAKE_FORM_ENDPOINT ||
      'https://formspree.io/f/mnpqgaya',
    goals: [
      {
        value: 'more_leads',
        label: 'More qualified leads',
        icon: '/lordicon/attract-customers.json',
      },
      {
        value: 'more_sales',
        label: 'More sales',
        icon: '/lordicon/line-chart.json',
      },
      {
        value: 'better_return',
        label: 'Better return on ad spend',
        icon: '/lordicon/web-design.json',
      },
      {
        value: 'all_of_the_above',
        label: 'All of the above',
        icon: '/lordicon/rocket-space.json',
      },
    ],
  },
} satisfies Record<
  IntakeService,
  {
    label: string
    eyebrow: string
    submitLabel: string
    goalHeading: string
    timelineHeading: string
    timelineHelper: string
    goalField: string
    endpoint: string
    goals: IntakeGoal[]
  }
>
