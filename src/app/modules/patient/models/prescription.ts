import { SelectItem } from './../../../utils/select-item';

export interface Prescription{
    id: string,
    description: string,
    prescriptionDate: Date,
    specialtyId: string,
    specialty: SelectItem,
    filePath: string,
    prescriptionType: number,
    prescriptionTypeDescription: string,
}