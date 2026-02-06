import React from "react";

// --- Types ---
// These are simplified versions of Notion's API response types
export interface NotionRichText {
	plain_text: string;
	href?: string;
	annotations: {
		bold: boolean;
		italic: boolean;
		strikethrough: boolean;
		underline: boolean;
		code: boolean;
		color: string;
	};
}

export interface NotionBlock {
	id: string;
	type: string;
	has_children: boolean;
	children?: NotionBlock[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any; // To access dynamic keys like block.paragraph or block.heading_1
}

// --- Style Mappings ---
const colorMap: Record<string, string> = {
	gray: "text-gray-500",
	brown: "text-amber-700",
	orange: "text-orange-500",
	yellow: "text-yellow-600",
	green: "text-emerald-600",
	blue: "text-blue-500",
	purple: "text-purple-500",
	pink: "text-pink-500",
	red: "text-red-500",
	gray_background: "bg-gray-100 px-1 rounded",
	brown_background: "bg-amber-100 px-1 rounded",
	orange_background: "bg-orange-100 px-1 rounded",
	yellow_background: "bg-yellow-100 px-1 rounded",
	green_background: "bg-emerald-100 px-1 rounded",
	blue_background: "bg-blue-100 px-1 rounded",
	purple_background: "bg-purple-100 px-1 rounded",
	pink_background: "bg-pink-100 px-1 rounded",
	red_background: "bg-red-100 px-1 rounded",
};

// --- Helper Components ---

const RenderRichText = ({ richText }: { richText: NotionRichText[] }) => {
	if (!richText) return null;
	return (
		<>
			{richText.map((text, i) => {
				const { annotations, href, plain_text } = text;
				let element: React.ReactNode = plain_text;

				if (annotations.bold) element = <strong key={i}>{element}</strong>;
				if (annotations.italic) element = <em key={i}>{element}</em>;
				if (annotations.strikethrough)
					element = <span className="line-through">{element}</span>;
				if (annotations.underline)
					element = <span className="underline">{element}</span>;
				if (annotations.code) {
					element = (
						<code className="bg-slate-100 text-pink-500 px-1.5 py-0.5 rounded text-sm font-mono">
							{element}
						</code>
					);
				}
				if (annotations.color && annotations.color !== "default") {
					element = (
						<span className={colorMap[annotations.color]}>{element}</span>
					);
				}
				if (href) {
					element = (
						<a
							href={href}
							className="text-sky-600 underline hover:text-sky-500 transition-colors"
							target="_blank"
							rel="noreferrer"
						>
							{element}
						</a>
					);
				}

				return <span key={i}>{element}</span>;
			})}
		</>
	);
};

// --- Main Block Renderer ---

export function RenderBlock({
	block,
	depth = 0,
}: {
	block: NotionBlock;
	depth?: number;
}) {
	const { type } = block;
	const content = block[type];

	// Logic for recursive children
	const renderChildren = () => {
		return block.children?.map((child) => (
			<RenderBlock key={child.id} block={child} depth={depth + 1} />
		));
	};

	switch (type) {
		case "paragraph":
			return (
				<p
					className={`mb-4 leading-relaxed ${content.color ? colorMap[content.color] : "text-slate-600"}`}
				>
					<RenderRichText richText={content.rich_text} />
				</p>
			);

		case "heading_1":
		case "heading_2":
		case "heading_3": {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const levels: Record<string, { tag: any; size: string }> = {
				heading_1: { tag: "h1", size: "text-3xl" },
				heading_2: { tag: "h2", size: "text-2xl" },
				heading_3: { tag: "h3", size: "text-xl" },
			};
			const { tag: Tag, size } = levels[type];
			return (
				<Tag
					className={`${size} font-bold text-slate-900 mt-10 mb-4 first:mt-0`}
				>
					<RenderRichText richText={content.rich_text} />
				</Tag>
			);
		}

		case "bulleted_list_item":
		case "numbered_list_item":
			return (
				<li className="text-slate-600 mb-1.5 ml-1">
					<RenderRichText richText={content.rich_text} />
					{block.has_children && (
						<div className="ml-5 mt-2">{renderChildren()}</div>
					)}
				</li>
			);

		case "to_do":
			return (
				<div className="flex items-start gap-3 mb-2 text-slate-600">
					<input
						type="checkbox"
						checked={content.checked}
						readOnly
						className="mt-1.5 h-4 w-4 accent-sky-500"
					/>
					<span className={content.checked ? "line-through opacity-50" : ""}>
						<RenderRichText richText={content.rich_text} />
					</span>
				</div>
			);

		case "toggle":
			return (
				<details className="mb-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
					<summary className="cursor-pointer text-slate-900 font-medium hover:text-sky-600 transition-colors">
						<RenderRichText richText={content.rich_text} />
					</summary>
					<div className="mt-4 pl-4 border-l-2 border-slate-200">
						{renderChildren()}
					</div>
				</details>
			);

		case "code":
			return (
				<div className="group relative my-6">
					<pre className="bg-slate-900 rounded-xl p-5 overflow-x-auto border border-slate-800 shadow-lg">
						<code className="text-sm font-mono text-sky-300 leading-6">
							{content.rich_text[0]?.plain_text}
						</code>
					</pre>
					<span className="absolute top-3 right-3 text-[10px] uppercase text-slate-500 font-bold bg-slate-800 px-2 py-1 rounded">
						{content.language}
					</span>
				</div>
			);

		case "quote":
			return (
				<blockquote className="border-l-4 border-sky-400 pl-5 py-2 my-8 text-slate-700 italic text-lg bg-sky-50/50 rounded-r-lg">
					<RenderRichText richText={content.rich_text} />
				</blockquote>
			);

		case "callout":
			return (
				<div className="flex gap-4 p-5 mb-6 bg-white border border-slate-200 rounded-2xl shadow-sm items-center">
					{content.icon?.emoji && (
						<span className="text-2xl">{content.icon.emoji}</span>
					)}
					<div className="text-slate-600 leading-relaxed">
						<RenderRichText richText={content.rich_text} />
					</div>
				</div>
			);

		case "image": {
			const src =
				content.type === "external" ? content.external.url : content.file.url;
			return (
				<figure className="my-10">
					<img
						src={src}
						alt="Notion visual"
						className="rounded-2xl w-full object-cover border border-slate-200 shadow-md"
					/>
					{content.caption?.length > 0 && (
						<figcaption className="text-center text-sm text-slate-400 mt-4 italic">
							<RenderRichText richText={content.caption} />
						</figcaption>
					)}
				</figure>
			);
		}

		case "column_list":
			return (
				<div className="flex flex-col md:flex-row gap-6 my-8">
					{renderChildren()}
				</div>
			);

		case "column":
			return <div className="flex-1 min-w-0">{renderChildren()}</div>;

		case "divider":
			return <hr className="my-10 border-slate-100" />;

		case "bookmark":
		case "embed":
			return (
				<a
					href={content.url}
					target="_blank"
					rel="noopener noreferrer"
					className="block my-6 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-all shadow-xs"
				>
					<div className="flex items-center gap-3">
						<span className="text-slate-400">🔗</span>
						<span className="text-sky-600 text-sm truncate">{content.url}</span>
					</div>
				</a>
			);

		default:
			return null;
	}
}

// --- List Grouping Utility ---
// Notion sends lists as separate blocks. This function wraps consecutive
// list items into a single <ul> or <ol> tag for proper HTML structure.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupBlocks(blocks: NotionBlock[]): any[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result: any[] = [];
	let currentList: { type: string; items: NotionBlock[] } | null = null;

