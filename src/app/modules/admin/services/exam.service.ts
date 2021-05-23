import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { SelectItem } from './../../../utils/select-item';
import { Exam } from './../../../models/exam';
import { PagedList } from './../../../utils/paged-list';

@Injectable()
export class ExamService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/exam';
    }

    get() : Observable<SelectItem[]>{
        return this.http
            .get(`${this.apiUrlV1}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Exam>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${filter}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
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

    add(exam: Exam){
        return this.http.post(`${this.apiUrlV1}`, exam, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    update(exam: Exam){
        return this.http.put(`${this.apiUrlV1}`, exam, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}