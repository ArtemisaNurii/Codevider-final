import type { BlogPost, NotionBlock } from "@/lib/notionBlog";

export type PostWithBlocks = BlogPost & {
    blocks: NotionBlock[];
};
