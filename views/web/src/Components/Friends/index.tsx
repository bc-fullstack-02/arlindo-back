import { UserCircle } from "phosphor-react";
import { UserInfo } from "../../models/UserInfo";
import Heading from "../Heading";
import Text from "../Text";

export interface FriendsProps {
    friends: UserInfo[];
    loggedUser: UserInfo;
}

export function Friends({ friends, loggedUser }: FriendsProps) {

    function userFollower(userInfo: UserInfo) {
        const userFind = loggedUser.following.find(friend => friend._id == userInfo._id);

        return userFind != null;
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
                     { userFollower(friend) 
                        ? <button>Parar de seguir</button>
                        : <button>Seguir</button> }
                </div>
            ))}           
        </section>
        </div>
    )
}