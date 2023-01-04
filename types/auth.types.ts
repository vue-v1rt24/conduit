export interface IRegisterTypes {
    username?: string;
    email: string;
    password: string;
}

export interface IUserResponseTypes {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
}

export type IUserUpdate = Omit<IUserResponseTypes, 'token'> & { password: string }

export type TypeUserProfile = Omit<IUserResponseTypes, 'token'>