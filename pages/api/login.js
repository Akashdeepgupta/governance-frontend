import axios from "axios";
import Cookies from "cookies";
import BACKEND_URL from "../../utils/index"

export default async function login(req,res) {
    const{username,password,otp} = req.body;
    const response = await axios({
        method: 'post',
        url: `${BACKEND_URL}authority/auth/token`,
        data: `username=${username}&password=${password+otp}`,
        headers: {
            accept: "application/json",
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => {
        console.log(res)
        return res
    }).catch((err) => {
        console.log(err.response)
        return err.response
    })

    if(response.status === 200){
       Cookies(req, res).set("access_token", response.data.access_token, { 
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 1000 * 60 * 30, // 30 minutes
        });
        res.status(200).json({
            ...response.data
        })
    }else{
        res.status(401).json({
            message: "Invalid username or password"
        })
    }
}