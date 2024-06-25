import { SanityDocument } from "next-sanity";
import * as z from "zod";

export type Category = {
  title: string;
  _id: string;
};

export type relatedPostTypes = {
  title: string;
  seo: {
    metaDescription: string;
  };
  image: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  categories: Category[];
  _id: string;
};

export type AuthorTypes = {
  pfp: string;
  body: any;
  socialMedia: {
    twitterx: string;
    instagram: string;
    github: string;
    discord: string;
  };
};

export interface EventsInterface extends SanityDocument {
  description: string;
  image: string;
  readingTime: number;
  slug: {
    current: string;
    _type: string;
  };
  featured: boolean | null;
  categories: [
    {
      title: string;
      _id: string;
    },
  ];
  title: string;
  publishedAt: string;
  seo: {
    metaKeywords: string[];
    metaTitle: string;
    metaDescription: string;
  };
}

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address. Retry!" }).
    regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      { message: "Invalid email address" }
    )
    .max(30, { message: "Email cannot exceed 30 characters." }),
  firstName: z
    .string()
    .min(3, { message: "First name should be greater than 3 characters." })
    .max(15, { message: "First name should be less than 15 characters." }),
  lastName: z
    .string()
    .min(3, { message: "Last name should be greater than 3 characters." })
    .max(15, { message: "Last name should be less than 15 characters." }),
});

export type EmailProps = {
  firstName: string,
  lastName: string,
  email: string
}