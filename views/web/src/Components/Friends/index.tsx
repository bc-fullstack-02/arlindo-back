import { UserCircle } from "phosphor-react";
import { UserInfo } from "../../models/UserInfo";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";

export interface FriendsProps {
    friends: UserInfo[];
    loggedUser: UserInfo;
    handleFollow: (user: UserInfo) => void
}

export function Friends({ friends, loggedUser, handleFollow }: FriendsProps) {

    function userFollower(userInfo: UserInfo) {
        const userFind = loggedUser.following.find(friend => friend._id == userInfo._id);

        return userFind != null;
    }

    function getStyle(userInfo: UserInfo) {
        return userFollower(userInfo) 
            ? "m-3 py-3 px-4 bg-red-500 rounded font-semibold text-black text-sm w-40 transition-colors hover:bg-red-300 focus:ring-2 ring-white"
            : "m-3 py-3 px-4 bg-cyan-500 rounded font-semibold text-black text-sm w-40 transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
    }

    function getLabel(userInfo: UserInfo) {
        return userFollower(userInfo)
            ? 'Parar de seguir'
            : 'Seguir';
    }

    return (
        <div>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Amigos
                </Text>
            </Heading>

            <section>
            {friends &&
             friends.map((friend: UserInfo) => (
                 <div className="border-b border-slate-400" key={friend._id}>
                     <div className="flex flex-row items-center ml-5 my-4">
                         <UserCircle size={48} weight="light" className='text-slate-50'></UserCircle>
                         <Text className="font-extrabold ml-2">{friend.name}</Text>
                     </div>
                     <button onClick={() => handleFollow(friend)} className={getStyle(friend)}>
                        {  getLabel(friend) }                                
                    </button>
                </div>
            ))}           
        </section>
        </div>
    )
}