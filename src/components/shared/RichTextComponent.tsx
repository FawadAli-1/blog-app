import { urlFor } from "@/sanity/client";
import Image from "next/image";

export const RichTextComponents = {
  types: {
    image: async({ value }: any) => {
      if (!value?.asset) {
        console.warn("Missing asset in value:", value);
        return null;
      }
      
      const imageUrl = (await urlFor(value.asset)).url(); // Generate the URL

      return (
        <div className="">
          <Image
          className="mx-auto"
            src={imageUrl}
            alt="Inline Image"
            width={800}
            height={800}
          />
        </div>
      );
    }
  }
};
