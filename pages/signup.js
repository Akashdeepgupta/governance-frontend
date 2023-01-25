import axios from "axios";
import Link from "next/link";
import React, { useRef } from "react";
import BACKEND_URL from '../utils/index'  

function signup() {
    const [message, setMessage] = React.useState("");
    const email = useRef(null);
    const temppassword = useRef(null);
    const password = useRef(null);

    const handleSignUp = async (email, temppassword, password) => {
        const url = `${BACKEND_URL}authority/auth/signup/`;
        const data = {
            email,
            temppassword,
            password,
        };
        const response = await axios.post(url, data).catch((err) => {
            return err.response;
        });
    }
  return (
    <div>
        <div className="md:ml-60 flex  flex-col md:flex-row h-screen p-6 md:p-12 ">
            <div className="flex-1 p-12 hidden lg:inline">
                <div className="flex overflow-hidden rounded-md relative mx-2 ">
                    {/* <SignupSVG className="h-full w-full" /> */}
                </div>
            </div>
            <form className=" flex flex-col flex-1 m-8 gap-6 mt-16">
                <h1 className="text-center text-4xl mb-3 p-2">SignUp</h1>
                {message && (
                    <p className=" font-mono bg-gray-300 border-2 border-gray-400 px-2 py-1 rounded-lg text-center text-gray-900">
                        {message}
                    </p>
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="email"
                    required={true}
                />
                <input
                    ref={temppassword}
                    type="password"
                    placeholder="temporary password"
                    required={true}
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="password"
                    required={true}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                   onClick={async (e) => {
                        e.preventDefault();
                        if (
                            !temppassword.current.value &&
                            !email.current.value &&
                            !password.current.value
                          ) {
                            setMessage("Please fill all the fields");
                            return;
                          }
                        await handleSignUp(
                            email.current.value,
                            temppassword.current.value,
                            password.current.value
                        );

                   }
                }
                >
                    SignUp
                </button>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link href="/login" legacyBehavior>
                        <a className="text-blue-500">Login</a>
                    </Link>
                </p>
            </form>
        </div>
    </div>

  )
}

export default signup