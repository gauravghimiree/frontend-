import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/Redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react"; // Import icons for show/hide password

const Login = ({ toast }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur", // Validate fields when they lose focus
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(login(data)); // Assuming login returns a promise
            toast.success("Login successful!"); // Show success notification
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage); // Show error notification
        }
    };

    return (
        <div className="space-y-5 bg-white p-6 rounded-lg">
            <h1 className="w-full text-center text-3xl font-bold text-purple-600">Login</h1>

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Email Field with Validation */}
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Enter a valid email address",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        className="border w-full border-gray-700 py-3 px-4 rounded-md"
                                        placeholder="Email..."
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Password Field with Show/Hide Option */}
                    <FormField
                        control={form.control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            className="border w-full border-gray-700 py-3 px-4 rounded-md pr-10"
                                            placeholder="Password..."
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
