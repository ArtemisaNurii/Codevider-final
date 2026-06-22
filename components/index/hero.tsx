"use client";

import Link from "next/link";
import HeroDashboard from "./hero-dashboard";
import RotatingWord from "./rotating-word";
import { useTranslations } from "next-intl";

export default function Hero() {
	const t = useTranslations("home");
	const yearsDelivering = new Date().getFullYear() - 2019;
	return (
		<section className="relative isolate min-h-svh overflow-hidden">
			<div className="home-hero__blobs" aria-hidden>
				<div className="home-hero__blob home-hero__blob--primary" />
				<div className="home-hero__blob home-hero__blob--secondary" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--teal" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--violet" />
			</div>

			<div className="home-hero__veil" aria-hidden />

			<div className="home-wrap relative z-10 flex min-h-svh flex-col justify-center pb-[clamp(5rem,10vw,8rem)] pt-[clamp(6rem,12vw,9rem)]">
				<div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-16">
					<div>
						<h1 className="mb-8 max-w-2xl text-left text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-(--text-h)">
							<span className="block">{t("your_strategic_partner_in")}</span>
							<RotatingWord />
						</h1>

						<p className="max-w-xl text-pretty font-sans text-left text-lg leading-relaxed text-(--text) sm:text-xl sm:leading-8">
							{t(
								"we_design_build_and_scale_reliable_web_mobile_and_cloud_software_embedded_with_your_team_and_delivered_without_the_overhead",
							)}
						</p>

						<div className="mb-10 mt-14 flex flex-wrap items-center justify-start gap-4 sm:mb-14 sm:mt-16 sm:gap-5">
							<Link
								href="#contact"
								className="inline-flex items-center justify-center rounded-full bg-[#3a53c9] px-7 py-3.5 text-sm font-medium text-white transition-[background-color,transform] hover:bg-[#2f46a8] active:scale-[0.96] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#3a53c9]"
							>
								{t("start_your_project")}
							</Link>
							<Link
								href="#services"
								className="inline-flex items-center justify-center rounded-full border border-(--border) bg-(--bg)/80 px-7 py-3.5 text-sm font-medium text-(--text-h) backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-[#3a53c9]/40 hover:bg-(--accent-bg) active:scale-[0.96] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#3a53c9]"
							>
								{t("explore_services")}
							</Link>
						</div>

						<div className="grid grid-cols-3 gap-5 border-t border-(--border) pt-10 sm:gap-10 sm:pt-12">
							{[
								{
									value: `${yearsDelivering}+`,
									label: t("years_delivering"),
								},
								{ value: "45+", label: t("global_projects") },
								{ value: "25+", label: t("engineers") },
							].map(({ value, label }) => (
								<div key={label} className="text-left">
									<p className="font-(family-name:--mono) text-2xl font-medium tabular-nums tracking-tight text-(--text-h) sm:text-3xl">
										{value}
									</p>
									<p className="mt-1 text-xs text-(--text) sm:text-sm">
										{label}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="relative w-full min-w-0 lg:min-w-[28rem] xl:min-w-[32rem]">
						<HeroDashboard />
					</div>
				</div>
			</div>
		</section>
	);
}
