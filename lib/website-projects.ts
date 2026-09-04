export type WebsiteProject = {
  id: string
  title: string
  url: string
  external?: boolean
  category: string
  description: string
}

export const websiteProjects: WebsiteProject[] = [
  {
    id: '19',
    title: 'waikiki dental',
    url: '/case-studies/waikiki-dental',
    external: false,
    category: 'healthcare',
    description:
      'anxiety-friendly family, cosmetic, implant, and sedation dentistry in roseville',
  },
  {
    id: '20',
    title: 'sacramento dental medicine',
    url: '/case-studies/sacramento-dental-medicine',
    external: false,
    category: 'healthcare',
    description:
      'modern family, cosmetic, and restorative dentistry in antelope',
  },
  {
    id: '4',
    title: 'exquisite dentistry',
    url: 'https://exquisitedentistryla.com/',
    category: 'healthcare',
    description: 'cosmetic and restorative dentistry in los angeles',
  },
  {
    id: '9',
    title: 'belize kids',
    url: 'https://belizekids.org',
    category: 'nonprofit',
    description: 'empowering children through education and community',
  },
  {
    id: '7',
    title: 'laguna beach dental arts',
    url: '/case-studies/laguna-beach-dental-arts',
    external: false,
    category: 'healthcare',
    description: 'exceptional dental care in coastal california',
  },
  {
    id: '3',
    title: 'olympic bootworks',
    url: 'https://www.olympicbootworks.com',
    category: 'retail',
    description: 'performance footwear and repair solutions',
  },
  {
    id: '5',
    title: 'dr. christopher wong',
    url: 'https://www.chriswongdds.com',
    category: 'healthcare',
    description: 'modern dental care with a personal touch',
  },
  {
    id: '12',
    title: 'olympic bootworks fantic e-bikes',
    url: 'https://www.olympicbootworks.com/e-bikes',
    category: 'retail',
    description:
      'current fantic e-bike catalog, pricing, and test-ride inquiries',
  },
  {
    id: '11',
    title: 'coast periodontics',
    url: 'https://www.coastperiodontics.com',
    category: 'healthcare',
    description: 'expert periodontal and implant care',
  },
  {
    id: '13',
    title: 'grace dental santa rosa',
    url: 'https://www.tingjenjidds.com/',
    category: 'healthcare',
    description: 'exceptional family dental care in santa rosa',
  },
  {
    id: '14',
    title: 'town centre dental',
    url: 'https://towncentredental.net/',
    category: 'healthcare',
    description: 'family dentistry with dr. gerard banaga in brentwood',
  },
  {
    id: '15',
    title: 'family first smile care',
    url: 'https://famfirstsmile.com/',
    category: 'healthcare',
    description: 'family-focused dental care in los gatos',
  },
  {
    id: '16',
    title: 'rebellious aging',
    url: 'https://rebelwithsuz.com/',
    category: 'wellness',
    description: 'age boldly: confidence, style, and plant-based longevity',
  },
  {
    id: '17',
    title: 'canary foundation',
    url: 'https://www.canaryfoundation.org/',
    category: 'nonprofit',
    description: 'early cancer detection research nonprofit',
  },
  {
    id: '18',
    title: 'wine country root canal',
    url: 'https://www.winecountryrootcanal.com/',
    category: 'healthcare',
    description: 'santa rosa endodontics: gentle root canal therapy',
  },
]
