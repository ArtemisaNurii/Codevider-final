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
    List,
    ArrowUpRight,
} from "lucide-react";
import type { PostWithBlocks } from "./types";
import type { NotionBlock, NotionRichText } from "@/lib/notionBlog";
import Header from "../components/navbar";
import { Footer } from "../components/CTA";

type Props = {
    posts: PostWithBlocks[];
    loading?: boolean;
    error?: string | null;
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

// Generate a URL-friendly slug from text
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Heading item for table of contents
type HeadingItem = {
    id: string;
    text: string;
    level: number;
};

// Extract headings from blocks for table of contents
function extractHeadings(blocks: NotionBlock[]): HeadingItem[] {
    const headings: HeadingItem[] = [];

    const processBlocks = (blocklist: NotionBlock[]) => {
        for (const block of blocklist) {
            if (block.type.startsWith("heading_")) {
                const level = parseInt(block.type.replace("heading_", ""), 10);
                const content = (block as any)[block.type];
                const text = content?.rich_text
                    ?.map((t: NotionRichText) => t.plain_text)
                    .join("") || "";
                if (text) {
                    headings.push({
                        id: slugify(text),
                        text,
                        level,
                    });
                }
            }
            if (block.children) {
                processBlocks(block.children);
            }
        }
    };

    processBlocks(blocks);
    return headings;
}

// Table of Contents component
// Table of Contents component
// Table of Contents component
function TableOfContents({ headings }: { headings: HeadingItem[] }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -80% 0px" }
        );

        headings.forEach((h) => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (!headings.length) return null;

    return (
        <nav className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />
            <ul className="space-y-2 relative">
                {headings.map((h, i) => (
                    <li key={i} className="relative">
                        <button
                            onClick={() => {
                                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                                setActiveId(h.id);
                            }}
                            className={`block w-full text-left transition-all duration-200 truncate pl-4 border-l-2 -ml-[1px]
                                ${activeId === h.id
                                    ? "border-sky-500 text-sky-600 font-medium translate-x-1"
                                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                                }`}
                            style={{
                                marginLeft: h.level > 2 ? `${(h.level - 2) * 1}rem` : undefined
                            }}
                            title={h.text}
                        >
                            <span className="text-sm leading-relaxed block py-1">
                                {h.text}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
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

    // Color mappings for Notion text colors (using inline styles to avoid Tailwind purge)
    const notionColorMap: Record<string, { color?: string; background?: string }> = {
        gray: { color: "#6B7280" },
        brown: { color: "#92400E" },
        orange: { color: "#EA580C" },
        yellow: { color: "#CA8A04" },
        green: { color: "#16A34A" },
        blue: { color: "#2563EB" },
        purple: { color: "#9333EA" },
        pink: { color: "#EC4899" },
        red: { color: "#DC2626" },
        // Background colors with matching dark text for good contrast
        gray_background: { background: "#F3F4F6", },
        brown_background: { background: "#FEF3C7", },
        orange_background: { background: "#FFEDD5", },
        yellow_background: { background: "#FEF9C3", },
        green_background: { background: "#DCFCE7", },
        blue_background: { background: "#DBEAFE", },
        purple_background: { background: "#F3E8FF", },
        pink_background: { background: "#FCE7F3", },
        red_background: { background: "#FEE2E2", },
    };

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
            // Handle Notion text colors
            if (text.annotations?.color && text.annotations.color !== "default") {
                const colorStyle = notionColorMap[text.annotations.color];
                if (colorStyle) {
                    const styleObj: React.CSSProperties = {};
                    // Only set color if explicitly defined in the map
                    if (colorStyle.color) {
                        styleObj.color = colorStyle.color;
                    }
                    // Only set background if explicitly defined in the map
                    if (colorStyle.background) {
                        styleObj.backgroundColor = colorStyle.background;
                        styleObj.padding = "0.125rem 0.25rem";
                        styleObj.borderRadius = "0.25rem";
                    }
                    element = (
                        <span key={i} style={styleObj}>
                            {element}
                        </span>
                    );
                }
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
        case "heading_2":
        case "heading_3":
        case "heading_4":
        case "heading_5":
        case "heading_6": {
            const headingText = content?.rich_text
                ?.map((t: NotionRichText) => t.plain_text)
                .join("") || "";
            const headingId = slugify(headingText);
            const headingStyles: Record<string, { tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; className: string }> = {
                heading_1: { tag: "h2", className: "text-3xl font-bold text-slate-900 mt-10 mb-4" },
                heading_2: { tag: "h3", className: "text-2xl font-semibold text-slate-900 mt-8 mb-3" },
                heading_3: { tag: "h4", className: "text-xl font-medium text-slate-900 mt-6 mb-2" },
                heading_4: { tag: "h4", className: "text-lg font-medium text-slate-900 mt-6 mb-2" },
                heading_5: { tag: "h4", className: "text-md font-medium text-slate-900 mt-6 mb-2" },
                heading_6: { tag: "h4", className: "text-sm font-medium text-slate-900 mt-6 mb-2" },
            };
            const { tag: HeadingTag, className } = headingStyles[block.type];
            return (
                <HeadingTag id={headingId} className={`${className} scroll-mt-24`}>
                    {content?.rich_text && renderRichText(content.rich_text)}
                </HeadingTag>
            );
        }

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
// Blog post card component
function BlogCard({ post, onClick }: { post: PostWithBlocks; onClick: () => void }) {
    const readingTime = estimateReadingTime(post.blocks);

    return (
        <article
            onClick={onClick}
            className="group flex flex-col h-full cursor-pointer bg-white rounded-3xl overflow-hidden
                       border border-slate-200 shadow-sm
                       hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1
                       transition-all duration-300 ease-out"
        >
            {post.cover && (
                <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
            )}

            <div className="flex-1 p-8 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-3">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                    <ArrowUpRight className="shrink-0 text-slate-400 group-hover:text-sky-600 transition-colors" size={24} />
                </div>

                <p className="text-base text-slate-600 mb-8 line-clamp-3 leading-relaxed">
                    {post.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg
                                           bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {readingTime} min read
                    </span>
                </div>
            </div>
        </article>
    );
}

function BlogPostView({ post, onBack }: { post: PostWithBlocks; onBack: () => void }) {
    const readingTime = estimateReadingTime(post.blocks);
    const groupedBlocks = groupBlocks(post.blocks);
    const headings = extractHeadings(post.blocks);

    return (
        <article className="w-full">
            <button
                onClick={onBack}
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8"
            >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors shadow-xs">
                    <ArrowLeft size={16} />
                </div>
                Back to all posts
            </button>

            {post.cover && (
                <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg ring-1 ring-slate-900/5">
                    <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </div>
            )}

            <header className="mb-12 text-center max-w-2xl mx-auto">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-100/50">
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 text-balance leading-[1.1]">
                    {post.title}
                </h1>

                <p className="text-xl text-slate-600 mb-8 leading-relaxed text-balance">{post.description}</p>

                <div className="flex items-center justify-center gap-8 text-sm font-medium text-slate-500 border-y border-slate-100 py-4">
                    {post.date && (
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            {formatDate(post.date)}
                        </span>
                    )}
                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        {readingTime} min read
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
                <aside className="hidden lg:block sticky top-24">
                    <div className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
                        Table of Contents
                    </div>
                    <TableOfContents headings={headings} />
                </aside>

                <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl prose-img:shadow-md max-w-none">
                    <div className="lg:hidden mb-8">
                        <TableOfContents headings={headings} />
                    </div>
                    {groupedBlocks.map((item, i) =>
                        Array.isArray(item)
                            ? <ul key={i}>{item.map(b => <RenderBlock key={b.id} block={b} />)}</ul>
                            : <RenderBlock key={item.id} block={item} />
                    )}
                </div>
            </div>
        </article>
    );
}
// Skeleton card for loading state
function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm h-full flex flex-col">
            <div className="aspect-[16/9] bg-slate-200 animate-pulse" />
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-4">
                    <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-slate-200 rounded-full animate-pulse" />
                </div>
                <div className="h-7 w-3/4 bg-slate-200 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse mb-auto" />
                <div className="pt-5 mt-6 border-t border-slate-100 flex justify-between">
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}

// Main component
export default function BlogsListClient({ posts, loading, error }: Props) {
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
            <main className={`bg-slate-50 ${selectedPost ? 'mt-24' : ''}`}>
                <div className="mx-auto max-w-7xl px-6 py-16">
                    {/* Loading State - Skeleton */}
                    {loading && !selectedPost && (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <BlogCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                                <BookOpen size={28} className="text-red-500" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                Error loading posts
                            </h2>
                            <p className="text-slate-500">{error}</p>
                        </div>
                    )}

                    {/* Content */}
                    {!loading && !error && (
                        <>
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
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

