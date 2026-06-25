import type { LegalBlock } from "@/lib/legal-content";

const EMAIL = "info@codevider.com";

function linkifyText(text: string) {
	const parts = text.split(new RegExp(`(${EMAIL})`, "g"));

	return parts.map((part, index) =>
		part === EMAIL ? (
			<a key={index} href={`mailto:${EMAIL}`} className="legal-doc__link">
				{part}
			</a>
		) : (
			part
		),
	);
}

function renderLabeledText(text: string) {
	const colonIndex = text.indexOf(": ");

	if (colonIndex === -1) {
		return linkifyText(text);
	}

	const label = text.slice(0, colonIndex);
	const rest = text.slice(colonIndex + 2);

	return (
		<>
			<strong>{label}</strong>: {linkifyText(rest)}
		</>
	);
}

type LegalContentBlocksProps = {
	blocks: LegalBlock[];
};

export default function LegalContentBlocks({
	blocks,
}: LegalContentBlocksProps) {
	return (
		<div className="legal-doc__blocks">
			{blocks.map((block, index) => {
				switch (block.type) {
					case "p":
						return (
							<p
								key={index}
								className={
									block.variant === "disclaimer"
										? "legal-doc__body legal-doc__body--disclaimer"
										: "legal-doc__body"
								}
							>
								{linkifyText(block.text)}
							</p>
						);
					case "h3":
						return (
							<h3 key={index} className="legal-doc__h3">
								{block.text}
							</h3>
						);
					case "ul":
						return (
							<ul key={index} className="legal-doc__list">
								{block.items.map((item, itemIndex) => (
									<li key={itemIndex} className="legal-doc__list-item">
										{renderLabeledText(item)}
									</li>
								))}
							</ul>
						);
					case "ol":
						return (
							<ol
								key={index}
								className="legal-doc__list legal-doc__list--ordered"
							>
								{block.items.map((item, itemIndex) => (
									<li key={itemIndex} className="legal-doc__list-item">
										{renderLabeledText(item)}
									</li>
								))}
							</ol>
						);
					case "contact":
						return (
							<address key={index} className="legal-doc__contact not-italic">
								<strong className="legal-doc__contact-name">
									{block.name}
								</strong>
								<span>{block.address}</span>
								<a href={`mailto:${block.email}`} className="legal-doc__link">
									{block.email}
								</a>
								{block.phone ? (
									<a
										href={`tel:${block.phone.replace(/\s/g, "")}`}
										className="legal-doc__link"
									>
										{block.phone}
									</a>
								) : null}
							</address>
						);
					default:
						return null;
				}
			})}
		</div>
	);
}
