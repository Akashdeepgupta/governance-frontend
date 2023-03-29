import Link from "next/link";
import React,{useEffect,useState} from "react";
import Menu from "../../assets/icons/menu.svg";
import menulist from "./menulist";
import Cookies from "js-cookie"; 

import { useRouter } from "next/router";
 export default function Navbar() {
  const [ToggleMenu, setToggleMenu] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const isUserLoggedIn = Cookies.get('isLoggedIn');
    if (isUserLoggedIn) {
      setIsLoggedIn(true); 
    }
  }); 

  return (
    <>
      {/* mobile menu */}
      <button
        onClick={() => setToggleMenu(!ToggleMenu)}
        className={`sm:hidden bg-zinc-200 rounded-md ${
          !ToggleMenu && "hidden"
        } fixed p-1.5 z-10 top-4 left-4`}
      >
        <Menu className="fill-black" />
      </button>
      <div
        className={`sm:hidden z-20 fixed flex ${
          ToggleMenu
            ? "-left-[1200px] ease-in duration-300"
            : "left-0 ease-out duration-300"
        } h-full w-full tran`}
      >
        <ul className="flex-1 flex flex-col gap-6 p-4 pl-6 pt-10 bg-zinc-800">
          {menulist.map((item, index) => {
            if(item.name === "Logout" && isLoggedIn === false) return null;
            if(item.name === "LogIn"  &&  isLoggedIn === true) return null;
            if(item.name === "SignUp" && isLoggedIn === true) return null;

            return (
              <li key={index}>
                <Link href={item.link}>
                  <div
                    className={`flex px-2 hover:text-zinc-100  ${
                      "/" + router.asPath.split("/")[1] ===
                      item.link.toLowerCase()
                        ? "font-bold text-white"
                        : "font-semibold text-zinc-300"
                    }`}
                  >
                    <span className="flex-[0.5] p-1 pr-4">{item.icon}</span>
                    <span className="flex-[3]">{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          onClick={() => setToggleMenu(!ToggleMenu)}
          className="bg-zinc-300 opacity-20 flex-1"
        ></div>
      </div>

      <div className="hidden sm:inline fixed left-0 bg-zinc-800 h-full p-4 pl-6 pt-10 z-20 w-60">
        <ul className="flex flex-col gap-6">
          {menulist.map((item, index) => {
            if(item.name === "Logout" && isLoggedIn === false) return null;
            if(item.name === "LogIn" && isLoggedIn === true) return null;
            if(item.name === "SignUp" && isLoggedIn === true) return null;
            return (
              <li key={index}>
                <Link href={item.link}>
                  <div
                    className={`flex px-2 hover:text-zinc-100 cursor-pointer ${
                      "/" + router.asPath.split("/")[1] ===
                      item.link.toLowerCase()
                        ? "font-bold text-white"
                        : "font-semibold text-zinc-300"
                    }`}
                  >
                    <span className="flex-[0.5] p-1 pr-4">{item.icon}</span>
                    <span className="flex-[3]">{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
