import { SelectItem } from './../../../utils/select-item';

export interface ExamResult{
    id: string,
    description: string,
    examDate: Date,
    examId: string,
    exam: SelectItem,
    filePath: string,
    examTypes: SelectItem[],
    examTypeIds: string[],
}