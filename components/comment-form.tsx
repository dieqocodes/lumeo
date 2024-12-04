"use client";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createComment } from "@/actions";
import { toast } from "sonner";

const formSchema = z.object({
  input: z.string().min(1),
});

export default function CommentForm({ postId }: { postId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await createComment({ postId, content: values.input });

    if (data.success) {
      toast.success("Comment added");
      form.reset();
    } else {
      toast.error("Something went wrong, try again");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-4/5 mx-auto flex items-center gap-4"
      >
        <FormField
          name="input"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input {...field} placeholder="Comment" className="w-full" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="icon" type="submit">
          <Plus size={15} />
        </Button>
      </form>
    </Form>
  );
}
