"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPosts, fetchFilters } from "@/lib/notionBlog";
import BlogsListClient from "./BlogsListClient";
import type { PostWithBlocks } from "./types";

const POSTS_PER_PAGE = 6;

function BlogsPage() {
	const searchParams = useSearchParams();
	const slugParam = searchParams.get("slug");

	const [posts, setPosts] = useState<PostWithBlocks[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [availableTags, setAvailableTags] = useState<string[]>([]);

	useEffect(() => {
		// Only fetch posts and filters if we're NOT viewing a detail view (no slug param)
		if (slugParam) {
			setLoading(false);
			return;
		}

		async function loadInitialPosts() {
			try {
				setLoading(true);
				setError(null);

				// Parallel fetch: posts (without blocks) and filters - only on main blog list page
				const [postsData, tags] = await Promise.all([
					fetchPosts(undefined, POSTS_PER_PAGE),
					fetchFilters(),
				]);

				// Add empty blocks to satisfy type (blocks will be loaded on demand)
				const postsWithPlaceholders = postsData.posts.map((post) => ({
					...post,
					blocks: [],
				}));

				setPosts(postsWithPlaceholders);
				setNextCursor(postsData.next_cursor);
				setHasMore(postsData.has_more);
				setAvailableTags(tags);
			} catch (err) {
				console.error("Error loading posts:", err);
				setError(err instanceof Error ? err.message : "Failed to load posts");
			} finally {
				setLoading(false);
			}
		}

		loadInitialPosts();
	}, [slugParam]);

	// Use useCallback to memoize the loadMore function
	const loadMore = useCallback(async () => {
		// Guard checks
		if (loadingMore || !hasMore || !nextCursor) {
			return;
		}

		try {
			setLoadingMore(true);
			const {
				posts: newPosts,
				next_cursor: newCursor,
				has_more: newHasMore,
			} = await fetchPosts(nextCursor, POSTS_PER_PAGE);

			if (newPosts.length === 0) {
				// No new posts received, mark as no more
				setHasMore(false);
				setLoadingMore(false);
				return;
			}

			const newPostsWithPlaceholders = newPosts.map((post) => ({
				...post,
				blocks: [],
			}));

			setPosts((prev) => [...prev, ...newPostsWithPlaceholders]);
			setNextCursor(newCursor);
			setHasMore(newHasMore);
		} catch (err) {
			console.error("Error loading more posts:", err);
			// Continue marking as loading more false, but don't reset hasMore
		} finally {
			setLoadingMore(false);
		}
	}, [loadingMore, hasMore, nextCursor]);

	return (
		<BlogsListClient
			posts={posts}
			loading={loading}
			error={error}
			hasMore={hasMore}
			loadMore={loadMore}
			loadingMore={loadingMore}
			availableTags={availableTags}
		/>
	);
}

import { Suspense } from "react";
import { SearchSkeleton } from "./skeletons";

export default function Page() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-white py-20">
					<SearchSkeleton />
				</div>
			}
		>
			<BlogsPage />
		</Suspense>
	);
}
