// Blog post
import { BlogItem } from "@/lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { contentfulClient } from "@/lib/createClient";

const client = contentfulClient;

const options = {
  renderNode: {

    "hyperlink": (node: any) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      );
    },
  },
};

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
  return queryResult.items[0] as unknown as BlogItem;
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
        <div className="prose [&>p]:mb-8 [&>h2]:text-[#454360] [&>h3]:text-[#454360]  prose-p:text-[#454360] prose-a:text-[#454360]  hover:prose-a:text-[#ff4656d1] dark:prose-p:text-[#b6b6cc] dark:[&>h2]:text-[#b6b6cc] dark:[&>h3]:text-[#b6b6cc] dark:prose-a:text-[#b6b6cc]">
          {documentToReactComponents(content, options)}
        </div>
      </article>
    </main>
  );
}