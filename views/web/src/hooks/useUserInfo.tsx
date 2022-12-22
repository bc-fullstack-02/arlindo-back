import { useEffect, useState } from "react";
import { UserInfo } from "../models/UserInfo";

type UpdateUserFunction = (userInfo: Partial<UserInfo>) => void;

export function useUserInfo(): [ UserInfo, UpdateUserFunction ] {
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

    function updateUser(userInfo: Partial<UserInfo>) {
        Object.assign(user, userInfo)
        localStorage.setItem("userInfo", JSON.stringify(user))
        setUser(user);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return [user, updateUser];
}