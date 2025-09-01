"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

import { Instagram, Facebook, Linkedin, Mail, Calendar, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Reusable Footer Component
export const Footer: React.FC = () => {
  return (
    <footer id='contact' className="relative z-10 pt-12  border-black/40 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/20 pb-8 mb-8">
          <p className="text-center md:text-left text-gray-900 max-w-2xl">
            Stay updated on our latest developments, insights, and opportunities by following us.
          </p>
          <button
            className="border border-black/80 px-8 py-3 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors w-full md:w-auto flex-shrink-0"
            onClick={() => (window.location.href = "mailto:hr@codevider.com")}
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* --- MODIFIED LAYOUT: Three columns layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-900">Company</p>
            <ul className="space-y-2 text-gray-900">
              <li><a href="#about" className="">About Us</a></li>
              <li><a href="#services" className="">Services</a></li>
              <li><a href="#projects" className="">Projects</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-900">Address</p>
            <div className="space-y-2 text-gray-900">
              <p>Codevider</p>
              <p>Barrikada Street</p>
              <p>Tirana, Albania 1001</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-base text-gray-900">Contact</p>
            <ul className="space-y-2 text-gray-900">
              <li><a href="mailto:hello@codevider.com" className="e">hr@codevider.com</a></li>
              <li><a href="tel:+355695877742" className=""> +355 695877742</a></li>
              <li><a href="tel:+355695877742" className=""> +1 224-788-0689</a></li>
            </ul>
          </div>
        </div>

        {/* --- NEW SECTION: Social Icons and Legal Links --- */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/codevider/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="text-gray-900 hover:text-sky-900 text-2xl transition-colors" />
            </a>
            <a href="https://www.facebook.com/codevider/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="text-gray-900 hover:text-sky-900 text-2xl transition-colors" />
            </a>
            <a href="https://al.linkedin.com/company/codevider" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="text-gray-900 hover:text-sky-900text-2xl transition-colors" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
           
          </div>
        </div>

        <div className=" border-t border-white/20 pt- text-center">
          <p className="text-sm text-gray-900">© {new Date().getFullYear()} Codevider. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    budget: '$500 – $1,000',
  });

  const handleSelectChange = (value: string) => {
    setForm({ ...form, budget: value });
  };

  useEffect(() => {
    // Observer logic if needed
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Thank you! Your message has been sent.');
  };

  return (
    <>

      <div
        id="contact" 
        className="relative overflow-hidden text-white"
      >

        <section
          ref={sectionRef}
          className="relative z-10 py-20 sm:py-28 bg-gradient-to-br from-black via-[#050a08] to-[#0ea5e9] px-4 sm:px-6 lg:px-8"
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
                Whether you have a specific project in mind or just want to explore possibilities, our team is here to help. Fill out the form, or reach out to us directly.
              </p>
              
              {/* Alternative Contact Methods */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a href="mailto:hello@codevider.com" className="group flex items-center gap-3 text-left">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-sky-400/20 transition-colors">
                    <Mail className="h-6 w-6 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Us Directly</p>
                    <p className="text-sm text-gray-400">hello@codevider.com</p>
                  </div>
                </a>
                <a href="#schedule-call" className="group flex items-center gap-3 text-left">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-sky-400/20 transition-colors">
                    <Calendar className="h-6 w-6 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Schedule a Call</p>
                    <p className="text-sm text-gray-400">Book a 15-min intro</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="w-full flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                      <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                          <Input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"/>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={form.email} onChange={handleChange} required className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"/>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-400">Tell us about your project</Label>
                      <Textarea id="description" name="description" placeholder="I'm looking to build a new web application that..." value={form.description} onChange={handleChange} required className="bg-transparent border-gray-604 min-h-[120px] focus-visible:ring-offset-0 focus-visible:ring-sky-400"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="budget" className="text-gray-400">What&apos;s your budget?</Label>
                      <Select name="budget" value={form.budget} onValueChange={handleSelectChange}>
                          <SelectTrigger id="budget" className="w-full bg-transparent border-gray-604 focus:ring-offset-0 focus:ring-sky-400">
                              <SelectValue placeholder="Select a budget range" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="$500 – $1,000">$500 – $1,000</SelectItem>
                              <SelectItem value="$1,000 – $5,000">$1,000 – $5,000</SelectItem>
                              <SelectItem value="$5,000 – $10,000">$5,000 – $10,000</SelectItem>
                              <SelectItem value="$10,000+">$10,000+</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                  <Button type="submit" variant="secondary" className="w-full text-base font-semibold py-6">
                      Send Your Message
                      <Send className="ml-2 h-5 w-5" />
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