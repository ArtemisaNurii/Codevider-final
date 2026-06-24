import { FooterSocialLink } from "./footer-social-link";
import { InstagramIcon } from "./icons/instagram-icon";

export function InstagramSocial() {
	return (
		<FooterSocialLink
			href="https://www.instagram.com/codevider/"
			label="Instagram"
		>
			<InstagramIcon className="size-[18px]" />
		</FooterSocialLink>
	);
}
