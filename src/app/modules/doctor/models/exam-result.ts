export interface ExamResult{
    id: string,
    description: string,
    examTypes: ExamType[],
    exam: string,
    filePath: string,
    examDate: Date,
}

export interface ExamType{
    value: string,
    text: string,
}