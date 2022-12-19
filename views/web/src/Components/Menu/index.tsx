import { House, User, UsersThree, ArrowLeft, UserCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../models/UserInfo";
import MenuItem from "../MenuItem";

export interface MenuProps {
    loggedUser: UserInfo;
    currentPage: 'feed' | 'profile' | 'friends';
    changePage: (page: 'feed' | 'profile' | 'friends') => void
}

function Menu({ loggedUser, changePage, currentPage }: MenuProps){

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");

        navigate("/");
    }

    return (
        <ul className="pr-2">
            <MenuItem active={currentPage == 'feed'} menuTitle="Página Inicial" action={() => changePage('feed')}>
                <House size={48} weight="fill" />           
            </MenuItem>

            <MenuItem active={currentPage == 'profile'} menuTitle="Perfil" action={() => changePage('profile')}>
                <User size={48} weight="fill" />
            </MenuItem>
            
            <MenuItem active={currentPage == 'friends'} menuTitle="Amigos" action={() => changePage('friends')}>
                <UsersThree size={48} weight="fill" />
            </MenuItem>

            <MenuItem menuTitle="Sair" action={logout}>
                <ArrowLeft size={48} weight="fill" />
            </MenuItem>
        </ul>
    );
}

export default Menu;