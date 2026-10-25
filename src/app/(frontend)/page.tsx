import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const servicesResult = await payload.find({
    collection: 'services',
  })

  const services = servicesResult.docs

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />

      <ServicesSection />

      <TestimonialsSection />
    </main>
  )
}
