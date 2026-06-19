"use client";

import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { FormEvent, ReactNode, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const inputClassName =
	"w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-[inherit] placeholder:text-[var(--text)]/55 transition-[border-color,box-shadow] focus:border-[var(--dash-brand)] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--dash-brand)]/15";

function FormLabel({
	htmlFor,
	children,
	required,
	optional,
}: {
	htmlFor: string;
	children: ReactNode;
	required?: boolean;
	optional?: string;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold"
		>
			<span>{children}</span>
			{required ? (
				<span className="text-[var(--dash-brand)]" aria-hidden>
					*
				</span>
			) : null}
			{optional ? (
				<span className="font-normal text-[var(--text)]">({optional})</span>
			) : null}
		</label>
	);
}

export default function Contact() {
	const t = useTranslations("home.contact");
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10% 0px" });
	const shouldReduceMotion = useReducedMotion();
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		setSubmitted(true);
	};

	return (
		<section ref={ref} id="contact" className="home-section home-feature-alt">
			<div className="home-wrap grid items-center gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[2fr_3fr]">
				<motion.div
					className="flex flex-col justify-center lg:pr-[clamp(1.25rem,2.5vw,2rem)]"
					initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
					transition={{ type: "spring", duration: 0.45, bounce: 0 }}
				>
					<p className="home-eyebrow">{t("eyebrow")}</p>
					<h2 className="mt-[clamp(1.125rem,2.5vw,1.5rem)] max-w-xl text-balance text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-h)] lg:max-w-none">
						{t("headline")}
					</h2>
					<p className="mt-[clamp(1.25rem,2.5vw,1.5rem)] max-w-[46ch] text-pretty text-[17px] leading-relaxed text-[var(--text)] lg:max-w-none">
						{t("description")}
					</p>

					<div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col gap-10">
						{[
							{
								icon: Mail,
								title: t("email_title"),
								href: "mailto:info@codevider.com",
								value: "info@codevider.com",
							},
							{
								icon: Phone,
								title: t("phone_title"),
								href: "tel:+35569587742",
								value: "+355 69 587 7742",
							},
							{
								icon: MapPin,
								title: t("address_title"),
								value: t("address_value"),
							},
						].map(({ icon: Icon, title, href, value }) => (
							<div key={title} className="flex gap-5">
								<span className="home-ecard-icon size-[3.25rem] rounded-xl">
									<Icon className="size-6" aria-hidden />
								</span>
								<div>
									<h4 className="text-base font-semibold text-[var(--text-h)]">
										{title}
									</h4>
									{href ? (
										<a
											href={href}
											className="mt-1.5 block text-base font-semibold text-[var(--dash-brand)] transition-colors hover:text-[var(--text-h)]"
										>
											{value}
										</a>
									) : (
										<p className="mt-1.5 text-pretty text-base leading-relaxed text-[var(--text)]">
											{value}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					className="flex flex-col justify-center lg:pl-[clamp(1.25rem,2.5vw,2rem)]"
					initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
					transition={{ type: "spring", duration: 0.45, bounce: 0, delay: 0.1 }}
				>
					{submitted ? (
						<div className="surface-card rounded-3xl p-10 text-center">
							<div className="mx-auto mb-[18px] grid size-16 place-items-center rounded-full bg-[var(--dash-brand-bg)] text-[var(--dash-brand)]">
								<Check className="size-8" strokeWidth={2.4} aria-hidden />
							</div>
							<h3 className="text-xl font-semibold text-[var(--text-h)]">
								{t("success_title")}
							</h3>
							<p className="mt-2 text-pretty text-[var(--text)]">
								{t("success_message")}
							</p>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className="surface-card rounded-3xl p-[clamp(28px,3.5vw,44px)] text-[var(--text-h)]"
							noValidate
						>
							<div className=" grid gap-5 sm:grid-cols-2">
								<div>
									<FormLabel htmlFor="contact-name" required>
										{t("form_name")}
									</FormLabel>
									<input
										id="contact-name"
										name="name"
										type="text"
										required
										autoComplete="name"
										placeholder={t("form_name_placeholder")}
										className={inputClassName}
									/>
								</div>
								<div>
									<FormLabel htmlFor="contact-email" required>
										{t("form_email")}
									</FormLabel>
									<input
										id="contact-email"
										name="email"
										type="email"
										required
										autoComplete="email"
										placeholder={t("form_email_placeholder")}
										className={inputClassName}
									/>
								</div>
							</div>

							<div className="mt-5">
								<FormLabel
									htmlFor="contact-company"
									optional={t("form_optional")}
								>
									{t("form_company")}
								</FormLabel>
								<input
									id="contact-company"
									name="company"
									type="text"
									autoComplete="organization"
									placeholder={t("form_company_placeholder")}
									className={inputClassName}
								/>
							</div>

							<div className="mt-5">
								<FormLabel htmlFor="contact-message" required>
									{t("form_message")}
								</FormLabel>
								<textarea
									id="contact-message"
									name="message"
									required
									rows={5}
									placeholder={t("form_message_placeholder")}
									className={`${inputClassName} min-h-[132px] resize-y`}
								/>
							</div>

							<button
								type="submit"
								className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dash-brand)] py-4 pl-7 pr-6 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--dash-brand-end)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-brand)] active:scale-[0.96] motion-reduce:active:scale-100"
							>
								{t("form_submit")}
								<ArrowRight className="size-4" aria-hidden />
							</button>
						</form>
					)}
				</motion.div>
			</div>
		</section>
	);
}
