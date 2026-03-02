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

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  techStack: string[];
  github?: string;
  demo?: string;
  company?: string;
  featured: boolean;
}

export interface Project extends ProjectMeta {
  content: string;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getProjectMeta(slug: string): ProjectMeta | null {
  const mdPath = path.join(projectsDirectory, `${slug}.md`);
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
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
    thumbnail: data.thumbnail,
    techStack: data.techStack ?? [],
    github: data.github,
    demo: data.demo,
    company: data.company,
    featured: data.featured ?? false,
  };
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getAllProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectMeta(slug))
    .filter((project): project is ProjectMeta => project !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return projects;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const mdPath = path.join(projectsDirectory, `${slug}.md`);
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
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
    thumbnail: data.thumbnail,
    techStack: data.techStack ?? [],
    github: data.github,
    demo: data.demo,
    company: data.company,
    featured: data.featured ?? false,
    content: processedContent.toString(),
  };
}
