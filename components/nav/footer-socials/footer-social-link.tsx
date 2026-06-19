import type { ReactNode } from "react";

type FooterSocialLinkProps = {
	href: string;
	label: string;
	children: ReactNode;
};

export function FooterSocialLink({
	href,
	label,
	children,
}: FooterSocialLinkProps) {
	const isExternal = href.startsWith("http");

	return (
		<a
			href={href}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			aria-label={label}
			className="footer-social-link grid size-[38px] place-items-center rounded-[10px] hover:-translate-y-0.5"
		>
			{children}
		</a>
	);
}
