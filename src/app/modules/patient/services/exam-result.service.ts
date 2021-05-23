import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ExamResult } from './../models/exam-result';
import { BaseService } from 'src/app/services/base.service';
import { PagedList } from './../../../utils/paged-list';

@Injectable()
export class ExamResultService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/exam-result';
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<ExamResult>>{
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

    add(examResult: FormData){
        return this.http.post(`${this.apiUrlV1}`, examResult, this.getToken())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    update(examResult: ExamResult){
        return this.http.put(`${this.apiUrlV1}`, examResult, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    delete(id: string){
        return this.http.delete(`${this.apiUrlV1}/${id}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}