import { UserToken } from "./user-token";

export interface LoginResponse{
    AccessToken: string;
    ExpiresIn: number;
    UserToken: UserToken;
}