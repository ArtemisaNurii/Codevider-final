import { FacebookSocial } from "./facebook-social";
import { InstagramSocial } from "./instagram-social";
import { LinkedInSocial } from "./linkedin-social";

export function FooterSocials() {
	return (
		<div className="flex gap-2.5">
			<InstagramSocial />
			<LinkedInSocial />
			<FacebookSocial />
		</div>
	);
}
