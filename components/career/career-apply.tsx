"use client";

import { ArrowLeft, ChevronUp, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import CareerApplyForm from "@/components/career/career-apply-form";
import { Link } from "@/i18n/navigation";
import { fetchJobById } from "@/lib/api/recruit-jobs";
import type { JobDetail } from "@/lib/types/recruit";

const revealEase = [0.22, 1, 0.36, 1] as const;
const morphExitEase = [0.4, 0, 1, 1] as const;

type LoadState =
	| { status: "loading" }
	| { status: "error" }
	| { status: "ready"; job: JobDetail };

type DetailRow = {
	key: string;
	label: string;
	value: string;
};

function formatPayPeriod(
	t: ReturnType<typeof useTranslations<"career.apply">>,
	period: string,
) {
	const key = `pay_period_${period}` as const;
	return t.has(key) ? t(key) : period;
}

function formatPayType(
	t: ReturnType<typeof useTranslations<"career.apply">>,
	payType: string,
) {
	const key = `pay_type_${payType}` as const;
	return t.has(key) ? t(key) : payType;
}

export default function CareerApply() {
	const t = useTranslations("career.apply");
	const metadataT = useTranslations("metadata.career_apply");
	const format = useFormatter();
	const searchParams = useSearchParams();
	const rawId = searchParams.get("id");
	const jobId = rawId && /^\d+$/.test(rawId) ? Number(rawId) : null;
	const shouldReduceMotion = useReducedMotion();
	const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
	const [formOpen, setFormOpen] = useState(false);

	const loadJob = useCallback(async (id: number) => {
		setLoadState({ status: "loading" });

		try {
			const job = await fetchJobById(id);
			setLoadState({ status: "ready", job });
		} catch {
			setLoadState({ status: "error" });
		}
	}, []);

	useEffect(() => {
		if (!jobId) {
			setLoadState({ status: "error" });
			return;
		}

		void loadJob(jobId);
	}, [jobId, loadJob]);

	useEffect(() => {
		if (loadState.status !== "ready") return;

		const nextTitle = metadataT("title_with_role", {
			title: loadState.job.title,
		});
		const previousTitle = document.title;
		document.title = nextTitle;

		return () => {
			document.title = previousTitle;
		};
	}, [loadState, metadataT]);

	const reveal = (delay: number) => ({
		initial: shouldReduceMotion ? false : { opacity: 0, y: 14 },
		animate: { opacity: 1, y: 0 },
		transition: shouldReduceMotion
			? { duration: 0 }
			: { duration: 0.45, ease: revealEase, delay },
	});

	const morphLayoutTransition = shouldReduceMotion
		? { duration: 0 }
		: { type: "spring" as const, duration: 0.609, bounce: 0 };

	const morphContentEnter = shouldReduceMotion
		? { duration: 0 }
		: { type: "spring" as const, duration: 0.38, bounce: 0, delay: 0.06 };

	const morphContentExit = shouldReduceMotion
		? { duration: 0 }
		: { duration: 0.231, ease: morphExitEase };

	const job = loadState.status === "ready" ? loadState.job : null;

	const formatDate = useCallback(
		(value: string) =>
			format.dateTime(new Date(value), {
				day: "numeric",
				month: "long",
				year: "numeric",
			}),
		[format],
	);

	const detailRows = useMemo<DetailRow[]>(() => {
		if (!job) return [];

		const rows: DetailRow[] = [];

		if (job.job_type?.job_type) {
			rows.push({
				key: "job_type",
				label: t("job_type"),
				value: job.job_type.job_type,
			});
		}

		if (job.department?.name) {
			rows.push({
				key: "department",
				label: t("department"),
				value: job.department.name,
			});
		}

		rows.push({
			key: "total_positions",
			label: t("total_positions"),
			value: String(job.total_positions),
		});

		rows.push({
			key: "openings",
			label: t("openings"),
			value: t("openings_count", { count: job.remaining_openings }),
		});

		rows.push({
			key: "pay_type",
			label: t("pay_type"),
			value: formatPayType(t, job.pay_type),
		});

		if (job.start_amount !== null) {
			const period = formatPayPeriod(t, job.pay_according_to);
			rows.push({
				key: "compensation",
				label: t("compensation"),
				value:
					job.end_amount !== null
						? t("compensation_range", {
								start: job.start_amount,
								end: job.end_amount,
								period,
							})
						: t("compensation_single", {
								amount: job.start_amount,
								period,
							}),
			});
		}

		if (job.start_date && job.end_date) {
			rows.push({
				key: "application_period",
				label: t("application_period"),
				value: t("application_period_range", {
					start: formatDate(job.start_date),
					end: formatDate(job.end_date),
				}),
			});
		}

		return rows;
	}, [formatDate, job, t]);

	const requirements = useMemo(() => {
		if (!job) return [];

		return [
			job.is_photo_required
				? { key: "photo", label: t("requirement_photo") }
				: null,
			job.is_resume_required
				? { key: "resume", label: t("requirement_resume") }
				: null,
			job.is_dob_required ? { key: "dob", label: t("requirement_dob") } : null,
			job.is_gender_required
				? { key: "gender", label: t("requirement_gender") }
				: null,
		].filter((item): item is { key: string; label: string } => item !== null);
	}, [job, t]);

	return (
		<section className="career-apply-page">
			<div className="home-wrap career-apply-page__inner">
				<motion.div {...reveal(0)}>
					<Link href="/career#openings" className="career-apply-page__back">
						<ArrowLeft className="size-4" aria-hidden />
						{t("back")}
					</Link>
				</motion.div>

				<motion.header className="career-apply-page__header" {...reveal(0.06)}>
					<p className="home-eyebrow">{t("eyebrow")}</p>
					<h1 className="career-apply-page__title">
						{job ? job.title : t("loading_title")}
					</h1>
					{job && !job.job_description ? (
						<p className="career-apply-page__subtitle career-apply-page__subtitle--empty">
							{t("no_description")}
						</p>
					) : null}
				</motion.header>

				<div className="career-apply-page__body">
					{loadState.status === "loading" ? (
						<div className="career-apply-page__loading" aria-live="polite">
							<Loader2 className="size-5 animate-spin" aria-hidden />
							<span>{t("loading")}</span>
						</div>
					) : null}

					{loadState.status === "error" ? (
						<div className="career-apply-page__error" role="alert">
							<p>{t("error")}</p>
							<button
								type="button"
								className="svc-cta__btn"
								onClick={() => {
									if (jobId) void loadJob(jobId);
								}}
							>
								{t("retry")}
							</button>
						</div>
					) : null}

					{job ? (
						<motion.div
							className="career-apply-page__content"
							{...reveal(0.12)}
						>
							{job.job_description ? (
								<p className="career-apply-page__description whitespace-pre-wrap">
									{job.job_description}
								</p>
							) : null}

							<section
								className="career-apply-page__section"
								aria-labelledby="career-apply-details"
							>
								<h2
									id="career-apply-details"
									className="career-apply-page__section-title"
								>
									{t("details_heading")}
								</h2>
								<dl className="career-apply-page__meta">
									{detailRows.map((row) => (
										<div key={row.key}>
											<dt>{row.label}</dt>
											<dd>{row.value}</dd>
										</div>
									))}
								</dl>
							</section>

							{requirements.length > 0 ? (
								<section
									className="career-apply-page__section"
									aria-labelledby="career-apply-requirements"
								>
									<h2
										id="career-apply-requirements"
										className="career-apply-page__section-title"
									>
										{t("requirements_heading")}
									</h2>
									<ul className="career-apply-page__requirements">
										{requirements.map((item) => (
											<li key={item.key}>{item.label}</li>
										))}
									</ul>
								</section>
							) : null}
						</motion.div>
					) : null}
				</div>

				{job ? (
					<motion.div
						className="career-apply-page__morph-wrap"
						{...reveal(0.18)}
					>
						<motion.div
							layout
							className="career-apply-page__morph"
							data-open={formOpen}
							transition={{ layout: morphLayoutTransition }}
						>
							<AnimatePresence mode="popLayout" initial={false}>
								{formOpen ? (
									<motion.div
										key="form"
										layout="position"
										className="career-apply-page__morph-card"
										initial={
											shouldReduceMotion
												? false
												: { opacity: 0, y: 10, filter: "blur(4px)" }
										}
										animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
										exit={
											shouldReduceMotion
												? undefined
												: {
														opacity: 0,
														y: -8,
														filter: "blur(4px)",
														transition: morphContentExit,
													}
										}
										transition={morphContentEnter}
									>
										<div className="career-apply-page__morph-header">
											<h2 className="career-apply-page__morph-title">
												{t("apply_button")}
											</h2>
											<button
												type="button"
												className="career-apply-page__morph-close"
												onClick={() => setFormOpen(false)}
												aria-label={t("collapse_form")}
											>
												<ChevronUp className="size-4" aria-hidden />
											</button>
										</div>
										<CareerApplyForm job={job} />
									</motion.div>
								) : (
									<motion.button
										key="trigger"
										type="button"
										layout="position"
										className="career-apply-page__morph-trigger"
										onClick={() => setFormOpen(true)}
										initial={
											shouldReduceMotion
												? false
												: { opacity: 0, scale: 0.96, filter: "blur(4px)" }
										}
										animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
										exit={
											shouldReduceMotion
												? undefined
												: {
														opacity: 0,
														scale: 0.96,
														filter: "blur(4px)",
														transition: morphContentExit,
													}
										}
										transition={morphContentEnter}
										whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
									>
										{t("apply_button")}
									</motion.button>
								)}
							</AnimatePresence>
						</motion.div>
					</motion.div>
				) : null}
			</div>
		</section>
	);
}
