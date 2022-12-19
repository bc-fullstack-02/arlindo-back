import { useState, useEffect } from 'react';
import { UserCircle } from "phosphor-react";
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import Button from "../Button";
import Headind from "../Heading";
import Text from "../Text";

function Profiles() {
    const authHeader = getAuthHeader();
    const user = localStorege.getItem("user");

    const [profiles, setProfiles] = useStates([]
        );
    
    useEffect(() => {
        const getProfiles = async () => {
          try {
            const response = await api.get("/profiles", authHeader);
            setProfiles(response.data);
          } catch (err) {
            console.error(err);
          } 
        };

        getProfiles();
    }, []);

    return(
        <div className="basis-5/6">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Amigos
                </Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight="light" className='text-slate-50'></UserCircle>
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <ul>
                {profiles.map(profile => (
                    <li className="border-b border-slate-400 mt-4 pl-5">
                        <div className="flex flex-row items-center ml-5 my-4
                            <UserCircle size={48} weight="light" className="text=slate-50"/>
                            <Text classNme="font-extrabold ml-2">{profile.name}</Text>
                        </div>
                        <footer className='mt-6 flex justify-start gap-4 mb-4'>
                            <button className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 focus: ring-2 ring-white">
                                Seguir
                            </button>
                            <Button type="submit" className="flex-none w-48">
                                Parar de Seguir
                            </Button>
                        </footer>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profiles;