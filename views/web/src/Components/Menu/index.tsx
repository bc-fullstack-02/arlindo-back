import { House, User, UsersThree } from "phosphor-react";
import MenuItem from "../MenuItem";

function Menu(){
    return (
        <ul className="pr-2">
            <MenuItem menuTitle="Página Inicial">
                <House size={48} weight="fill" />           
            </MenuItem>

            <MenuItem menuTitle="Perfil">
                <User size={48} weight="fill" />
            </MenuItem>
            
            <MenuItem menuTitle="Amigos">
                <UsersThree size={48} weight="fill" />
            </MenuItem>
        </ul>
    );
}

export default Menu;