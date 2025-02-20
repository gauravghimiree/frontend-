import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProjects } from "@/Redux/Project/Action";
import { useState } from "react";

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [], // Only custom tags will be added
    },
  });

  // Handle manual tag addition
  const handleNewTag = (event) => {
    if (event.key === "Enter" && newTag.trim() !== "") {
      event.preventDefault();
      const currentTags = form.getValues("tags");
      if (!currentTags.includes(newTag.trim())) {
        form.setValue("tags", [...currentTags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    const updatedTags = form.getValues("tags").filter((t) => t !== tag);
    form.setValue("tags", updatedTags);
  };

  const onSubmit = (data) => {
    dispatch(createProjects(data));
    console.log("create project data ....", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Project Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Select Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project category..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Custom Tags Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleNewTag}
                    placeholder="Add custom tag and press Enter"
                    className="border w-full border-gray-700 py-2 px-4"
                  />
                </FormControl>

                {/* Display selected custom tags */}
                <div className="flex gap-1 flex-wrap mt-2">
                  {field.value.map((tag) => (
                    <div
                      key={tag}
                      className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <Cross1Icon className="h-3 w-3" onClick={() => removeTag(tag)} />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 projects with a free plan, please upgrade your plan.
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-5">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
