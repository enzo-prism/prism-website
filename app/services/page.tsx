import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Zap, Target, Users, TrendingUp, Award } from 'lucide-react';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { PageHero, PageSection, PageCTA } from '@/components/page-layout';
import { getService } from '@/lib/services';

export const metadata: Metadata = generatePageMetadata({
  title: 'Services - AI-Powered Digital Marketing',
  description: 'Discover our comprehensive suite of AI-powered digital marketing services. From websites to ads, we help businesses grow with data-driven strategies and cutting-edge technology.',
  keywords: ['digital marketing services', 'AI marketing', 'website development', 'PPC advertising', 'content marketing', 'SEO services'],
  canonical: '/services',
  ogType: 'website',
});

export default function ServicesPage() {
  const websiteService = getService('website');
  const adsService = getService('ads');
  const contentService = getService('content');
  const websitePrice = websiteService?.pricing.displayPrice ?? '$2,997';
  const adsPrice = adsService?.pricing.displayPrice ?? '$2,997';
  const contentPrice = contentService?.pricing.displayPrice ?? '$2,000';

  const services = [
    {
      title: 'Website Development',
      description: 'Custom websites designed to convert visitors into customers with AI-powered optimization.',
      features: ['Custom Design & Development', 'Mobile-First Approach', 'SEO Optimization', 'Conversion Rate Optimization', 'Analytics Integration', 'Ongoing Support'],
      price: `${websitePrice}/month`,
      popular: true,
      href: '/websites',
      icon: Target
    },
    {
      title: 'PPC Advertising',
      description: 'Data-driven advertising campaigns that maximize ROI and drive qualified traffic.',
      features: ['Google Ads Management', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'Campaign Optimization', 'A/B Testing', 'Performance Reporting'],
      price: `${adsPrice}/month`,
      popular: false,
      href: '/ads',
      icon: TrendingUp
    },
    {
      title: 'Content Marketing',
      description: 'Strategic content that builds authority, engages audiences, and drives organic growth.',
      features: ['Content Strategy', 'Blog Writing', 'Social Media Content', 'Email Marketing', 'Video Production', 'SEO Content'],
      price: `${contentPrice}/month`,
      popular: false,
      href: '/content',
      icon: Users
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your business, competitors, and target audience to create a comprehensive strategy.'
    },
    {
      step: '02',
      title: 'Implementation',
      description: 'Our team executes the strategy with precision, using the latest tools and technologies.'
    },
    {
      step: '03',
      title: 'Optimization',
      description: 'We continuously monitor, test, and optimize campaigns for maximum performance.'
    },
    {
      step: '04',
      title: 'Growth',
      description: 'Scale successful strategies and expand into new markets and opportunities.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      content: 'Prism transformed our digital presence. Our website conversions increased by 300% in just 3 months.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      company: 'GrowthCo',
      role: 'Marketing Director',
      content: 'The PPC campaigns they created generated 5x more qualified leads than our previous agency.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'ScaleUp',
      role: 'Founder',
      content: 'Their content strategy helped us become thought leaders in our industry. Organic traffic doubled.',
      rating: 5
    }
  ];

  const serviceSchema = generateServiceSchema({
    name: 'Digital Marketing Services',
    description: 'Comprehensive AI-powered digital marketing services including website development, PPC advertising, and content marketing.',
    url: 'https://www.design-prism.com/services',
    provider: {
      name: 'Prism',
      url: 'https://www.design-prism.com'
    },
    serviceType: 'Digital Marketing',
    areaServed: 'United States'
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.design-prism.com' },
    { name: 'Services', url: 'https://www.design-prism.com/services' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <PageHero
          title="Website. Content. Ads."
          subtitle="AI-powered digital marketing that drives real results. We combine cutting-edge technology with proven strategies to help your business grow."
          ctaText="Get Started"
          ctaHref="/pricing"
        />

        {/* Services Grid */}
        <PageSection title="Our Services" subtitle="Choose the services that best fit your business needs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className={`relative ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-gray-900">{service.price}</div>
                      <div className="text-sm text-gray-500">Starting price</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PageSection>

        {/* Process Section */}
        <PageSection title="Our Process" subtitle="How we deliver results for your business" className="bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* Testimonials */}
        <PageSection title="What Our Clients Say" subtitle="Real results from real businesses">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>

        {/* CTA Section */}
        <PageCTA
          title="Ready to Grow Your Business?"
          subtitle="Let's discuss how our services can help you achieve your goals."
          ctaText="Get Started"
          ctaHref="/pricing"
        />
      </div>
    </>
  );
}
