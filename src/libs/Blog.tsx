import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import { unified } from "unified";
import markdown from "remark-parse";
import gfm from "remark-gfm";
import remark2rehype from "remark-rehype";
import slug from "rehype-slug";
import autolink from "rehype-autolink-headings";
import stringify from "rehype-stringify";
import prism from "@mapbox/rehype-prism";

export type PostStatus = "publish" | "draft" | "open" | "close";

export type Slug = string[];

export type FrontMatter = {
  title: string;
  metaTitle: string;
  metaDesc: string;
  socialImage?: string;
  createDate: string;
  updateDate?: string;
  status: PostStatus;
  icon: string;
  tags?: string[];
};

export type Post = {
  slug: Slug;
  frontMatter: FrontMatter;
  content: string;
};

const getPostSlugs = (): Slug[] => {
  const files: string[] = glob.sync(`contents/posts/**/*.md`);
  const slugs: Slug[] = files.map((filePath: string) => {
    // [ 'contents', 'posts', '2022', 'post2' ]の[ 'contents', 'posts' ]を除去する
    // TODO ここのロジックを綺麗にする
    const slug: Slug = filePath.replace(".md", "").split("/").splice(2, 10);
    return slug;
  });

  return slugs;
};

const getPost = async (slug: string[]): Promise<Post> => {
  const fileName: string = fs.readFileSync(
    `contents/posts/${slug.join("/")}.md`,
    "utf-8"
  );
  const matterResult = matter(fileName);
  return {
    slug,
    frontMatter: matterResult.data as FrontMatter,
    content: matterResult.content,
  };
};

/**
 * ドラフトは除く（CAN_PREVIEW: trueの場合は除かない）
 *
 * @param post
 * @returns
 */
const isPublic = (post: Post): boolean => {
  return (
    process.env.CAN_PREVIEW === "true" || post.frontMatter.status !== "draft"
  );
};

const markdownToHtml = async (content: string) => {
  return await unified()
    .use(markdown) // Markdownを構文木に変換
    .use(gfm) // GitHub Flavored Markdown を使えるようにする
    .use(remark2rehype) // マークダウンからHTMLに変換
    .use(slug) // h1などの見出しタグにidを追加
    .use(autolink, {
      behavior: "append",
      content: {
        type: "element",
        tagName: "svg",
        properties: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          width: "16",
          height: "16",
          className: ["inline", "align-baseline"],
        },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: {
              fillRule: "evenodd",
              d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
              clipRule: "evenodd",
            },
            children: [],
          },
        ],
      },
    }) // 見出しタグのidをもとにリンク要素に作成
    .use(prism) // シンタックスハイライト
    .use(stringify) // rehypeの構文木を文字列に変換
    .process(content);
};

export { getPostSlugs, getPost, isPublic, markdownToHtml };

const Blog = {
  getPostSlugs,
  getPost,
  isPublic,
  markdownToHtml,
};

export default Blog;
