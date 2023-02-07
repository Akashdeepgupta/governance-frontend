import Link from "next/link";
import React from "react";
import Menu from "../../assets/icons/menu.svg";
import menulist from "./menulist";

import { useRouter } from "next/router";
function Navbar({token}) {
  const [ToggleMenu, setToggleMenu] = React.useState(true);
  const router = useRouter();
  const[toShow,setToShow]=React.useState(false);
  React.useEffect(()=>{
    if(token){
      setToShow(true);
    }
  },[token])

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
        className={`sm:hidden  fixed flex ${
          ToggleMenu
            ? "-left-[1200px] ease-in duration-300"
            : "left-0 ease-out duration-300"
        } h-full w-full tran`}
      >
        <ul className="flex-1 flex flex-col gap-6 p-4 pl-6 pt-10 bg-zinc-800">
          {menulist.map((item, index) => {
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

      <div className="hidden sm:inline fixed left-0 bg-zinc-800 h-full p-4 pl-6 pt-10 w-60">
        <ul className="flex flex-col gap-6">
          {menulist.map((item, index) => {
            console.log(token);
            console.log(item.name);
            if(token && item.name === "LogIn") return null;
            if(token && item.name === "SignUp") return null;
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

export default Navbar;

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.access_token || null;
  console.log("andar wala maal",token);
  return {
    props: { token: token },
  };
}