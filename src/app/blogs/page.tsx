"use client";

import { useState, useEffect } from "react";
import { fetchPosts, fetchPostBySlug } from "@/lib/notionBlog";
import BlogsListClient from "./BlogsListClient";
import type { PostWithBlocks } from "./types";

export default function BlogsPage() {
	const [posts, setPosts] = useState<PostWithBlocks[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadPosts() {
			try {
				setLoading(true);
				const fetchedPosts = await fetchPosts();

				// Fetch content for all posts
				const postsWithBlocks: PostWithBlocks[] = await Promise.all(
					fetchedPosts.map(async (post) => {
						const fullPost = await fetchPostBySlug(post.slug);
						return {
							...post,
							blocks: fullPost?.blocks || [],
						};
					})
				);

				setPosts(postsWithBlocks);
			} catch (err) {
				console.error("Error loading posts:", err);
				setError(err instanceof Error ? err.message : "Failed to load posts");
			} finally {
				setLoading(false);
			}
		}

		loadPosts();
	}, []);

	return <BlogsListClient posts={posts} loading={loading} error={error} />;
}
