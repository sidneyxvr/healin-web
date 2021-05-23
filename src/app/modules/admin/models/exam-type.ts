import { Exam } from './exam';

export interface ExamType{
    id: string,
    name: string,
    isActive: boolean,
    examId: string,
    exam: Exam,
}