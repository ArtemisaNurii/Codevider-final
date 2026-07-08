type StructuredDataProps = {
	title: string;
	description: string;
	image: string;
	url: string;
};

export function StructuredData({
	title,
	description,
	image,
	url,
}: StructuredDataProps) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: title,
		description,
		url,
		image,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
