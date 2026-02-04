"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Tag,
    ChevronRight,
    BookOpen,
} from "lucide-react";
import type { PostWithBlocks } from "./types";
import type { NotionBlock, NotionRichText } from "@/lib/notionBlog";
import Header from "../components/navbar";
import { Footer } from "../components/CTA";

type Props = {
    posts: PostWithBlocks[];
};

// Estimate reading time based on content length
function estimateReadingTime(blocks: NotionBlock[]): number {
    let wordCount = 0;
    const countWords = (blocklist: NotionBlock[]) => {
        for (const block of blocklist) {
            const content = (block as any)[block.type];
            if (content?.rich_text) {
                wordCount += content.rich_text
                    .map((t: NotionRichText) => t.plain_text)
                    .join(" ")
                    .split(/\s+/).length;
            }
            if (block.children) {
                countWords(block.children);
            }
        }
    };
    countWords(blocks);
    return Math.max(1, Math.ceil(wordCount / 200));
}

// Format date nicely
function formatDate(dateString: string | null): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Notion block renderer
function RenderBlock({
    block,
    depth = 0,
}: {
    block: NotionBlock;
    depth?: number;
}) {
    const content = (block as any)[block.type];

    const renderRichText = (richText: NotionRichText[]) => {
        return richText.map((text, i) => {
            let element: React.ReactNode = text.plain_text;

            if (text.annotations?.bold) {
                element = <strong key={i}>{element}</strong>;
            }
            if (text.annotations?.italic) {
                element = <em key={i}>{element}</em>;
            }
            if (text.annotations?.underline) {
                element = (
                    <span key={i} className="underline">
                        {element}
                    </span>
                );
            }
            if (text.annotations?.strikethrough) {
                element = (
                    <span key={i} className="line-through">
                        {element}
                    </span>
                );
            }
            if (text.annotations?.code) {
                element = (
                    <code
                        key={i}
                        className="bg-slate-100 text-sky-600 px-1.5 py-0.5 rounded text-sm font-mono"
                    >
                        {element}
                    </code>
                );
            }
            if (text.href) {
                element = (
                    <a
                        key={i}
                        href={text.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-500 underline transition-colors"
                    >
                        {element}
                    </a>
                );
            }

            return <span key={i}>{element}</span>;
        });
    };

    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-slate-600 leading-relaxed mb-4">
                    {content?.rich_text && renderRichText(content.rich_text)}
                </p>
            );

        case "heading_1":
            return (
                <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">
                    {content?.rich_text && renderRichText(content.rich_text)}
                </h2>
            );

        case "heading_2":
            return (
                <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-3">
                    {content?.rich_text && renderRichText(content.rich_text)}
                </h3>
            );

        case "heading_3":
            return (
                <h4 className="text-xl font-medium text-slate-900 mt-6 mb-2">
                    {content?.rich_text && renderRichText(content.rich_text)}
                </h4>
            );

        case "bulleted_list_item":
            return (
                <li className="text-slate-600 ml-6 mb-2 list-disc">
                    {content?.rich_text && renderRichText(content.rich_text)}
                    {block.children && (
                        <ul className="mt-2">
                            {block.children.map((child) => (
                                <RenderBlock key={child.id} block={child} depth={depth + 1} />
                            ))}
                        </ul>
                    )}
                </li>
            );

        case "numbered_list_item":
            // At top level (depth 0), render as a styled section heading
            if (depth === 0) {
                return (
                    <div className="mt-8 mb-4">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            {content?.rich_text && renderRichText(content.rich_text)}
                        </h3>
                        {block.children && (
                            <div className="pl-0">
                                {block.children.map((child) => (
                                    <RenderBlock key={child.id} block={child} depth={depth + 1} />
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
            return (
                <li className="text-slate-600 ml-6 mb-2 list-decimal">
                    {content?.rich_text && renderRichText(content.rich_text)}
                    {block.children && (
                        <ol className="mt-2">
                            {block.children.map((child) => (
                                <RenderBlock key={child.id} block={child} depth={depth + 1} />
                            ))}
                        </ol>
                    )}
                </li>
            );

        case "to_do":
            return (
                <div className="flex items-start gap-3 mb-2 text-slate-600">
                    <input
                        type="checkbox"
                        checked={content?.checked}
                        readOnly
                        className="mt-1 accent-sky-500"
                    />
                    <span className={content?.checked ? "line-through opacity-60" : ""}>
                        {content?.rich_text && renderRichText(content.rich_text)}
                    </span>
                </div>
            );

        case "toggle":
            return (
                <details className="mb-4 bg-slate-50 rounded-lg p-4">
                    <summary className="cursor-pointer text-slate-900 font-medium">
                        {content?.rich_text && renderRichText(content.rich_text)}
                    </summary>
                    <div className="mt-3 pl-4 border-l-2 border-slate-200">
                        {block.children?.map((child) => (
                            <RenderBlock key={child.id} block={child} depth={depth + 1} />
                        ))}
                    </div>
                </details>
            );

        case "code":
            return (
                <pre className="bg-slate-900 rounded-xl p-4 mb-6 overflow-x-auto border border-slate-800">
                    <code className="text-sm font-mono text-sky-300">
                        {content?.rich_text?.[0]?.plain_text}
                    </code>
                    {content?.language && (
                        <span className="block mt-2 text-xs text-slate-500">
                            {content.language}
                        </span>
                    )}
                </pre>
            );

        case "quote":
            return (
                <blockquote className="border-l-4 border-sky-500 pl-4 py-2 my-6 bg-sky-50 rounded-r-lg">
                    <p className="text-slate-600 italic">
                        {content?.rich_text && renderRichText(content.rich_text)}
                    </p>
                </blockquote>
            );

        case "callout":
            return (
                <div className="flex gap-3 p-4 mb-4 bg-sky-50 border border-sky-200 rounded-xl">
                    <span className="text-xl">{content?.icon?.emoji || "💡"}</span>
                    <div className="flex-1 text-slate-600">
                        {content?.rich_text && renderRichText(content.rich_text)}
                    </div>
                </div>
            );

        case "divider":
            return (
                <hr className="my-8 border-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
            );

        case "image":
            const imageUrl =
                content?.file?.url || content?.external?.url || "";
            const caption = content?.caption?.[0]?.plain_text || "";
            return (
                <figure className="my-8">
                    <img
                        src={imageUrl}
                        alt={caption || "Blog image"}
                        className="rounded-xl w-full object-cover max-h-96 border border-slate-200"
                    />
                    {caption && (
                        <figcaption className="text-center text-sm text-slate-500 mt-3">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            );

        case "video":
            const videoUrl =
                content?.file?.url || content?.external?.url || "";
            return (
                <div className="my-8">
                    <video controls className="rounded-xl w-full border border-slate-200">
                        <source src={videoUrl} />
                    </video>
                </div>
            );

        case "embed":
        case "bookmark":
            return (
                <a
                    href={content?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block my-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-sky-400/50 transition-colors"
                >
                    <span className="text-sky-600 break-all">{content?.url}</span>
                </a>
            );

        case "table":
            return (
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        {block.children?.map((row, rowIndex) => (
                            <tr
                                key={row.id}
                                className={rowIndex === 0 ? "bg-slate-100" : "bg-slate-50"}
                            >
                                {(row as any).table_row?.cells?.map(
                                    (cell: NotionRichText[], cellIndex: number) => {
                                        const CellTag = rowIndex === 0 ? "th" : "td";
                                        return (
                                            <CellTag
                                                key={cellIndex}
                                                className="border border-slate-200 px-4 py-2 text-left text-slate-600"
                                            >
                                                {renderRichText(cell)}
                                            </CellTag>
                                        );
                                    }
                                )}
                            </tr>
                        ))}
                    </table>
                </div>
            );

        default:
            return null;
    }
}

// Group consecutive list items (but not top-level numbered items - those are section headings)
function groupBlocks(blocks: NotionBlock[]): (NotionBlock | NotionBlock[])[] {
    const result: (NotionBlock | NotionBlock[])[] = [];
    let currentList: NotionBlock[] = [];
    let currentListType: string | null = null;

    for (const block of blocks) {
        // Only group bulleted list items at top level
        // Numbered list items at top level are treated as section headings
        if (block.type === "bulleted_list_item") {
            if (currentListType === block.type) {
                currentList.push(block);
            } else {
                if (currentList.length > 0) {
                    result.push(currentList);
                }
                currentList = [block];
                currentListType = block.type;
            }
        } else {
            if (currentList.length > 0) {
                result.push(currentList);
                currentList = [];
                currentListType = null;
            }
            result.push(block);
        }
    }

    if (currentList.length > 0) {
        result.push(currentList);
    }

    return result;
}

// Blog post card component
function BlogCard({
    post,
    onClick,
}: {
    post: PostWithBlocks;
    onClick: () => void;
}) {
    const readingTime = estimateReadingTime(post.blocks);

    return (
        <article
            onClick={onClick}
            className="group cursor-pointer bg-white
                       border border-slate-200 rounded-2xl overflow-hidden
                       hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-400/10
                       transition-all duration-300"
        >
            {post.cover && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
            )}
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium bg-sky-50 text-sky-600 rounded-full border border-sky-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {post.title}
                </h2>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                        {post.date && (
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(post.date)}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {readingTime} min read
                        </span>
                    </div>
                    <ChevronRight
                        size={16}
                        className="text-sky-500 group-hover:translate-x-1 transition-transform"
                    />
                </div>
            </div>
        </article>
    );
}

// Single blog post view
function BlogPostView({
    post,
    onBack,
}: {
    post: PostWithBlocks;
    onBack: () => void;
}) {
    const readingTime = estimateReadingTime(post.blocks);
    const groupedBlocks = groupBlocks(post.blocks);

    return (
        <article className="max-w-3xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors mb-4 group"
            >
                <ArrowLeft
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Back to all posts</span>
            </button>

            {post.cover && (
                <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-slate-200">
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>
            )}

            <header className="mb-6">
                <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm font-medium bg-sky-50 text-sky-600 rounded-full border border-sky-200"
                        >
                            <Tag size={12} className="inline mr-1.5" />
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                    {post.title}
                </h1>
                <p className="text-lg text-slate-600 mb-4">{post.description}</p>
                <div className="flex items-center gap-6 text-sm text-slate-500 pb-4 border-b border-slate-200">
                    {post.date && (
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-sky-500" />
                            {formatDate(post.date)}
                        </span>
                    )}
                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-sky-500" />
                        {readingTime} min read
                    </span>
                </div>
            </header>

            <div className="prose prose-slate max-w-none">
                {groupedBlocks.map((item, index) => {
                    if (Array.isArray(item)) {
                        const ListTag =
                            item[0].type === "numbered_list_item" ? "ol" : "ul";
                        return (
                            <ListTag key={index} className="mb-4">
                                {item.map((block) => (
                                    <RenderBlock key={block.id} block={block} />
                                ))}
                            </ListTag>
                        );
                    }
                    return <RenderBlock key={item.id} block={item} />;
                })}
            </div>
        </article>
    );
}

// Main component
export default function BlogsListClient({ posts }: Props) {
    const searchParams = useSearchParams();
    const slugParam = searchParams.get("slug");

    // Compute the current post directly from URL to avoid flash/double render
    const currentPost = slugParam
        ? posts.find((p) => p.slug === slugParam) || null
        : null;

    const [selectedPost, setSelectedPost] = useState<PostWithBlocks | null>(currentPost);

    // Sync selected post with URL slug changes
    useEffect(() => {
        setSelectedPost(currentPost);
    }, [currentPost]);

    // Handle post selection
    const handleSelectPost = (post: PostWithBlocks) => {
        window.history.pushState({}, "", `/blogs?slug=${post.slug}`);
        setSelectedPost(post);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handle back navigation
    const handleBack = () => {
        window.history.pushState({}, "", "/blogs");
        setSelectedPost(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <Header />

            {/* Header Section - matching Services/Career pages (only show on list view) */}
            {!selectedPost && (
                <header className="border-b text-white bg-linear-to-br from-black via-slate-900 to-sky-800 border-slate-200">
                    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 mt-10 md:mt-20">
                        <p className="text-sm font-semibold uppercase tracking-widest mt-10 text-sky-300">
                            Engineering Insights
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                            Our Blog
                        </h1>
                        <p className="mt-4 max-w-3xl text-lg text-balance leading-relaxed text-gray-300">
                            Insights, engineering notes, and thoughts from the Codevider
                            team on software development, technology trends, and innovation.
                        </p>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className={`bg-white ${selectedPost ? 'mt-24' : ''}`}>
                <div className="mx-auto max-w-7xl px-6 py-16">
                    {selectedPost ? (
                        <BlogPostView post={selectedPost} onBack={handleBack} />
                    ) : (
                        <>
                            {/* Posts Grid */}
                            {posts.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                                        <BookOpen size={28} className="text-slate-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                        No posts yet
                                    </h2>
                                    <p className="text-slate-500">
                                        Check back soon for our latest articles and insights.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post) => (
                                        <BlogCard
                                            key={post.id}
                                            post={post}
                                            onClick={() => handleSelectPost(post)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
