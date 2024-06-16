import { createClient, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_ID,
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false
})

export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
  }: {
    query: string;
    params?: QueryParams;
    tags?: string[];
  }) {
    return client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
        tags,
      },
    });
  }

const builder = imageUrlBuilder(client)


export async function urlFor(value:any){
  return builder.image(value)
}