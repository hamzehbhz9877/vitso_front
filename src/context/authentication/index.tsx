'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Cookie from "universal-cookie";



type UserLoggedIn={fullName:string,roles:Array<string>,avatar:string,userName:string}

export const AuthProvider = createContext({user:null,resetUserCookie:()=>{},setUserCookie:(data)=>{}} as
    {resetUserCookie: ()=>void,setUserCookie:(data:UserLoggedIn)=>void ,user:UserLoggedIn});

type Props = {
    children: ReactNode
}


const Auth = ({children}: Props) => {

    const cookie = new Cookie()


    const router = useRouter();

    const [user, setUser] = useState<any>(null);

    const resetUserCookie = async () => {
        await cookie.remove("user", {path: "/"});
        setUser(null)
        router.push("/");
    };

    const setUserCookie = (data: any) => {
        cookie.set("user", data, {path: "/"});
        setUser(data)
    };

    useEffect(() => {
        setUser(user ? user : cookie.get('user'));
    }, [user]);



    return (
        <AuthProvider.Provider
            value={{
                user,
                resetUserCookie,
                setUserCookie,
            }}
        >
            {children}
        </AuthProvider.Provider>
    );
};

export default Auth;