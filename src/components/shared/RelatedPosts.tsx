import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Category } from "@/types";

const RelatedPosts = ({
  relatedPosts,
}: {
  relatedPosts: {
    title: string;
    seo: {
      metaDescription: string;
    };
    image: string;
    slug: {
      current: string;
    };
    publishedAt: string;
    categories: Category[]
    _id: string;
  }[];
}) => {
  if (!relatedPosts || relatedPosts.length === 0) {
    return <p>No related posts available.</p>;
  }

  return (
    <div className="related-posts hover:cursor-pointer">
      <h2 className="text-2xl font-semibold mb-4">
        <span className="text-primary">Related</span> Posts
      </h2>
      {relatedPosts.map((post) => (
        <div key={post._id} className="w-full my-4">
          <Card key={post._id}>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.seo.metaDescription}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Image src={post.image} alt="image" width={200} height={200} />
              <p className="text-slate-50 my-4">
                <span className="font-bold text-primary">Published:</span>{" "}
                &nbsp;
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categories.map((category: Category) => {
                    return (
                      <div key={category._id}>
                      <Badge
                      key={category._id}
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
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className={`${cn(buttonVariants())} rounded-3xl text-slate-100 `}
                >
                  Read More
                  <ExternalLink className="size-5 ml-1 stroke-slate-100" />
                </Link>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default RelatedPosts;
