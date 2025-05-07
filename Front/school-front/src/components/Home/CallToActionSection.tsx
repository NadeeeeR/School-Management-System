// src/components/Home/CallToActionSection.tsx
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RxGithubLogo } from "react-icons/rx";
import { RxLinkedinLogo } from 'react-icons/rx';
import { RxTwitterLogo } from 'react-icons/rx';
import { RxInstagramLogo } from 'react-icons/rx';
import { BiLogoGmail } from "react-icons/bi";
import { AiOutlineMediumWorkmark } from "react-icons/ai";
import { AiOutlineMedium } from "react-icons/ai";

export function CallToActionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Contact us 
          </h2>
          <p className="text-lg text-gray-600 md:text-xl">
            Our website is under construction. Please contact us for more information.
          </p>
          </div>
      </div>
    </section>
  );
}
