"use server";

import { formSchema } from "@/types";
import { z } from "zod";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export const addSubscriber = async (data: z.infer<typeof formSchema>) => {
  const { email, firstName, lastName } = data;
  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags: ["Blog Audience"],
        status: "subscribed",
      }
    );

    return { success: true, message: "Subscribed successfully!" };
  } catch (error: any) {
    if (error.response && error.response.body && error.response.body.title === "Member Exists") {
        return { success: false, message: "This email is already subscribed." };
    }
    return { success: false, message: "An error occurred. Please try again." };
}
}
