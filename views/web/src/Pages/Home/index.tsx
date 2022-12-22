import { useEffect, useState } from 'react';
import CreatePostButton from "../../Components/CreatePostButton";
import CreatePostDialog from "../../Components/CreatePostDialog";
import Feed from '../../Components/Feed';

import * as Dialog from "@radix-ui/react-dialog";
import Menu from "../../Components/Menu";
import Text from "../../Components/Text";

import logo_menu from "../../assets/logo_menu.svg";
import { Slot } from '@radix-ui/react-slot';
import { UserCircle } from 'phosphor-react';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Post } from '../../models/Post';
import api from '../../services/api';
import { Friends } from '../../Components/Friends';
import { Profile } from '../../Components/Profile';
import { UserInfo } from '../../models/UserInfo';
import { useNavigate } from 'react-router-dom';

function Home () {
    const [user, updateUser] = useUserInfo();
    const token = localStorage.getItem("accessToken");

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [friends, setFriends] = useState<UserInfo[]>([]);
    const [page, setPage] = useState<'feed' | 'friends' | 'profile'>('feed');

    async function getPosts() {
        const response = await api.get("/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setPosts(response.data.reverse());
    }

    async function getFriends() {
        const response = await api.get("/all/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setFriends(response.data);
    }

    useEffect(() => {
        if(user == null && token == null) navigate("/")

        getPosts();
        getFriends();
    }, []);

    async function handleLike(post: Post) {
        const response = await api.post(`/${post._id}/likes`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const postChanged = response.data;
        const postIndex = posts.indexOf(post);
        const postsModified = [...posts];
        postsModified[postIndex] = postChanged;

        setPosts(postsModified);
    }

    async function handleFollow(user: UserInfo) {
        const response = await api.post(`/${user._id}/follow`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { following } = response.data;
        
        updateUser({ following });
        setFriends((prev) => [ ...prev ]);
    }

    function closeDialog(newPost: Post) {
        setOpen(false);
        setPosts((posts) => [newPost, ...posts]);
    }
    
    function changePage(newPage: 'feed' | 'profile' | 'friends') {
        if(page == newPage) return;

        setPage(newPage);
    }

    function getCurrentPage() {
        switch(page) {
            case 'feed':
                return <Feed loggedUser={user} posts={posts} handleLike={handleLike} />;
            case 'friends':
                return <Friends loggedUser={user} friends={friends} handleFollow={handleFollow} />;
            case 'profile':
                return <Profile />;
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4">
                <div className="flex items-center ml-4">
                    <img src={logo_menu} alt="Logo" />                
                    <Text className="font-extrabold ml-4">Parrot</Text>
                </div>
                <Menu changePage={changePage}  loggedUser={user} currentPage={page}/>
                    <div className="flex flex-col items-center ml-4">
                        <Dialog.Root open={open} onOpenChange ={setOpen}>
                            <CreatePostButton />
                            <CreatePostDialog closeDialog={closeDialog} />
                        </Dialog.Root>
                    </div>
                </div>     
            <div className="basis-5/6 overflow-y-auto scroll-smooth">
            
            <div className="flex items-center px-4 m-2">
                <Slot className="text-slate-50">
                    <UserCircle size={48} weight="fill" />      
                </Slot>
                <Text className="font=extrabold ml-4">{user.name}</Text>
            </div>
                {getCurrentPage()}
            </div>
        </div>
    );
}

export default Home;
