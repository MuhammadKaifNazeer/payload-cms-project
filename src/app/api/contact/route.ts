import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()

    const values = body?.values ?? {}

    const result = await payload.create({
      collection: 'contact-form-responses',
      data: {
        submittedData: values,
      },
    })

    return Response.json({
      success: true,
      message: 'Your message was sent successfully.',
      data: result,
    })
  } catch (error) {
    console.error('Contact form submission failed:', error)

    return Response.json(
      {
        success: false,
        message: 'Failed to submit the form. Please try again.',
      },
      { status: 500 },
    )
  }
}
