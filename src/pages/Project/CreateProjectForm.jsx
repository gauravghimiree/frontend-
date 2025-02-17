import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProjects } from "@/Redux/Project/Action";
import { useState } from "react";

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState("");

  // Hardcoded list of tags
  const availableTags = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Vue"];

  // Function to handle tag selection or addition
  const handleTagsChange = (newTag) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(newTag)
      ? currentTags.filter((tag) => tag !== newTag)
      : [...currentTags, newTag];
    form.setValue("tags", updatedTags);
  };

  // Handle manual tag addition
  const handleNewTag = (event) => {
    if (event.key === "Enter" && newTag.trim() !== "") {
      event.preventDefault();
      handleTagsChange(newTag.trim());
      setNewTag("");
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["JavaScript", "React"], // Default selected tags
    },
  });

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
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Select Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={handleTagsChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* New Tag Input */}
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleNewTag}
                  placeholder="Add custom tag and press Enter"
                  className="border w-full border-gray-700 py-2 px-4 mt-2"
                />

                {/* Display selected tags */}
                <div className="flex gap-1 flex-wrap mt-2">
                  {field.value.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleTagsChange(tag)}
                      className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <Cross1Icon className="h-3 w-3" />
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
