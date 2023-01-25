import ComplaintSVG from "../../assets/icons/complaints.svg";
import HomeSVG from "../../assets/icons/home.svg";
import LoginSVG from "../../assets/icons/login.svg";
import LogoutSVG from "../../assets/icons/logout.svg";
import SignupSVG from "../../assets/icons/signup.svg";

const menulist = [
  {
    name: "Home",
    link: "/",
    icon: <HomeSVG className="fill-current" />,
  },
  {
    name: "Complaints",
    link: "/complaints",
    icon: <ComplaintSVG className="fill-current w-5 h-5" />,
  },
  {
    name: "LogIn",
    link: "/auth/login",
    icon: <LoginSVG className="fill-current w-5 h-5" />,
  },
  {
    name: "SignUp",
    link: "/auth/signup",
    icon: <SignupSVG className="fill-current w-5 h-5" />,
  },
  {
    name: "Logout",
    link: "/api/logout",
    icon: <LogoutSVG className="fill-current" />,
  },
];

export default menulist;
