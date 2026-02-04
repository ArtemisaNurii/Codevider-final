// Server-side Notion blog utilities - runs at build time only
import { Client } from "@notionhq/client";

export type NotionRichText = {
	plain_text: string;
	href: string | null;
	annotations?: {
		bold?: boolean;
		italic?: boolean;
		underline?: boolean;
		strikethrough?: boolean;
		code?: boolean;
		color?: string;
	};
};

export type NotionBlock = {
	id: string;
	type: string;
	has_children: boolean;
	children?: NotionBlock[];
	[key: string]: any;
};

export type BlogPost = {
	id: string;
	title: string;
	slug: string;
	description: string;
	tags: string[];
	date: string | null;
	cover: string | null;
};

const notionSecret = process.env.NEXT_PUBLIC_BLOG_NOTION_SECRET;
const notionDatabaseId = process.env.NEXT_PUBLIC_BLOG_NOTION_DB_ID;

console.log(notionSecret, notionDatabaseId)

function assertEnv() {
	if (!notionSecret || !notionDatabaseId) {
		throw new Error(
			"Missing Notion credentials. Set NEXT_PUBLIC_BLOG_NOTION_SECRET and NEXT_PUBLIC_BLOG_NOTION_DB_ID in .env."
		);
	}
}

// Initialize Notion client
function getNotionClient(): Client {
	assertEnv();
	return new Client({ auth: notionSecret });
}

function getPlainText(richText: NotionRichText[] | undefined) {
	if (!richText || richText.length === 0) return "";
	return richText.map((item) => item.plain_text).join("");
}

function getFileUrl(files: any[] | undefined) {
	if (!files || files.length === 0) return null;
	const file = files[0];
	if (file.type === "external") return file.external?.url ?? null;
	return file.file?.url ?? null;
}

function mapPageToPost(page: any): BlogPost {
	return {
		id: page.id,
		title: getPlainText(page.properties?.Title?.title),
		slug: getPlainText(page.properties?.Slug?.rich_text),
		description: getPlainText(page.properties?.Description?.rich_text),
		tags: (page.properties?.Tags?.multi_select || []).map(
			(tag: any) => tag.name
		),
		date: page.properties?.Date?.date?.start ?? null,
		cover: getFileUrl(page.properties?.Cover?.files),
	};
}

// Query the Notion database using direct fetch (SDK v5 request method has issues)
async function queryDatabase(filter?: any, sorts?: any): Promise<any> {
	assertEnv();

	const response = await fetch(
		`https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${notionSecret}`,
				"Content-Type": "application/json",
				"Notion-Version": "2022-06-28",
			},
			body: JSON.stringify({
				...(filter && { filter }),
				...(sorts && { sorts }),
			}),
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Notion API error: ${response.status} - ${errorText}`);
	}

	return response.json();
}

export async function fetchPosts(): Promise<BlogPost[]> {
	const response = await queryDatabase(
		{
			property: "Published",
			checkbox: { equals: true },
		},
		[
			{
				property: "Date",
				direction: "descending",
			},
		]
	);

	return response.results
		.map((page: any) => mapPageToPost(page))
		.filter((post: BlogPost) => post.slug);
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
	const response = await queryDatabase({
		and: [
			{
				property: "Published",
				checkbox: { equals: true },
			},
			{
				property: "Slug",
				rich_text: { equals: slug },
			},
		],
	});

	const page = response.results[0];
	if (!page) return null;
	return mapPageToPost(page);
}

async function fetchBlockChildren(blockId: string): Promise<NotionBlock[]> {
	const notion = getNotionClient();
	let cursor: string | undefined;
	const blocks: NotionBlock[] = [];

	do {
		const response = await notion.blocks.children.list({
			block_id: blockId,
			page_size: 100,
			start_cursor: cursor,
		});

		for (const block of response.results) {
			if ("type" in block) {
				blocks.push({
					id: block.id,
					type: block.type,
					has_children: block.has_children,
					// Spread the rest of the block properties
					...Object.fromEntries(
						Object.entries(block).filter(
							([key]) => !["id", "type", "has_children"].includes(key)
						)
					),
				});
			}
		}
		cursor = response.next_cursor ?? undefined;
	} while (cursor);

	const enriched: NotionBlock[] = [];
	for (const block of blocks) {
		if (block.has_children) {
			const children = await fetchBlockChildren(block.id);
			enriched.push({ ...block, children });
		} else {
			enriched.push(block);
		}
	}

	return enriched;
}

export async function fetchPostBlocks(pageId: string): Promise<NotionBlock[]> {
	return fetchBlockChildren(pageId);
}

export function getRichTextText(richText: NotionRichText[] | undefined) {
	return getPlainText(richText);
}
