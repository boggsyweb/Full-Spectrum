// Home page
import Link from "next/link";
import { BlogQueryResult } from "../lib/types";
import { contentfulClient } from "@/lib/createClient";
import { renderTags } from "../functions/tagFunction";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = contentfulClient;

 const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "blog", order: ['-fields.date'], include: 1 });
  return entries as unknown as BlogQueryResult;
};
export default async function Home() {
  const blogEntries = await getBlogEntries();
  return (
    <main className="flex items-center min-h-screen flex-col py-12 gap-y-12">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, content, date, image, tags, readTime } = singlePost.fields;
        return (
          <div className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5">
              <span className="grid md:grid-cols-[1fr_4fr] gap-6 mb-6">
            <img className="rounded-sm mb-1"
                src={`https:${image.fields.file.url}`}
                alt={title}
              />
              <span className="flex flex-col">
              <Link href={`/articles/${slug}`}>
                <h2 className="font-extrabold text-2xl text-left underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff46569d]" key={slug}>
                {title}
              </h2>
              </Link>
                <span className="flex flex-col  items-center sm:flex-row">
                  <span className="flex gap-2">{renderTags(tags)}</span>
                  <p className="sm:mx-10">{readTime} read</p>
                  <span className="font-semibold  opacity-70">
                {" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                </span>
                  </span>
              </span>
              </span>
              <div className=" max-h-32 overflow-hidden">{documentToReactComponents(content)}</div>
              <Link className="group" href={`/articles/${slug}`}>
            <div className="w-32 my-0 mx-auto translate-y-14 bg-[#4A4870] text-slate-50 font-semibold text-center py-2 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_1px_#ff4656c5] dark:shadow-[3px_3px_0px_1px_rgba(0,0,0,0.3)] transition-shadow duration-200" key={slug}>Read More
            </div>
            </Link>
          </div>
        );
      })}
    </main>
  );
}