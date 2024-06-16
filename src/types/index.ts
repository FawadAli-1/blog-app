import { SanityDocument } from "next-sanity";

export interface relatedPostTypes extends SanityDocument {
    title: string,
    seo: {
        metaDescription: string
    },
    image: string,
    slug: {
        current: string
    },
    publishedAt: string,
    categories: string[],
    _id: string
}