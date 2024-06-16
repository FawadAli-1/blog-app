import RelatedPosts from "@/components/shared/RelatedPosts";
import { RichTextComponents } from "@/components/shared/RichTextComponent";
import { sanityFetch } from "@/sanity/client";
import { relatedPostTypes } from "@/types";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";

export const revalidate = 30;

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const EVENTS_QUERY = `*[_type == "blogpost" && slug.current == "${params.id}"]{
    title, body[]{..., "asset": asset->url}, seo, publishedAt, description, 
    "image": mainImage.asset->url, readingTime, slug, featured, "categories": categories[]->{
      title, _id
    }
  }[0]`;

  const events = await sanityFetch<SanityDocument>({ query: EVENTS_QUERY });

  if (!events.categories || events.categories.length === 0) {
    return (
      <section className="flex flex-col-reverse xl:flex-row mt-16 gap-4">
        <div className="xl:w-1/4">
          <RelatedPosts relatedPosts={[]} />
        </div>
        <div className="xl:w-3/4 prose-blue prose-lg xl:prose-xl prose-headings:font-semibold">
          <h1 className="text-primary">{events.title}</h1>
          <div>
            <Image
              src={events.image}
              width={600}
              height={600}
              alt="cover image"
            />
          </div>
          <div className="prose prose-lg dark:prose-invert prose-li:marker:text-primary">
            <PortableText value={events.body} components={RichTextComponents} />
          </div>
        </div>
      </section>
    );
  }

  const categoryIds = events.categories.map((category: { _id: string }) => category._id);

  const sanitizedCategoryIds = categoryIds.map((id: string) => `"${id.replace(/"/g, '\\"')}"`).join(', ');
  console.log(sanitizedCategoryIds);
  
  const sanitizedSlug = params.id.replace(/"/g, '\\"');

  console.log(sanitizedSlug);
  

  const RELATED_POSTS_QUERY = `*[_type == "blogpost" && slug.current != "${sanitizedSlug}" && count(categories[_ref in [${sanitizedCategoryIds}]]) > 0] {
    title, "image": mainImage.asset->url, slug, publishedAt, seo, "categories": categories[]->{
    title
  } 
  }`;

  const relatedPosts = await sanityFetch<relatedPostTypes[]>({ query: RELATED_POSTS_QUERY });
  

  return (
    <section className="flex flex-col-reverse xl:flex-row mt-16 gap-12">
      <div className="xl:w-1/4">
        <RelatedPosts relatedPosts={relatedPosts} />
      </div>
      <div className="xl:w-3/4 prose-blue prose-lg xl:prose-xl prose-headings:font-semibold">
        <h1 className="text-primary">{events.title}</h1>
        <div>
          <Image
            src={events.image}
            width={600}
            height={600}
            alt="cover image"
          />
        </div>
        <div className="prose prose-lg dark:prose-invert prose-li:marker:text-primary">
          <PortableText value={events.body} components={RichTextComponents} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
