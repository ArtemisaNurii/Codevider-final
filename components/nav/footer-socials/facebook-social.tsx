import { FooterSocialLink } from "./footer-social-link";
import { FacebookIcon } from "./icons/facebook-icon";

export function FacebookSocial() {
	return (
		<FooterSocialLink
			href="https://www.facebook.com/codevider/"
			label="Facebook"
		>
			<FacebookIcon className="size-[18px]" />
		</FooterSocialLink>
	);
}
