import React from "react";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import {marked} from "marked";

interface Frontmatter {
  title: string;
  description: string;
}

interface PostProps {
  htmlString: string;
  data: Frontmatter;
}

const Post: React.FC<PostProps> = ({ htmlString, data }) => {
  return (
      <>
        <head>
          <title>{data.title}</title>
          <meta name="description" content={data.description} />
        </head>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const filePath = path.join("posts", `${params.slug}.md`);
  const markdownWithMetadata = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(markdownWithMetadata);

  if (!data || typeof data.title !== 'string' || typeof data.description !== 'string') {
    throw new Error('Invalid frontmatter data');
  }

  const htmlString = marked(content);

  return {
    props: {
      htmlString,
      data,
    },
  };
};

export default Post;
