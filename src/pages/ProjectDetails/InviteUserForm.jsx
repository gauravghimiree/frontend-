import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inviteToProject } from "@/Redux/Project/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";

const InviteUserForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // State for managing loading

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      await dispatch(inviteToProject({ email: data.email, projectId: id }));
      console.log("Invitation sent successfully:", data);
      setLoading(false); // Stop loading
      if (onClose) onClose(); // Close the dialog
    } catch (error) {
      console.error("Error sending invitation:", error);
      setLoading(false); // Stop loading on failure
    }
  };

  return (
    <Dialog>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter user email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Invite User"}
            </Button>
          </div>
        </form>
      </Form>
    </Dialog>
  );
};

export default InviteUserForm;
