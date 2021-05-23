export interface User{
    id: string;
    name: string;
    document: string;
    email: string;
    gender: any;
    phone: string;
    birthDate: Date;
    profile: Profile;
    crm: string;
    password: string;
}

export enum Gender {
    Male = 1,
    Female = 2
}

export enum Profile {
    Patient = 1,
    Doctor = 2
}