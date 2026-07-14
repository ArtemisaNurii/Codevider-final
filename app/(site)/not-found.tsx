import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
	const t = await getTranslations("not_found");

	return (
		<div className="relative isolate flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
			<div className="home-hero__blobs" aria-hidden>
				<div className="home-hero__blob home-hero__blob--primary" />
				<div className="home-hero__blob home-hero__blob--secondary" />
				<div className="home-hero__blob home-hero__blob--accent home-hero__blob--violet" />
			</div>

			<div className="home-hero__veil" aria-hidden />

			<div className="relative z-10 flex max-w-lg flex-col items-center gap-4">
				<h1 className="text-4xl font-bold text-(--text-h)">{t("title")}</h1>
				<p className="text-lg text-(--text)">{t("description")}</p>
				<Link
					href="/"
					className="text-[#3a53c9] transition-colors hover:text-[#2f46a8]"
				>
					{t("home_link")}
				</Link>
			</div>
		</div>
	);
}
