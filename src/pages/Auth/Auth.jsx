
import { useState } from "react";
import "./Auth.css";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";

const Auth = () => {
    const [active, setActive] = useState(true);

    return (
        
        <div className="auth-container flex justify-center items-center min-h-screen bg-gray-900">
            <div className="auth-box h-[30rem] w-[25rem] flex justify-center items-center">
                <div className="auth-inner-container login">
                    <div className="auth-box-content bg-white p-6 rounded-lg shadow-md">
                        {/* Display Signup or Login based on active state */}
                        {active ? <Signup /> : <Login />}

                        <div className="auth-switch text-center mt-3">
                            <span className="text-gray-700">Already have an account?</span>
                            <Button
                                variant="ghost"
                                onClick={() => setActive(!active)}
                                className="text-purple-600 ml-2"
                            >
                                {active ? "Sign In" : "Sign Up"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
