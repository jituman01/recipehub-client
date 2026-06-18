"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  div,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { BiDish } from "react-icons/bi";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      await authClient.signUp.email({
        ...user,
        plan: 'free',
      });
      
      router.push('/');
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4  sm:p-8 max-w-xl mx-auto  mb-20">
      <div className="w-full rounded-2xl border border-gray-300 dark:border-zinc-800/80 bg-white dark:bg-transparent backdrop-blur-3xl p-6 sm:p-8 transition-colors duration-300">
        <Form onSubmit={onSubmit} className="space-y-6">
          <Fieldset className="w-full space-y-2">
            
            {/* Header Section */}
            <div className="text-center space-y-1 mb-4">
              <Fieldset.Legend className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Create Account
              </Fieldset.Legend>
              <Description className="text-sm text-slate-500 dark:text-zinc-400">
                Join RecipeHub to share and discover amazing recipes
              </Description>
            </div>

            {/* Input Fields Group */}
            <Fieldset.Group className="space-y-4">
              
              {/* Name Field */}
              <TextField isRequired name="name" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">Full Name</Label>
                <Input 
                  placeholder="John Doe" 
                  variant="secondary" 
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Email Field */}
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">Email Address</Label>
                <Input 
                  placeholder="john@example.com" 
                  variant="secondary" 
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Image URL Field */}
              <TextField name="image" type="url" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">Profile Image URL</Label>
                <Input 
                  placeholder="https://example.com/avatar.jpg" 
                  variant="secondary" 
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              

              {/* Password Field */}
              <TextField isRequired name="password" type="password" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">Password</Label>
                <Input 
                  placeholder="••••••••" 
                  variant="secondary" 
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>


            </Fieldset.Group>

            {/* Submit Button with Orange Gradient Accent */}
            <div className="pt-4">
              <Button 
                type="submit" 
                isDisabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-[0.98] transition-all text-center text-sm"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </div>

            {/* Bottom Redirect Link */}
            <p className="text-center text-xs text-slate-500 dark:text-zinc-400 pt-4">
              Already have an account?{" "}
              <Link href="/signin" className="text-orange-500 hover:underline font-semibold">
                Login here
              </Link>
            </p>

          </Fieldset>
        </Form>
      </div>
    </div>
  );
}