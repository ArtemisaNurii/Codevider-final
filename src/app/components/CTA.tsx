"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Mail,
  SendHorizonal,
  Phone,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSubmit } from "../actions/contact";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, setIsPending] = React.useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsPending(true);

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await contactSubmit(formData);

    if (result.success) {
      toast.success(result.message);
      formRef.current?.reset();
    } else {
      toast.error(result.message || "Failed to submit. Please try again.");
    }
  } catch (err) {
    console.error("Contact form submission error:", err);
    toast.error("Something went wrong. Please try again later.");
  } finally {
    setIsPending(false);
  }
};

  return (
    <>
      <div id="contact" className="relative overflow-hidden text-white">
        <section
          className="relative z-10 section-py bg-linear-to-br from-black via-slate-900 to-sky-800"
        >
          <div className="site-container grid lg:grid-cols-2 lg:gap-16 items-stretch">
            <div className="text-center lg:text-left mb-12 lg:mb-0 flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Let&apos;s Connect
              </p>
              <h2 className="text-fluid-heading font-semibold leading-tight text-white mb-6 text-balance">
                Ready to Build Your Next Big Idea?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8 text-pretty leading-relaxed">
                Whether you have a specific project in mind or just want to
                explore possibilities, our team is here to help. Fill out the
                form, or reach out to us directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a
                  href="mailto:hello@codevider.com"
                  className="group flex items-center gap-3 text-left min-h-11 active:scale-[0.98] transition-transform"
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
                  className="group flex items-center gap-3 text-left min-h-11 active:scale-[0.98] transition-transform"
                >
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-sky-400/20 transition-colors">
                    <Phone  className="h-6 w-6 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-semibold"></p>Call Us Now
                    <p className="text-sm text-gray-400">+355 69 587 7742</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                  <div className="space-y-2">
                    <Label htmlFor="companies" className="text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="companies"
                      name="companies"
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
                  <Label htmlFor="details" className="text-gray-300">
                    Tell us about your project
                  </Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="I'm looking to build a new web application that..."
                    // required
                    className="bg-transparent  border-gray-604 min-h-[120px] focus-visible:ring-offset-0 focus-visible:ring-sky-400"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full text-base font-semibold py-6 hover:gap-4 transition-[gap,transform] duration-300 active:scale-[0.96]"
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
      </div>
    </>
  );
};

export default Contact;
