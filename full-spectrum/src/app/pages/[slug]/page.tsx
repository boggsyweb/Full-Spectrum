// Static pages
import { PageItem } from "@/lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { contentfulClient } from "@/lib/functions";

const client = contentfulClient;

type PageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const queryOptions = {
        content_type: "page",
        select: "fields.slug",
    };

    const pages = await client.getEntries(queryOptions);
    return pages.items.map((page) => ({
        slug: page.fields.slug,
      }));
    }

    const fetchPage = async (slug: string): Promise<PageItem> => {
        const queryOptions = {
            content_type: "page",
            "fields.slug[match]": slug,
    };
    const queryResult = await client.getEntries(queryOptions);
    return queryResult.items[0];
};
export default async function BlogPage(props: PageProps) {
    const { params } = props;
    const { slug } = params;
    const page = await fetchPage(slug);
    const { title, body, image, linkName } = page.fields;

    return (
        <main className="flex items-center min-h-screen flex-col py-12 gap-y-12">
          <article className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-3/4">
            <h1 className="font-extrabold text-3xl mb-4">{title}</h1>
            <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
              {documentToReactComponents(body)}
            </div>
            <img
                src={`https:${image.fields.file.url}`}
                alt={title}
                className="w-1/2" 
              />
          </article>
          <p>{linkName}</p>
        </main>
      );
    }