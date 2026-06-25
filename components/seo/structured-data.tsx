import { getSiteUrl } from "@/lib/site";

const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Codevider",
	url: getSiteUrl(),
	logo: `${getSiteUrl()}/apple-icon.png`,
	email: "info@codevider.com",
	telephone: "+35569587742",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Barrikada Street",
		addressLocality: "Tirana",
		postalCode: "1001",
		addressCountry: "AL",
	},
	sameAs: [
		"https://www.linkedin.com/company/codevider/",
		"https://www.facebook.com/codevider/",
		"https://www.instagram.com/codevider/",
	],
};

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Codevider",
	url: getSiteUrl(),
};

const professionalServiceSchema = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Codevider",
	description:
		"Nearshore software development agency in Tirana, Albania — custom web, mobile, and cloud engineering for global teams.",
	url: getSiteUrl(),
	image: `${getSiteUrl()}/apple-icon.png`,
	telephone: "+35569587742",
	email: "info@codevider.com",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Barrikada Street",
		addressLocality: "Tirana",
		postalCode: "1001",
		addressCountry: "AL",
	},
	areaServed: ["Albania", "Europe", "Worldwide"],
};

export function StructuredData() {
	const schemas = [
		organizationSchema,
		websiteSchema,
		professionalServiceSchema,
	];

	return (
		<>
			{schemas.map((schema) => (
				<script
					key={schema["@type"]}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			))}
		</>
	);
}
