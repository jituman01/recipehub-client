"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Check, ArrowRight, ChefHat, ShieldCheck, BarChart3, Sparkles } from "lucide-react";

export default function UserPricingPage() {
  const plans = [
    {
      name: "Starter Plan",
      price: "Free",
      period: "",
      description: "Perfect for exploring RecipeHub and sharing basic dishes.",
      features: [
        "Create up to 2 Recipes",
        "Basic recipe views count",
        "Standard layout builder",
        "Public user profile",
        "Community support",
      ],
      popular: false,
    },
    {
      name: "Pro Plan",
      price: "$9.99",
      period: "/lifetime",
      description: "For passionate foodies who want unlimited freedom.",
      features: [
        "Create Unlimited Recipes",
        "Advanced cooking analytics",
        "Priority homepage listing",
        "Add video cooking steps link",
        "Premium badges on profile",
        "Priority developer support",
      ],
      popular: true,
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      period: "",
      description: "For culinary schools, restaurants, and professional brands.",
      features: [
        "Everything in Pro Plan",
        "Dedicated account manager",
        "Collaborative shared dashboard",
        "Featured masterclass placement",
        "Custom recipe API access",
        "24/7 dedicated support",
      ],
      popular: false,
    },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      
      <section className="mx-auto max-w-7xl px-4 py-7 text-center">

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight md:text-4xl">
          Share Your Culinary Art
          <span className="block text-orange-500 mt-2">
            Reach Thousands of Food Lovers
          </span>
        </h1>

      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl border bg-content1 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? "border-orange-500 ring-4 ring-orange-500/10 z-10" 
                  : "border-divider"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white tracking-wide shadow-sm">
                  Most Popular Plan
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2.5 text-sm text-default-400 min-h-[40px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">{plan.price}</span>
                  <span className="text-sm font-medium text-default-400 ml-1">{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-divider pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-default-600">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 dark:bg-orange-950/50">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="pt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {plan.name === "Enterprise Plan" || plan.name === "Starter Plan" ? (
            <Button
            className="mt-8 w-full text-black dark:text-white bg-transparent "
            >Not Available
            </Button>
              ) : (
             <form
              action={'/api/subscription'}
              method="POST">
                      <Button
                        type="submit"
              className="mt-8 w-full font-medium bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
              >       
            Upgrade to Pro
         </Button>    
          </form>
              )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-divider bg-content1/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Why Publish On RecipeHub?</h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-divider bg-background p-5 shadow-xs">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/50">
                <ChefHat size={20} />
              </div>
              <h3 className="font-bold text-base">Foodie Community</h3>
              <p className="mt-2 text-xs text-default-400 leading-relaxed">
                Reach thousands of active food lovers hunting for new kitchen stories every single day.
              </p>
            </div>

            <div className="rounded-2xl border border-divider bg-background p-5 shadow-xs">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/50">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-base">Verified Badges</h3>
              <p className="mt-2 text-xs text-default-400 leading-relaxed">
                Build trust with verified user profile badges and ensure copyright protection of your recipes.
              </p>
            </div>

            <div className="rounded-2xl border border-divider bg-background p-5 shadow-xs">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/50">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-bold text-base">Recipe Analytics</h3>
              <p className="mt-2 text-xs text-default-400 leading-relaxed">
                Deep dive and track how many users view, save, or favorite your custom recipes instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-divider bg-background p-5 shadow-xs">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/50">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-base">Smart Dashboard</h3>
              <p className="mt-2 text-xs text-default-400 leading-relaxed">
                Easily organize dynamic categories, ingredient scaling, and manage cooking step timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-500/10 to-transparent p-8 sm:p-12 text-center dark:border-orange-950/30">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to Start Cooking?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-default-400 leading-relaxed">
            Join our platform ecosystem today and unlock the perfect creation flow for your food recipes and culinary stories.
          </p>

          <Button 
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-orange-500/10 active:scale-95"
          >
            <span className="flex items-center gap-1.5 text-sm">
              Create First Recipe <ArrowRight size={15} />
            </span>
          </Button>
        </div>
      </section>

    </main>
  );
}