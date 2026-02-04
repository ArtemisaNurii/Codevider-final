import type { Metadata } from "next";
import { fetchPosts, fetchPostBlocks } from "@/lib/notionBlog";
import BlogsListClient from "./BlogsListClient";
import type { PostWithBlocks } from "./types";

export const metadata: Metadata = {
	title: "Blogs",
	description: "Codevider insights and engineering notes",
};

// Fetch all posts and their blocks at build time
export default async function BlogsPage() {
	const posts = await fetchPosts();

	// Pre-fetch blocks for all posts so they're available client-side
	const postsWithBlocks: PostWithBlocks[] = await Promise.all(
		posts.map(async (post) => {
			const blocks = await fetchPostBlocks(post.id);
			return { ...post, blocks };
		})
	);

	return <BlogsListClient posts={postsWithBlocks} />;
}
