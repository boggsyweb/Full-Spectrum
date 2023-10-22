// src/lib/functions/tagFunctions
import { BlogItems } from "@/lib/types";
import Link from "next/link";

  export function renderTags(tags: string[]) {
    return (
      <>
      {tags.map((tag: string) => (
        <Link key={tag} 
        href={`/tags/${tag}`}>
            <button className='underline'>
            {tag}
            </button>
            </Link>
        ))}
      </>
    );
  }

  export const getAllTags = (blogEntries: BlogItems): string[] => {
    const tagsSet = new Set<string>();
  
    blogEntries.forEach((entry) => {
      entry.fields.tags.forEach((tag) => {
        tagsSet.add(tag);
      });
    });
  
    return Array.from(tagsSet);
  };
