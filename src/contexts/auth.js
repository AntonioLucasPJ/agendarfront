import { createContext, useState } from "react";

export const AuthContext = createContext({});
export function AuthProvider(props){
    const [user,setuser] = useState({});

    return (
        <AuthContext value={{user,setuser}}>{props.children}</AuthContext>
    )
}