import React from 'react'

import { CANONICAL_PRICING_OFFERS } from '@/lib/pricing-model'
import { getCaseStudyMetric } from '@/lib/case-study-data'

export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
