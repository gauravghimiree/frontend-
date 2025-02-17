import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createComment } from "@/Redux/Comment/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateCommentForm = ({ issueId, userName }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValue: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    // Dispatch the action to create a comment
    dispatch(createComment({ content: data.content, issueId, creatorName: userName }));
    console.log("Creating comment with data:", data);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <form className="flex gap-3 items-center" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                  <div>
                    <Avatar>
                      {/* Display the first letter of the user name or a default letter */}
                      <AvatarFallback>{userName ? userName[0] : "U"}</AvatarFallback>
                    </Avatar>
                  </div>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[20rem] border-2 border-gray-300 rounded-md p-2"
                      placeholder="Add a comment..."
                      required
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
            Save Comment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
