import { SelectItem } from './../../../utils/select-item';
import { PagedList } from './../../../utils/paged-list';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { ExamType } from '../models/exam-type';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExamTypeService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/exam-type';
    }

    getByExamId(examId: string) : Observable<SelectItem[]>{
        return this.http
            .get(`${this.apiUrlV1}/exam/${examId}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<ExamType>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getById(id: string) {
        return this.http
            .get(`${this.apiUrlV1}/${id}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    add(examType: ExamType){
        return this.http.post(`${this.apiUrlV1}`, examType, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    update(examType: ExamType){
        return this.http.put(`${this.apiUrlV1}`, examType, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}