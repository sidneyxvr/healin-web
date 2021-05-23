import { Gender } from './gender';

export interface User{
    email: string,
    name: string,
    cpf: string,
    birthDate: Date,
    gender: Gender,
    genderDescription: string,
}