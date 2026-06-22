import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';


export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const userSession = await auth.api.getSession({
      headers: await headers()
    })

    const user = userSession?.user;
    const formData = await request.formData();
    const price = formData.get('price');
    const recipeName = formData.get('recipeName');
    const recipeId = formData.get('recipeId');
    const image = formData.get('image');
    const authorName = formData.get('authorName');
    


    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,

      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(price) * 100),
          product_data: {
            name: recipeName,
          }
        },
          quantity: 1,
        },
      ],
      metadata: {
        price: price || '4.99',
        userId: user?.id || "",
        userEmail: user?.email || "",
        recipeName: recipeName || "",
        recipeId: recipeId || "",
        image: image || "",
        authorName: authorName || "",

      },

      mode: 'payment',
      success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}




export async function GET() {
  return NextResponse.json({ message: "hello from subscription api route" });
}