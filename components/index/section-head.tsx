type SectionHeadProps = {
  eyebrow: string
  headline: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHead({
  eyebrow,
  headline,
  description,
  centered = false,
  className = '',
}: SectionHeadProps) {
  return (
    <div
      className={`max-w-[680px] ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      <p className={`home-eyebrow ${centered ? 'home-eyebrow--center' : ''}`}>
        {eyebrow}
      </p>
      <h2 className="mt-[clamp(1.125rem,2.5vw,1.5rem)] text-balance text-[clamp(1.75rem,4.6vw,3.125rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-h)]">
        {headline}
      </h2>
      {description ? (
        <p className="mt-[clamp(1rem,2vw,1.375rem)] text-pretty text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed text-[var(--text)]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
