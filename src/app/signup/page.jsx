'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Form } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import animationData from '../../animations/react3.json';
import Lottie from 'lottie-react';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
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
      error: (err) => <b>{err.message || 'Registration Failed!'}</b>,
    });

    try {
      await signupPromise;
      router.push('/');
    } catch (error) {
      // Error handled by toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: window.location.origin + '/',
      });
    } catch (error) {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full bg-white dark:bg-black">
       {/* Left Image Section */}
            <div className="w-full hidden md:inline-block lg:pt-30">
              <div className=" flex items-center justify-center min-h-[350px] relative">
                  <div className="lottie-box w-full max-w-[500px]  relative group overflow-hidden transition-colors duration-300">
                     <Lottie animationData={animationData} loop={true} />
                  </div>
                </div>
            </div>

      {/* Right Form Section */}
      <div className="w-full flex flex-col items-center justify-center p-6">
        <Form onSubmit={onSubmit} className="md:w-96 w-80 flex flex-col items-center">
          <h2 className="text-4xl text-gray-900 dark:text-white font-medium">Create Account</h2>
          <p className="text-sm text-gray-500/90 mt-3">Join RecipeHub to share and discover amazing recipes</p>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition-all cursor-pointer"
          >
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">or sign up with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Form Inputs (Using standard HTML inputs inside the form for stability) */}
          <input name="name" type="text" placeholder="Full Name" className="w-full h-12 rounded-full border border-gray-300/60 pl-6 bg-transparent text-sm text-gray-500 outline-none" required />
          <input name="email" type="email" placeholder="Email id" className="w-full h-12 rounded-full border border-gray-300/60 pl-6 bg-transparent text-sm text-gray-500 mt-6 outline-none" required />
          <input name="image" type="url" placeholder="Profile Image URL" className="w-full h-12 rounded-full border border-gray-300/60 pl-6 bg-transparent text-sm text-gray-500 mt-6 outline-none" />
          <input name="password" type="password" placeholder="Password" className="w-full h-12 rounded-full border border-gray-300/60 pl-6 bg-transparent text-sm text-gray-500 mt-6 outline-none" required minLength={6} />

          <Button 
            type="submit" 
            isLoading={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account? <Link className="text-indigo-400 hover:underline" href="/signin">Login here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}