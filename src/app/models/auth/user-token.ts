import { Claim } from "./claim";

export interface UserToken{
    Id: string;
    Email: string;
    UserClaims: Claim[]
}