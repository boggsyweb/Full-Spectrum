import Link from "next/link";
import { contentfulClient } from "@/lib/createClient";
import { PageQueryResult } from "@/lib/types";
import { fetchAssetUrl } from "@/app/functions/assetURL";

const client = contentfulClient;

const getPageEntries = async (): Promise<PageQueryResult> => {
  const entries = await client.getEntries({ content_type: "page", order: ['fields.order'] });
  return entries as unknown as PageQueryResult;
};
const logoImageUrl = await fetchAssetUrl('10dS6FjpWwkpe0cfqyjXf7');

export default async function Header() {
  const PageEntries = await getPageEntries();
  

  return (
    <header className="flex flex-col items-center w-full mt-6">
      <div className="flex gap-4 items-center">
        <span className="w-16">
            {logoImageUrl && (
        <img src={logoImageUrl} alt="Logo" />
      )}
      </span>
      <h1 className="my-4 text-4xl font-extrabold text-center">The Full-Spectrum Coder</h1>
      </div>
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
