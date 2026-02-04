// Client-side blog utilities - calls your backend API

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

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

export type BlogPostWithContent = BlogPost & {
	blocks: NotionBlock[];
};

// Helper to extract text from rich_text array
function getPlainText(richText: any[] | undefined): string {
	if (!richText || richText.length === 0) return "";
	return richText.map((item) => item.plain_text).join("");
}

// Helper to get file URL from files array
function getFileUrl(files: any[] | undefined): string | null {
	if (!files || files.length === 0) return null;
	const file = files[0];
	if (file.type === "external") return file.external?.url ?? null;
	return file.file?.url ?? null;
}

// Map backend response to BlogPost
function mapPageToPost(page: any): BlogPost {
	const props = page.properties;
	return {
		id: page.id,
		title: getPlainText(props?.Title?.title),
		slug: getPlainText(props?.Slug?.rich_text),
		description: getPlainText(props?.Description?.rich_text),
		tags: (props?.Tags?.multi_select || []).map((tag: any) => tag.name),
		date: props?.Date?.date?.start ?? null,
		cover: getFileUrl(props?.Cover?.files),
	};
}

// Fetch all published posts
export async function fetchPosts(): Promise<BlogPost[]> {
	const response = await fetch(`${BASE_URL}/landing-page/blogs`);

	if (!response.ok) {
		throw new Error(`Failed to fetch posts: ${response.status}`);
	}

	const data = await response.json();

	// Map the response to BlogPost format
	return data
		.map((page: any) => mapPageToPost(page))
		.filter((post: BlogPost) => post.slug);
}

// Fetch a single post by slug (includes content blocks)
export async function fetchPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
	const response = await fetch(`${BASE_URL}/landing-page/blogs/${slug}`);

	if (!response.ok) {
		if (response.status === 404) return null;
		throw new Error(`Failed to fetch post: ${response.status}`);
	}

	const page = await response.json();
	const post = mapPageToPost(page);

	// Backend returns blocks in "content" field
	const blocks = page.content || [];

	return {
		...post,
		blocks,
	};
}

// Fetch blocks for a post (by page ID) - for lazy loading
export async function fetchPostBlocks(pageId: string): Promise<NotionBlock[]> {
	// For now, we need to fetch the full post to get blocks
	// If you add a separate blocks endpoint, update this
	const posts = await fetchPosts();
	const post = posts.find(p => p.id === pageId);

	if (!post) return [];

	const fullPost = await fetchPostBySlug(post.slug);
	return fullPost?.blocks || [];
}

export function getRichTextText(richText: NotionRichText[] | undefined): string {
	return getPlainText(richText);
}
