import Cookies from "cookies";

export default async function handler(req, res) {
  Cookies(req, res).set("isLoggedIn", "", {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
    Cookies(req, res).set("access_token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });
    res.redirect("/auth/login");
  }