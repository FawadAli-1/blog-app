"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addSubscriber } from "@/actions/newsletter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import news from "../../../public/images/news.jpg";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { formSchema } from "@/types";
import { useToast } from "../ui/use-toast";
import React, { useState } from "react";

const EmailComponent = () => {

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await addSubscriber(values)

      if(response.success){
        toast({
          title: "Subscribed!",
          description: response.message
        })
      }else{
        toast({
          title: "Error!",
          description: response.message,
          variant: "destructive"
        })
      }

      setLoading(false)
      form.reset()
    } catch (error: any) {
      setLoading(true)
      toast({
        title: "An Error Occured!",
        description: error.message,
        variant: "destructive"
      })
      setLoading(false)
    }
  };

  return (
    <section className="shadow-lg">
      <Card>
        <CardHeader className="text-center text-slate-900 dark:text-slate-100">
          <CardTitle className="text-4xl lg:text-6xl mb-6">
            Subscribe to{" "}
            <span className="font-bold">
              Become<span className="text-primary">Better</span>
            </span>{" "}
            Newsletter!
          </CardTitle> 
        </CardHeader>
        <CardContent className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse gap-4 lg:gap-0">
          <div className="lg:w-1/2 md:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Your Email:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">First Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Last Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="text-slate-100">{loading ? <span className="flex items-center justify-center">Please wait <LoaderCircle className="animate-spin size-4 ml-1"/></span> : (
                  <span className="flex items-center justify-center">Submit <SendHorizonal className="size-4 ml-1"/></span>
                )} </Button>
              </form>
            </Form>
          </div>
          <div className="lg:w-1/2 md:w-1/2 flex items-center justify-center">
            <Image
              src={news}
              alt="Newsletter"
              height={400}
              width={400}
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmailComponent;
