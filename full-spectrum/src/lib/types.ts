import { Document } from "@contentful/rich-text-types";

export type PageItem = {
  fields: {
    title: string;
    body: Document;
    slug: string;
    order: number;
    linkName: string;
    image: {
      fields: {
        file: {
          url: string;
        }
      }
    }
  }
}
export type PageItems = ReadonlyArray<PageItem>;
export type PageQueryResult = {
  items: PageItems;
};

export type BlogItem = {
  fields: {
    title: string;
    slug: string;
    date: Date;
    content: Document;
    readTime: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    tags: string[];
  };
};
export type BlogItems = ReadonlyArray<BlogItem>;

export type BlogQueryResult = {
  fields: any;
  items: BlogItems;
};
