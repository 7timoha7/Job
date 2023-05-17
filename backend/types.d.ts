export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string | null;
    avatar?: string | null;
}


export interface educationType {
    name: string;
    number: number;
}