	blocks.forEach((block) => {
		if (
			block.type === "bulleted_list_item" ||
			block.type === "numbered_list_item"
		) {
			if (currentList && currentList.type === block.type) {
				currentList.items.push(block);
			} else {
				if (currentList) result.push(currentList);
				currentList = { type: block.type, items: [block] };
			}
		} else {
			if (currentList) {
				result.push(currentList);
				currentList = null;
			}
			result.push(block);
		}
	});

	if (currentList) result.push(currentList);
	return result;
}

// --- Main Entry Component ---

export default function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
	if (!blocks) return null;

	const groupedBlocks = groupBlocks(blocks);

	return (
		<div className="notion-content w-full max-w-4xl mx-auto">
			{groupedBlocks.map((group, index) => {
				// Handle Bulleted Group
				if (group.type === "bulleted_list_item") {
					return (
						<ul
							key={`bullet-${index}`}
							className="list-disc mb-6 space-y-2 pl-5"
						>
							{group.items.map((block: NotionBlock) => (
								<RenderBlock key={block.id} block={block} />
							))}
						</ul>
					);
				}
				// Handle Numbered Group
				if (group.type === "numbered_list_item") {
					return (
						<ol
							key={`numbered-${index}`}
							className="list-decimal mb-6 space-y-2 pl-5"
						>
							{group.items.map((block: NotionBlock) => (
								<RenderBlock key={block.id} block={block} />
							))}
						</ol>
					);
				}
				// Handle Standard Block
				return <RenderBlock key={group.id || index} block={group} />;
			})}
		</div>
	);
}
