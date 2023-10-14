import { BlogItems } from "@/lib/types";

    const tagColors = {
    General: "decoration-green-200",
    Design: "decoration-violet-200",
    Coding: "decoration-red-200",
    Strategies: "decoration-cyan-200",
    Resources: "decoration-yellow-200"
  };

  const getTagColor = (tag: string) => {
    const color = (tagColors as Record<string, string>)[tag];
    return color || "decoration-blue-500";

  };
  export function renderTags(tags: string[]) {
    return (
      <>
      {tags.map((tag: string, index: number) => (
          <span>
            <p             
            key={index}
            className={`p-1 text-sm max-w-fit rounded-sm underline decoration-4 underline-offset-4 shadow-[0px_2px_6px_rgba(7,10,25,.1)] ${getTagColor(tag)}`}>
            {tag}</p>
          </span>
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
  
  