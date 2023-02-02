import axios from "axios";
import Link from "next/link";
import React, { useRef,useEffect } from "react";
import { QRCodeSVG } from 'qrcode.react';
import BACKEND_URL from '../../../utils/index' 
import ConsumerSvg from '../../../assets/icons/consumer.svg' 
import CircleLoading from '../../../assets/icons/CircleLoading.svg' 

function signup() {
    const [message, setMessage] = React.useState("");
    const [provisionUrl, setProvisionUrl] = React.useState("abc");
    const email = useRef(null);
    const temp_password = useRef(null);
    const password = useRef(null);
    const [disableButton, setDisableButton] = React.useState(false);
    
    


    const handleSignUp = async (email, temp_password, password,message,setMessage,provisionUrl,setProvisionUrl) => {
        setDisableButton(true);
        const url = `${BACKEND_URL}authority/auth/signup/`;
        const data = {
            email,
            temp_password,
            password,
        };
        const response = await axios.post(url, data).catch((err) => {
            return err.response;
        });
        console.log(response)
        if (response.status === 200) {
            setMessage("Successfully signed up");
            console.log(response.data.qr_code)
            setProvisionUrl(response.data.qr_code);
            console.log(provisionUrl)
        } else {
            if (response.data.message) {
                setMessage(response.data.message);
            } else if (response.data?.detail[0].msg) {
                setMessage(response.data.detail[0].msg);
            }
        }
          setDisableButton(false);

    };
  return (
    <div>
        <div className="md:ml-60 flex  flex-col md:flex-row h-screen p-6 md:p-12 ">
            <div className="flex-1 p-12 hidden lg:inline">
                <div className="flex overflow-hidden rounded-md relative mx-2 ">
                    <ConsumerSvg className="h-full w-full" />
                </div>
            </div>
            { provisionUrl === 'abc' ? (
                <div className="flex-1 p-12 hidden lg:inline">
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
                            className="border-2 border-gray-300 p-2 rounded-lg"
                        />
                        <input
                            ref={temp_password}
                            type="password"
                            placeholder="temporary password"
                            required={true}
                            className="border-2 border-gray-300 p-2 rounded-lg"
                        />
                        <input
                            ref={password}
                            type="password"
                            placeholder="password"
                            required={true}
                            className="border-2 border-gray-300 p-2 rounded-lg"
                        />
                        {disableButton ? (
                                <CircleLoading className="h-6 w-6" />
                                ) : (
                                    <button
                                    
                                    type="submit"
                                    className="bg-black text-white p-2 rounded-lg hover: transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"   
                                    onClick={(e) => {   
                                        e.preventDefault();
                                        if (
                                            !email.current.value &&
                                            !temp_password.current.value &&
                                            !password.current.value
                                        ) {
                                            setMessage("Please fill all the fields");
                                            return;
                                        }
                                        handleSignUp(
                                            email.current.value,
                                            temp_password.current.value,
                                            password.current.value,
                                            message,
                                            setMessage,
                                            provisionUrl,
                                            setProvisionUrl
                                        );
                                    }}
                                    disabled={disableButton}
                                    
                                >
                                    SignUp
                                </button>
                            )
                                }
                        <p className="text-center">
                            Already have an account?{" "}
                            <Link href="/login" legacyBehavior>
                                <a className="text-blue-500">Login</a>
                            </Link>
                        </p>
                    </form>
                </div>
            ) :
             (
                <>
                    <div className="flex flex-col flex-1 m-8 gap-6 mt-16 hidden lg:inline">
                        <h1 className="text-center text-4xl mb-3 p-2">Scan QR</h1>
                        <div className="flex justify-center">
                            <QRCodeSVG value={provisionUrl} size={256}/> 
                        </div> 
                    </div>
                    <div className="flex justify-center lg:hidden">
                        <h1 className="text-center text:bold  ">
                            <Link href="provisionUrl" legacyBehavior>
                                <a className="text-blue-500">Two 2fa</a>
                            </Link>
                        </h1>
                    </div>
                </>
             )
            }
        </div>
    </div>

  )
}

export default signup