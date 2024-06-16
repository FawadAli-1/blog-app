import RelatedPosts from "@/components/shared/RelatedPosts";
import { RichTextComponents } from "@/components/shared/RichTextComponent";
import { sanityFetch } from "@/sanity/client";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";

export const revalidate = 30;

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const EVENTS_QUERY = `*[_type == "blogpost" && slug.current == "${params.id}"]{
  title, body[]{..., "asset": asset->url}, seo, publishedAt, description, 
  "image": mainImage.asset->url, readingTime, slug, featured, "categories": categories[]->{
    title
  }
}[0]`;

  const events = await sanityFetch<SanityDocument>({ query: EVENTS_QUERY });
  console.log(events);

  return (
    <section className="flex flex-col-reverse xl:flex-row mt-16">
      <div className="xl:w-1/4">
        <RelatedPosts />
      </div>
      <div className="xl:w-3/4 prose-blue prose-lg xl:prose-xl">
        <h1 className="text-primary">{events.title}</h1>
        <div>
          <Image
            src={events.image}
            width={600}
            height={600}
            alt="cover image"
          />
        </div>
        <div>
          <PortableText value={events.body} components={RichTextComponents}/>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
