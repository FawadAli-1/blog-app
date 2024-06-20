import { BlockChildrenObjectField } from '@sanity/types';


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

export type AuthorTypes = {
    pfp: string,
    body: any,
    socialMedia: {
        twitterx: string,
        instagram: string,
        github: string,
        discord: string,
    }
}