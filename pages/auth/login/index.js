import React, { useEffect, useRef } from "react"; 
import axios from 'axios'
import { useRouter } from 'next/router'
import LoginSVG from '../../../assets/icons/adityabirla.svg'


export default function index({token}) {
    const [message, setMessage] = React.useState("");
    const username = useRef();
    const password = useRef();
    const otp = useRef();
    const router = useRouter();
    const [disableButton, setDisableButton] = React.useState(false);


    useEffect(() => {
      if(token){
        (async () => { 
          router.push("/complaints")
        });
      }else{
        (async () => {
          router.push("/auth/login")
        });
      }
    }, []);

    
    async function handleLogin(username, password, otp) {
        const response = await axios
          .post(`/api/login`, {
            username: username,
            password: password,
            otp: otp
          })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err.response;
          });
        if (response.status === 200) {
          router.push("/complaints")
          setMessage("Logged in Successfully")
        } else {
          if (response.data.message) {
            setMessage(response.data.message);
          // } else if (response.data?.detail[0].msg) {
          //   setMessage(response.data.detail[0].msg);
          } else {
            setMessage(response.data.detail);
          }
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      }


  return (
    <div>
      <div className="md:ml-60 flex  flex-col md:flex-row h-screen p-6 md:p-12  ">
        <div className="flex-1 p-12 hidden lg:inline ">
          <div className="flex overflow-hidden rounded-md relative mx-2 mt-24">
            <LoginSVG className="h-full w-full" />
          </div>
        </div>
        
        <form className=" flex flex-col flex-1 m-8 gap-6 mt-24">
          <h1 className="text-center text-4xl mb-3 p-2">Login</h1>
          {message && (
            <p className=" font-mono bg-green-300 border-2 border-green-500 px-2 py-1 rounded-lg text-center text-red-900">
              {message}
            </p>
          )}
          <input
            ref={username}
            type="text"
            placeholder="username"
            required
            className="border-2 p-2 rounded-md border-zinc-400 focus:border-zinc-600 focus:scale-105 transform transition duration-300 ease-in-out"
          />
          <input
            ref={password}
            type="password"
            placeholder="password"
            required
            className="border-2 p-2 rounded-md border-zinc-400 focus:border-zinc-600 focus:scale-105 transform transition duration-300 ease-in-out"
          />
          <input
            ref={otp}
            type="password"
            placeholder="OTP"
            required
            className="border-2 p-2 rounded-md border-zinc-400 focus:border-zinc-600 focus:scale-105 transform transition duration-300 ease-in-out"
          />
          {disableButton ? (
            <CircleLoading className="h-10 w-10 mx-auto" />
          ) : (
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                if (!username.current.value && !password.current.value && !otp.current.value) {
                  setMessage("Please enter username and password and otp");
                  return;
                }
                handleLogin(username.current.value, password.current.value,otp.current.value);
              }
              }
              className="bg-black text-white p-2 rounded-md hover: transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              Login
            </button>
          )}
        </form>


      </div>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.access_token || null;
  return {
    props: { token },
  };
}