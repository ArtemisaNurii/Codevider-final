"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CodeviderLogo } from "./CodeviderLogo";
import { FooterSocials } from "./footer-socials";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="bg-[#0f1424] px-6 py-[clamp(54px,7vw,84px)] pb-[30px] text-blue-100/70 sm:px-10 md:px-14">
			<div className="mx-auto max-w-[1200px]">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
					<div>
						<Link
							href="/"
							className="inline-flex items-center gap-2.5 -ml-1 text-white"
						>
							<CodeviderLogo />
						</Link>
						<p className="mt-[18px] max-w-[30ch] text-[15px] leading-relaxed">
							{t("description")}
						</p>
					</div>

					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
							{t("company")}
						</h4>
						<Link
							href="/about"
							className="block py-1.5 text-[15px] transition-colors hover:text-white"
						>
							{t("about")}
						</Link>
						<Link
							href="/services"
							className="block py-1.5 text-[15px] transition-colors hover:text-white"
						>
							{t("services")}
						</Link>
						<Link
							href="/career"
							className="block py-1.5 text-[15px] transition-colors hover:text-white"
						>
							{t("careers")}
						</Link>
					</div>

					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
							{t("address_heading")}
						</h4>
						<p className="py-1.5 text-[15px]">{t("address_line_1")}</p>
						<p className="py-1.5 text-[15px]">{t("address_line_2")}</p>
						<p className="py-1.5 text-[15px]">{t("address_line_3")}</p>
					</div>

					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white">
							{t("contact_heading")}
						</h4>
						<a
							href="mailto:info@codevider.com"
							className="block py-1.5 text-[15px] transition-colors hover:text-white"
						>
							info@codevider.com
						</a>
						<a
							href="tel:+35569587742"
							className="block py-1.5 text-[15px] transition-colors hover:text-white"
						>
							+355 69 587 7742
						</a>
					</div>
				</div>

				<div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
					<span>{t("copyright", { year: new Date().getFullYear() })}</span>
					<FooterSocials />
				</div>
			</div>
		</footer>
	);
}
