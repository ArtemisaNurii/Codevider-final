// Client-side blog utilities - calls your backend API

import { BLOGS_ENDPOINT } from "@/constants/endpoint";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

export type PaginatedBlogResponse = {
	posts: BlogPost[];
	next_cursor: string | null;
	has_more: boolean;
};

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
// Fetch published posts with pagination
export async function fetchPosts(cursor?: string, limit: number = 6): Promise<PaginatedBlogResponse> {
	// Construct URL safely handling both absolute and relative paths
	const endpoint = `${BASE_URL}/${BLOGS_ENDPOINT}`;
	const params = new URLSearchParams();

	if (cursor) {
		params.append("cursor", cursor);
	}
	if (limit) {
		params.append("limit", limit.toString());
	}

	const queryString = params.toString();
	const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

	const response = await fetch(fullUrl);

	if (!response.ok) {
		throw new Error(`Failed to fetch posts: ${response.status}`);
	}

	const data = await response.json();

	// Handle both array (legacy) and object (paginated) responses
	let rawPosts: any[] = [];
	let next_cursor: string | null = null;
	let has_more = false;

	if (Array.isArray(data)) {
		rawPosts = data;
	} else if (data.results) {
		rawPosts = data.results;
		next_cursor = data.next_cursor || null;
		has_more = data.has_more || false;
	}

	// Map the response to BlogPost format
	const posts = rawPosts
		.map((page: any) => mapPageToPost(page))
		.filter((post: BlogPost) => post.slug);

	return { posts, next_cursor, has_more };
}

// Fetch a single post by slug (includes content blocks)
export async function fetchPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
	const response = await fetch(`${BASE_URL}/${BLOGS_ENDPOINT}/${slug}`);

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

// Fetch available filters (tags)
export async function fetchFilters(): Promise<string[]> {
	const response = await fetch(`${BASE_URL}/${BLOGS_ENDPOINT}/filters`);

	if (!response.ok) {
		console.warn(`Failed to fetch filters: ${response.status}`);
		return [];
	}

	const data = await response.json();

	let tags: any[] = [];
	if (Array.isArray(data)) {
		tags = data;
	} else if (data.tags && Array.isArray(data.tags)) {
		tags = data.tags;
	} else if (data.results && Array.isArray(data.results)) {
		tags = data.results;
	}

	// Map to strings if they are objects
	return tags.map((tag: any) => {
		if (typeof tag === 'string') return tag;
		if (tag && typeof tag === 'object' && 'name' in tag) return tag.name;
		return null;
	}).filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
}

// Fetch blocks for a post (by page ID) - for lazy loading
export async function fetchPostBlocks(pageId: string): Promise<NotionBlock[]> {
	// For now, we need to fetch the full post to get blocks
	// If you add a separate blocks endpoint, update this
	// We pass a large limit to hopefully find the post if we are searching via list
	// But really we should use fetchPostBySlug if we have the slug, or this might fail for old posts
	// For now, let's keep it simple and just fetch first page
	const { posts } = await fetchPosts(undefined, 100);
	const post = posts.find(p => p.id === pageId);

	if (!post) return [];

	const fullPost = await fetchPostBySlug(post.slug);
	return fullPost?.blocks || [];
}

export function getRichTextText(richText: NotionRichText[] | undefined): string {
	return getPlainText(richText);
}
