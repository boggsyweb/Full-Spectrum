import Link from "next/link";
import { contentfulClient } from "@/lib/functions";
import { PageQueryResult } from "@/lib/types";

const client = contentfulClient;

const getPageEntries = async (): Promise<PageQueryResult> => {
  const entries = await client.getEntries({ content_type: "page", order: ['fields.order'] });
  return entries;
};

export default async function Header() {
  const PageEntries = await getPageEntries();
  

  return (
    <header className="flex flex-col items-center w-full mt-6">
      <h1 className="my-4 text-4xl font-extrabold text-center">The Full-Spectrum Coder</h1>
      <nav className="bg-white dark:bg-[#201C35] w-full text-center p-4 my-4 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)]">
        <Link className="text-lg mx-6" href="/">Home</Link>
        {PageEntries.items.map((singlePost) => {
          const { slug, linkName } = singlePost.fields;
          return (
            <span key={slug}>
              <Link className="text-lg mx-6" href={`/pages/${slug}`}>{linkName}</Link>
            </span>
          );
        })}
      </nav>
    </header>
  );
}
