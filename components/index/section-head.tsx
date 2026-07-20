type SectionHeadProps = {
	eyebrow: string;
	headline: string;
	description?: string;
	centered?: boolean;
	className?: string;
	descriptionClassName?: string;
};

export default function SectionHead({
	eyebrow,
	headline,
	description,
	centered = false,
	className = "",
	descriptionClassName = "",
}: SectionHeadProps) {
	return (
		<div
			className={`max-w-[36rem] ${centered ? "mx-auto text-center" : ""} ${className}`}
		>
			<p className={`home-eyebrow ${centered ? "home-eyebrow--center" : ""}`}>
				{eyebrow}
			</p>
			<h2 className="mt-3.5 text-balance text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.12] tracking-tight text-(--text-h)">
				{headline}
			</h2>
			{description ? (
				<p
					className={`max-w-[70ch] text-pretty leading-relaxed text-(--text) ${centered ? "mx-auto" : ""} ${descriptionClassName || "mt-5 text-base"}`}
				>
					{description}
				</p>
			) : null}
		</div>
	);
}
