import { SanityDocument } from "next-sanity";

export type Category = {
    title: string,
    _id: string
}

export type relatedPostTypes = {
    title: string,
    seo: {
        metaDescription: string
    },
    image: string,
    slug: {
        current: string
    },
    publishedAt: string,
    categories: Category[],
    _id: string
}