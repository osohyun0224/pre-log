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

const activitiesDirectory = path.join(process.cwd(), "content/activities");

export interface ActivityMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  year: number;
  category?: string;
  link?: string;
  thumbnails?: string[];
  logo?: string;
  logoBg?: string;
}

export interface Activity extends ActivityMeta {
  content: string;
}

export function getAllActivitySlugs(): string[] {
  if (!fs.existsSync(activitiesDirectory)) return [];
  const fileNames = fs.readdirSync(activitiesDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getActivityMeta(slug: string): ActivityMeta | null {
  const mdPath = path.join(activitiesDirectory, `${slug}.md`);
  const mdxPath = path.join(activitiesDirectory, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  const date = data.date ?? "";
  const year = date ? new Date(date).getFullYear() : 0;

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date,
    year,
    category: data.category,
    link: data.link,
    thumbnails: data.thumbnails ?? (data.thumbnail ? [data.thumbnail] : undefined),
    logo: data.logo,
    logoBg: data.logoBg,
  };
}

export function getAllActivities(): ActivityMeta[] {
  const slugs = getAllActivitySlugs();
  const activities = slugs
    .map((slug) => getActivityMeta(slug))
    .filter((activity): activity is ActivityMeta => activity !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return activities;
}

export function getActivitiesByYear(): Record<number, ActivityMeta[]> {
  const activities = getAllActivities();
  const byYear: Record<number, ActivityMeta[]> = {};

  for (const activity of activities) {
    if (!byYear[activity.year]) {
      byYear[activity.year] = [];
    }
    byYear[activity.year].push(activity);
  }

  return byYear;
}

export async function getActivityBySlug(
  slug: string
): Promise<Activity | null> {
  const mdPath = path.join(activitiesDirectory, `${slug}.md`);
  const mdxPath = path.join(activitiesDirectory, `${slug}.mdx`);
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

  const date = data.date ?? "";
  const year = date ? new Date(date).getFullYear() : 0;

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date,
    year,
    category: data.category,
    link: data.link,
    thumbnails: data.thumbnails ?? (data.thumbnail ? [data.thumbnail] : undefined),
    logo: data.logo,
    logoBg: data.logoBg,
    content: processedContent.toString(),
  };
}
