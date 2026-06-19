import { FooterSocialLink } from "./footer-social-link";
import { LinkedInIcon } from "./icons/linkedin-icon";

export function LinkedInSocial() {
	return (
		<FooterSocialLink
			href="https://al.linkedin.com/company/codevider"
			label="LinkedIn"
		>
			<LinkedInIcon className="size-[18px]" />
		</FooterSocialLink>
	);
}
