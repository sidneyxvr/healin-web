export interface User{
    id: string,
    email: string,
    name: string,
    cpf: string,
    birthDate: Date,
    gender: Gender,
    phone: string,
    crm: string,
    susNumber: string,
    imagePath: string,
    imageUpload: string,
    imageName: string,
}

export enum Gender{
    male = 1,
    female,
}