import { ReactNode } from "react";
import { Slot } from '@radix-ui/react-slot';
import Text from "../Text";

interface MenuItemProps {
    menuTitle: string;
    children?: ReactNode;
    action?: () => void;
    active?: boolean;
}

function MenuItem(props: MenuItemProps) {
    
    function action() {
        if(props.action) props.action();
    }

    function getClass() {
        if(props.active) {
            return "flex items-center px-4 py-2 bg-sky-400 rounded-full ml-2";
        }

        return "flex items-center px-4 py-2 hover:bg-sky-400 rounded-full ml-2";
    }

    return (
        <li className="mt-5 cursor-pointer" onClick={action}>
            <div className={getClass()}>
                <Slot className="text-slate-50">{props.children}</Slot>
                <Text className="font=extrabold ml-4">{props.menuTitle}</Text>
            </div>
        </li>
    );
}

export default MenuItem;