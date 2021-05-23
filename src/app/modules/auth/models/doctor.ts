import { Gender } from './gender';

export interface Doctor{
    name: string,
    cpf: string,
    email: string,
    gender: Gender,
    phone: string,
    birthDate: Date,
    crm: string,
    password: string,
}