export interface UserInfo {    
    _id: string;
    name: string;
    user: string;
    following: UserInfo[];
}