import type { FC } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import NavbarCodeviderLogo from "./navbar-codevider-logo";

export const SiteFooter: FC = () => {
  return (
    <footer
      id="contact"
      className="relative z-10 py-8 sm:py-12 lg:py-16 bg-slate-50 text-gray-900"
    >
      <div className="site-container">
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
                <Link href="/career" className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block space-y-4">
            <p className="font-bold text-base text-gray-900">Address</p>
            <Link href="https://maps.app.goo.gl/2pnTspdXV1VRiMLN7" target="_blank" rel="noopener noreferrer">
              <address className="space-y-2 text-gray-700 not-italic leading-6">
                <p>Codevider</p>
                <p>Barrikada Street</p>
                <p>Tirana, Albania 1001</p>
              </address>
            </Link>
          </div>

          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <p className="font-bold text-lg sm:text-base text-gray-900">Contact</p>
            <ul className="space-y-4 text-gray-700">
              <li>
                <a
                  href="mailto:hr@codevider.com"
                  className="hover:text-blue-600 transition-colors wrap-break-word text-base sm:text-sm block py-1 font-medium"
                >
                  info@codevider.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+355695877742"
                  className="hover:text-blue-600 transition-colors text-base sm:text-sm block py-1 font-medium"
                >
                  +355 69 587 7742
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="text-left">
              <NavbarCodeviderLogo logoTextColor="text-gray-900" />
              <p className="mt-4 text-gray-600 text-sm sm:text-xs max-w-md leading-relaxed">
                Stay updated on our latest developments, insights, and opportunities.
              </p>

              <address className="mt-4 text-sm sm:text-xs text-gray-500 not-italic md:hidden leading-relaxed">
                <strong>Codevider</strong><br />
                Barrikada Street<br />
                Tirana, Albania 1001
              </address>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
              <p className="text-sm text-gray-600 mr-2 hidden sm:block">Follow us:</p>
              <a
                href="https://www.instagram.com/codevider/"
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

          <p className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Codevider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
