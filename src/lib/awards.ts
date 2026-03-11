import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const awardsDirectory = path.join(process.cwd(), "content/awards");

export interface AwardMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  rank?: string;
  link?: string;
  thumbnails?: string[];
  logo?: string;
  logoBg?: string;
}

export interface Award extends AwardMeta {
  content: string;
}

export function getAllAwardSlugs(): string[] {
  if (!fs.existsSync(awardsDirectory)) return [];
  const fileNames = fs.readdirSync(awardsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getAwardMeta(slug: string): AwardMeta | null {
  const mdPath = path.join(awardsDirectory, `${slug}.md`);
  const mdxPath = path.join(awardsDirectory, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "",
    organization: data.organization ?? "",
    rank: data.rank,
    link: data.link,
    thumbnails: data.thumbnails ?? (data.thumbnail ? [data.thumbnail] : undefined),
    logo: data.logo,
    logoBg: data.logoBg,
  };
}

export function getAllAwards(): AwardMeta[] {
  const slugs = getAllAwardSlugs();
  const awards = slugs
    .map((slug) => getAwardMeta(slug))
    .filter((award): award is AwardMeta => award !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return awards;
}

export async function getAwardBySlug(
  slug: string
): Promise<Award | null> {
  const mdPath = path.join(awardsDirectory, `${slug}.md`);
  const mdxPath = path.join(awardsDirectory, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark",
        light: "github-light",
      },
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "",
    organization: data.organization ?? "",
    rank: data.rank,
    link: data.link,
    thumbnails: data.thumbnails ?? (data.thumbnail ? [data.thumbnail] : undefined),
    logo: data.logo,
    logoBg: data.logoBg,
    content: processedContent.toString(),
  };
}
