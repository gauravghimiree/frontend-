import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/Redux/Auth/Action.js";  // Update the path to where your register action is
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'; // Import toast

const Signup = () => {
  const dispatch = useDispatch();
  const form = useForm({
      defaultValues: {
          fullName: "",
          email: "",
          password: "",
      },
  });

  const onSubmit = async (data) => {
      try {
          await dispatch(register(data)); // Assuming register returns a promise
          toast.success('Registered successfully!'); // Show success notification
      } catch (error) {
          // Check if the error response contains a specific message
          const errorMessage = error.response?.data?.message || 'Email already exists'; // Default to 'Email already exists'
          toast.error(errorMessage); // Show error notification
      }
      console.log('Signup Data:', data);
  };

  return (
     <>
     {/* <div>
        ABCD
     </div> */}
      <div className="space-y-5 bg-white p-6 rounded-lg">
          <h1 className="w-full text-center text-3xl font-bold text-purple-600">Register</h1>

          <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control} name="fullName"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <Input {...field} type="text"
                                      className="border w-full border-gray-700 py-3 px-4 rounded-md"
                                      placeholder="Full Name..." />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField control={form.control} name="email"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <Input {...field} type="email"
                                      className="border w-full border-gray-700 py-3 px-4 rounded-md"
                                      placeholder="Email..." />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField control={form.control} name="password"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <Input {...field} type="password"
                                      className="border w-full border-gray-700 py-3 px-4 rounded-md"
                                      placeholder="Password..." />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <Button type="submit" className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
                      Register
                  </Button>
              </form>
          </Form>
      </div>
     </>
  );
};

export default Signup;