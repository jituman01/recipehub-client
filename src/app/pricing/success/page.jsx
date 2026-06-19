import { stripe } from '@/lib/stripe'
import { Button } from '@heroui/react'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <main className="min-h-[80vh] bg-transparent flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-content1 border border-divider bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-xl transition-all">
        
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 mb-6 animate-bounce">
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-orange-500 font-semibold tracking-wide uppercase">
          Welcome to Pro Chef Tier
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-divider" />

        <p className="text-default-500 text-sm leading-relaxed px-2">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-bold text-foreground bg-default-100 px-1.5 py-0.5 rounded-md inline-flex items-center gap-1">
            <Mail size={12} /> {customerEmail}
          </span>
          . If you have any questions, please email{" "}
          <a 
            href="mailto:orders@example.com" 
            className="text-orange-500 font-medium hover:underline transition-all"
          >
            support@recipehub.com
          </a>
          .
        </p>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
              <Link href='/'>
                <Button
              
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-98"
          >
            <span className="flex items-center gap-1.5 text-sm">
              Go to Home <ArrowRight size={16} />
            </span>
          </Button>
              </Link>
        </div>
      </div>
    </main>
      </section>
    )
  }
}