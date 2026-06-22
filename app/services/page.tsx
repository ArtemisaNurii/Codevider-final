import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";
import { createRedirectPageMetadata } from "@/lib/site";

export const metadata: Metadata = createRedirectPageMetadata("services");

export default function ServicesRedirectPage() {
	return <LocaleRedirect path="services" />;
}
