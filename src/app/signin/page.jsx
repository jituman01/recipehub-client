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
  TextField,
} from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success('Successfully logged in!');
          setLoading(false);
          router.push(callbackUrl);
          router.refresh();
        },
        onError: ctx => {
          setLoading(false);
          console.error('Login Error Context:', ctx);
          setErrorMsg(
            ctx.error.message || 'Invalid email or password. Please try again.'
          );
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 max-w-xl mx-auto mb-20 mt-10">
      <div className="w-full rounded-2xl border border-gray-300 dark:border-zinc-800/80 bg-white dark:bg-transparent backdrop-blur-3xl p-6 sm:p-8 transition-colors duration-300">
        <Form onSubmit={onSubmit} className="space-y-6">
          <Fieldset className="w-full space-y-2">
            {/* Header Section */}
            <div className="text-center space-y-1 mb-4">
              <Fieldset.Legend className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome Back
              </Fieldset.Legend>
              <Description className="text-sm text-slate-500 dark:text-zinc-400">
                Sign in to your RecipeHub account to continue
              </Description>
            </div>

            {/* Error handling visualization */}
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Input Fields Group */}
            <Fieldset.Group className="space-y-4">
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
                  placeholder="john@example.com"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
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
                  placeholder="••••••••"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
                />
                <Link
                  href="/forgot-password"
                  className="text-xs text-yellow-500 hover:underline inline-block mt-1"
                >
                  Forgotten Password?
                </Link>
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-[0.98] transition-all text-center text-sm"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

            {/* Bottom Redirect Link */}
            <p className="text-center text-xs text-slate-500 dark:text-zinc-400 pt-4">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
}
