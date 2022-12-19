import { useEffect, useState } from "react";
import { UserInfo } from "../models/UserInfo";

export function useUserInfo() {
    const [user, setUser] = useState<UserInfo>({} as UserInfo);

    function loadUser() {
        const jsonString = localStorage.getItem("userInfo");

        if(!jsonString) {   
            console.log("USUÁRIO INVÁLIDO!");
            return;
        }
        
        const userJSON = JSON.parse(jsonString);

        setUser(userJSON);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return user;
}