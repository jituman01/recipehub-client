'use client';

import { authClient } from '@/lib/auth-client';
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
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { BiDish } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const signupPromise = authClient.signUp.email({
      ...user,
      plan: 'free',
    });

    await toast.promise(signupPromise, {
      loading: 'Creating Account...',
      success: <b>Create Account Successfully!</b>,
      error: err => <b>{err.message || 'Registration Failed!'}</b>,
    });

    try {
      await signupPromise;
      router.push('/');
    } catch (error) {
      // console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4  sm:p-8 max-w-xl mx-auto  mb-20">
      <div className="w-full rounded-4xl border border-yellow-200 dark:border-yellow-900 bg-white dark:bg-white/10 backdrop-blur-3xl px-6 sm:p-8 transition-colors duration-300 shadow-2xl shadow-yellow-200 dark:shadow-yellow-900">
        <Form onSubmit={onSubmit} className="space-y-6">
          <Fieldset className="w-full space-y-2">
            {/* Header Section */}
            <div className="text-center space-y-1 mb-4">
              {/* <p className="font-extrabold text-2xl "><span className="text-yellow-500">Recipe</span>Hub</p> */}
              <Fieldset.Legend className="text-2xl font-extrabold text-yellow-500  tracking-tight">
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
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                  Full Name
                </Label>
                <Input
                  placeholder="Enter Your Name"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-black border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Email Field */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
              >
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                  Email Address
                </Label>
                <Input
                  placeholder="Enter Your Email"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-black border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Image URL Field */}
              <TextField name="image" type="url" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                  Profile Image URL
                </Label>
                <Input
                  placeholder="Enter Your Image URL"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-black border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Password Field */}
              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full"
              >
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                  Password
                </Label>
                <Input
                  placeholder="Enter Your Password"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-black border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
                  minLength={6}
                  pattern="^(?=.*[a-z])(?=.*[A-Z]).+$"
                  title="Password must be at least 6 characters long, contain at least one uppercase letter and one lowercase letter."
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Submit Button with yellow Gradient Accent */}
            <div className="">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-[0.98] transition-all text-center text-sm"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
            {/*  OR Divider Layout */}
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
              <span className="mx-4 text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
            </div>

            {/* Google Login Button */}
            <div>
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                isDisabled={loading || googleLoading}
                variant="bordered"
                className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-semibold rounded-xl active:scale-[0.98] transition-all text-center text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/30"
              >
                <FcGoogle size={20} />
                {googleLoading ? 'Connecting to Google...' : 'Sign up with Google'}
              </Button>
            </div>

            {/* Bottom Redirect Link */}
            <p className="text-center text-xs text-slate-500 dark:text-zinc-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
}
