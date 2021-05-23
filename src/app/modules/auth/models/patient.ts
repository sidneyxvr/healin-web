import { Gender } from './gender';

export interface Patient{
    name: string,
    cpf: string,
    email: string,
    gender: Gender,
    phone: string,
    birthDate: Date,
    password: string,
}