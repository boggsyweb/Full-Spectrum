// Blog page

import { BlogItem } from "@/lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { contentfulClient } from "@/lib/functions";

const client = contentfulClient;

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "blog",
    select: "fields.slug",
  };

  const articles = await client.getEntries(queryOptions);
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
  const queryOptions = {
    content_type: "blog",
    "fields.slug[match]": slug,
  };
  const queryResult = await client.getEntries(queryOptions);
  return queryResult.items[0];
};

export default async function BlogPage(props: BlogPageProps) {
  const { params } = props;
  const { slug } = params;
  const article = await fetchBlogPost(slug);
  const { title, date, content, image } = article.fields;

  return (
    <main className="flex flex-col items-center min-h-screen py-12 gap-y-12">
      <article className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-3/4">
        <h1 className="font-extrabold text-3xl mb-2">{title}</h1>
        <img
            src={`https:${image.fields.file.url}`}
            alt={title}
            className="w-full" 
          />
        <p className="mb-6 opacity-70 ">
          Posted on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
          {documentToReactComponents(content)}
        </div>
      </article>
    </main>
  );
}