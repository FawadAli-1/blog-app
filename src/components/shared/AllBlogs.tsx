import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExternalLink } from "lucide-react";

const EVENTS_QUERY = `*[_type == "blogpost"]{
  title, seo, publishedAt, description, 
  "image": mainImage.asset->url, readingTime, slug, featured, "categories": categories[]->{
    title
  }
}`;

const AllBlogs = async () => {
  const events = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <section id="all-blogs">
      <div className="my-20">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          All Blog Posts
        </h2>
      </div>
      <div className="flex flex-wrap gap-x-16 gap-y-8 justify-start">
        {events.map((event) => (
          <div key={event._id}>
          <Card
            key={event._id}
            className="text-slate-900 dark:text-slate-100 sm:flex sm:flex-col sm:justify-between w-full transform transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer shadow-lg hover:shadow-xl dark:bg-slate-900 bg-slate-50 sm:w-1/4"
          >
            <CardHeader>
              <CardTitle className="mb-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={event.image}
                alt="image"
                width={300}
                height={300}
                className="mb-4"
              />
              <p className="line-clamp-3">{event.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-8">
              <div className="flex flex-wrap gap-2">
                {event.categories.map((category: any) => {
                  return (
                    <Badge
                      className={`${
                        category.title === "Education"
                          ? "bg-green-700"
                          : category.title === "Entertainment"
                            ? "bg-yellow-500"
                            : category.title === "Comedy"
                              ? "bg-red-500"
                              : ""
                      } text-slate-50`}
                    >
                      {category.title}
                    </Badge>
                  );
                })}
              </div>
              <Link
                href={`/blog/${event.slug.current}`}
                className={`${cn(buttonVariants())} rounded-3xl text-slate-100 `}
              >
                Read More
                <ExternalLink className="size-5 ml-1 stroke-slate-100" />
              </Link>
            </CardFooter>
          </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllBlogs;
