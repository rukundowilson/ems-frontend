'use client';

import Link from 'next/link';

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Purple Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-(--color-purple-gradient-start) to-(--color-purple-gradient-end) items-center justify-center relative overflow-hidden">
        {/* Decorative triangle/arrow pointing right */}
        <div className="absolute right-0 top-0 bottom-0 w-20">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <polygon points="0,0 100,50 0,100" fill="white" />
          </svg>
        </div>
        
        <div className="text-white z-10 px-12">
          <h1 className="text-5xl font-bold leading-tight">
            Sign in or sign up
          </h1>
        </div>
      </div>

      {/* Right Section - White Background */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile heading */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
              Sign in or sign up
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-(--color-text-primary) mb-2">
                Hi! Sign in with your Virtuwell or
              </h2>
              <h2 className="text-2xl font-semibold text-(--color-text-primary)">
                HealthPartners account.
              </h2>
            </div>

            {/* Sign In Button */}
            <Link href="/registration/signin">
              <button className="w-full bg-(--color-purple-primary) hover:bg-(--color-purple-hover) text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Sign in
              </button>
            </Link>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-(--color-gray-border)"></div>
              <span className="px-4 text-(--color-gray-text) font-medium">or</span>
              <div className="flex-1 border-t border-(--color-gray-border)"></div>
            </div>

            {/* Sign Up Button */}
            <Link href="/registration/signup">
              <button className="w-full bg-(--color-purple-primary) hover:bg-(--color-purple-hover) text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
