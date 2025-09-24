"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  SendHorizonal,
  Phone,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactSubmit } from "../actions/contact";

// Reusable Footer Component
export const Footer: React.FC = () => {

  return (
    <footer
    id="contact"
    className="relative z-10 py-8 sm:py-12 lg:py-16 px-6 sm:px-6 lg:px-8 bg-slate-50 text-gray-900"
  >
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-between gap-x-6 gap-y-8 text-left">
        <div className="space-y-4">
          <p className="font-bold text-lg sm:text-base text-gray-900">Company</p>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link href="/about" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                Services
              </Link>
            </li>
            <li>
              {/* <Link href="/projects" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                Projects
              </Link> */}
            </li>
            <li>
              <Link href="/career" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 (DESKTOP ONLY): Address */}
        <div className="hidden md:block space-y-4">
          <p className="font-bold text-base text-gray-900">Address</p>
          <address className="space-y-2 text-gray-700 not-italic leading-6">
            <p>Codevider</p>
            <p>Barrikada Street</p>
            <p>Tirana, Albania 1001</p>
          </address>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-4 sm:col-span-2 md:col-span-1">
          <p className="font-bold text-lg sm:text-base text-gray-900">Contact</p>
          <ul className="space-y-4 text-gray-700">
            <li>
              <a
                href="mailto:hr@codevider.com"
                className="hover:text-blue-600 transition-colors break-words text-base sm:text-sm block py-1 font-medium"
              >
                info@codevider.com
              </a>
            </li>
            <li>
              <a 
                href="tel:+355695877742" 
                className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1 font-medium"
              >
                +355 695 877 742
              </a>
            </li>
            <li>
              <a 
                href="tel:+12247880689" 
                className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1 font-medium"
              >
                +1 224 788 0689
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left: Logo, Tagline, and Mobile-Only Address */}
          <div className="text-left">
            <Image
              src="/images/logo/blue.png"
              alt="Codevider Logo"
              width={120}
              height={32}
              className="h-10 sm:h-8 w-auto"
              priority
            />
            <p className="mt-4 text-gray-600 text-sm sm:text-xs max-w-md leading-relaxed">
              Stay updated on our latest developments, insights, and opportunities by following us.
            </p>

            {/* Address for MOBILE VIEW ONLY */}
            <address className="mt-4 text-sm sm:text-xs text-gray-500 not-italic md:hidden leading-relaxed">
              <strong>Codevider</strong><br />
              Barrikada Street<br />
              Tirana, Albania 1001
            </address>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
            <p className="text-sm text-gray-600 mr-2 hidden sm:block">Follow us:</p>
            <a
              href="https://www.instagram.com/codevider/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/codevider/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://al.linkedin.com/company/codevider"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Codevider. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      const result = await contactSubmit(formData);
      
      if (result.success) {
        toast.success(result.message);
        // Reset form on success
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    // Observer logic if needed
  }, []);

  return (
    <>
      <div id="contact" className="relative overflow-hidden text-white">
        <section
          ref={sectionRef}
          className="relative z-10 py-20 sm:py-28 bg-gradient-to-br from-black via-slate-900 to-sky-800 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-16 items-stretch">
            <div className="text-center lg:text-left mb-12 lg:mb-0 flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Let&apos;s Connect
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-white mb-6">
                Ready to Build Your Next Big Idea?
              </h2>
              <p className="text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8">
                Whether you have a specific project in mind or just want to
                explore possibilities, our team is here to help. Fill out the
                form, or reach out to us directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a
                  href="mailto:hello@codevider.com"
                  className="group flex items-center gap-3 text-left"
                >
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-sky-400/20 transition-colors">
                    <Mail className="h-6 w-6 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Us Directly</p>
                    <p className="text-sm text-gray-400">info@codevider.com</p>
                  </div>
                </a>
                <a
                  href="#schedule-call"
                  className="group flex items-center gap-3 text-left"
                >
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-sky-400/20 transition-colors">
                    <Phone  className="h-6 w-6 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-semibold"></p>Call Us Now
                    <p className="text-sm text-gray-400">+1 224-788-0689</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center">
              <form ref={formRef} action={handleSubmit} className="space-y-4 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Tell us about your project
                  </Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="I'm looking to build a new web application that..."
                    required
                    className="bg-transparent  border-gray-604 min-h-[120px] focus-visible:ring-offset-0 focus-visible:ring-sky-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-300">
                    What&apos;s your budget?
                  </Label>
                  <Select
                    name="budget"
                    defaultValue="$500 – $1,000"
                  >
                    <SelectTrigger
                      id="budget"
                      className="w-full bg-transparent border-gray-604 focus:ring-offset-0 focus:ring-sky-400"
                    >
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500 – $1,000">
                        $500 – $1,000
                      </SelectItem>
                      <SelectItem value="$1,000 – $5,000">
                        $1,000 – $5,000
                      </SelectItem>
                      <SelectItem value="$5,000 – $10,000">
                        $5,000 – $10,000
                      </SelectItem>
                      <SelectItem value="$10,000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full text-base font-semibold py-6 hover:gap-4 transition-all duration-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Your Message
                      <SendHorizonal className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
