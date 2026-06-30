'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Form, TextField, Input, FieldError } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import animationData from '../../animations/react4.json';
import Lottie from 'lottie-react';


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
      { email, password },
      {
        onSuccess: () => {
          toast.success('Successfully logged in!');
          router.push('/');
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          setErrorMsg(ctx.error.message || 'Invalid email or password.');
        },
      }
    );
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ 
      provider: 'google', 
      callbackURL: '/' 
    });
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-black/10">
      {/* Left Image Section */}
      <div className="w-full hidden md:inline-block lg:pt-30">
        <div className=" flex items-center justify-center min-h-[350px] relative">
            <div className="lottie-box w-full max-w-[500px]  relative group overflow-hidden transition-colors duration-300">
               <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full flex flex-col items-center  justify-center ">
        <div className='border-2 rounded-3xl p-5'>
          <Form onSubmit={onSubmit} className="md:w-96  w-80 flex flex-col items-center">
          <h2 className="text-4xl text-gray-900 dark:text-white font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition-all"
          >
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {errorMsg && <p className="text-red-500 text-xs mb-4">{errorMsg}</p>}

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input name="email" type="email" placeholder="Email id" className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full" required />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input name="password" type="password" placeholder="Password" className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full" required />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">Remember me</label>
            </div>
            <Link className="text-sm underline" href="/forgot-password">Forgot password?</Link>
          </div>

          <Button 
            type="submit" 
            isLoading={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Login
          </Button>

          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account? <Link className="text-indigo-400 hover:underline" href="/signup">Sign up</Link>
          </p>
        </Form>
        </div>
      </div>
    </div>
  );
}