import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/Redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const form = useForm({
      defaultValues: {
          email: "",
          password: "",
      },
  });

  const onSubmit = (data) => {
      dispatch(login(data));
      console.log('Login Data:', data);
  };

  return (

    
      <div className="space-y-5 bg-white p-6 rounded-lg shadow-md">
          <h1 className="w-full text-center text-3xl font-bold text-purple-600">Login</h1>

          <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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

                  <Button type='submit' className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
                      Login
                  </Button>
              </form>
          </Form>
      </div>
  );
};

export default Login;
