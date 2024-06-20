import { sanityFetch } from "@/sanity/client";
import { AuthorTypes } from "@/types";
import Image from "next/image";
import code from "../../../public/images/code.jpg";
import { PortableText } from "next-sanity";
import { RichTextComponents } from "@/components/shared/RichTextComponent";
import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
} from "hugeicons-react";
import Link from "next/link";

const AboutPage = async () => {
  const AUTHOR_QUERY = `*[_type == "author" && slug.current == "fawad-ali"]{
  "pfp": image.asset -> url, body, socialMedia
}[0]`;

  const author = await sanityFetch<AuthorTypes>({ query: AUTHOR_QUERY });

  return (
    <section>
      <div className="flex justify-center my-4">
        <h1 className="text-3xl md:text-6xl lg:text-9xl font-bold border-b-2 border-primary leading-relaxed text-primary">
          Fawad Ali
        </h1>
      </div>
      <div className="relative lg:justify-center mt-6 lg:mt-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={code}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={75}
            priority={true}
            className="opacity-30"
          />
        </div>
        <div className="relative z-10 flex justify-center">
          <Image
            src={author.pfp}
            alt="Author"
            width={400}
            height={400}
            className="rounded-full border-4 border-slate-900 dark:border-slate-200"
          />
        </div>
      </div>
      <div className="prose prose-blue dark:prose-invert prose-headings:text-primary prose-li:marker:text-primary mt-8">
        <PortableText value={author.body} components={RichTextComponents} />
      </div>
      <div className="lg:flex lg:justify-between lg:gap-2 my-8 text-slate-900 dark:text-slate-100 font-semibold lg:w-1/3">
        <Link href={"https://instagram.com/fawad.___.1"} target="_blank">
          <div className="flex gap-1 mb-2 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
            <p>Instagram</p>
            <InstagramIcon />
          </div>
        </Link>
        <Link href={"https://discordapp.com/users/456152202281484317"} target="_blank">
          <div className="flex gap-1 mb-2 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
            <p>Discord</p>
            <DiscordIcon />
          </div>
        </Link>
        <Link href={"https://github.com/FawadAli-1"} target="_blank">
          <div className="flex gap-1 mb-2 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
            <p>Github</p>
            <GithubIcon />
          </div>
        </Link>
        <Link href={"https://x.com/fawad_ali_101"} target="_blank">
          <div className="flex gap-1 mb-2 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
            <p>Twitter/X</p>
            <TwitterIcon />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
