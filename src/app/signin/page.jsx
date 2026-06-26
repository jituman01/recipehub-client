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
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
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
        onSuccess: () => {
          toast.success('Successfully logged in!');
          setLoading(false);
          router.push('/'); 
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          setErrorMsg(
            ctx.error.message || 'Invalid email or password. Please try again.'
          );
        },
      }
    );
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
    <div className="flex items-center justify-center p-4 sm:p-8 max-w-xl mx-auto mb-20 mt-10">
      <div className="w-full rounded-4xl border border-yellow-200 dark:border-yellow-900 bg-white dark:bg-white/10 backdrop-blur-3xl p-6 sm:p-8 transition-colors duration-300 shadow-2xl shadow-yellow-200 dark:shadow-yellow-900">
        <Form onSubmit={onSubmit} className="space-y-6">
          <Fieldset className="w-full space-y-2">
            <div className="text-center space-y-1 mb-4">
              <Fieldset.Legend className="text-2xl font-extrabold text-yellow-500 tracking-tight">
                LogIn
              </Fieldset.Legend>
              <Description className="text-sm text-slate-500 dark:text-zinc-400">
                Sign in to your RecipeHub account to continue
              </Description>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <Fieldset.Group className="space-y-4">
              <TextField isRequired name="email" type="email" className="w-full">
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

              <TextField isRequired name="password" type="password" className="w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                  Password
                </Label>
                <Input
                  placeholder="Enter Your Password"
                  variant="secondary"
                  className="w-full bg-gray-150 dark:bg-black border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500"
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

            <div className="pt-4">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-[0.98] transition-all text-center text-sm"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
              <span className="mx-4 text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
            </div>

            <div>
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                isDisabled={loading || googleLoading}
                variant="bordered"
                className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-semibold rounded-xl active:scale-[0.98] transition-all text-center text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/30"
              >
                <FcGoogle size={20} />
                {googleLoading ? 'Connecting to Google...' : 'Sign in with Google'}
              </Button>
            </div>

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