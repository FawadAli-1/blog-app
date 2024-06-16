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
        <div className="relative w-full h-60">
          <Image
            className="object-contain"
            src={imageUrl}
            alt="Inline Image"
            fill
          />
        </div>
      );
    }
  }
};
