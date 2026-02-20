"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCaseStudyWorkProfileForCase, normalizeCaseStudyWorkProfile } from "@/lib/case-study-work-highlights"

type CaseStudyWorkHighlightsProps = {
  caseStudySlug: string
}

export function CaseStudyWorkHighlights({ caseStudySlug }: CaseStudyWorkHighlightsProps) {
  const profile = normalizeCaseStudyWorkProfile(getCaseStudyWorkProfileForCase(caseStudySlug))

  if (!profile.services.length && !profile.techStack.length) {
    return null
  }

  return (
    <section className="border-b border-border/60 bg-muted/40 px-4 py-10">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">work highlights</p>
            <CardTitle className="text-2xl tracking-tight sm:text-3xl">What we delivered for this case</CardTitle>
            <CardDescription>Switch between the core service work and the systems stack used to execute it.</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="tech-stack">Tech stack</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {profile.services.map((service) => (
                    <div key={service} className="rounded-lg border border-border/60 bg-background px-4 py-3">
                      <Badge variant="secondary" className="rounded-full">
                        {service}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tech-stack" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {profile.techStack.map((tech) => (
                    <div key={tech} className="rounded-lg border border-border/60 bg-background px-4 py-3">
                      <span className="text-sm font-medium text-muted-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
