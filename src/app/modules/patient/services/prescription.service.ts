import { SelectItem } from './../../../utils/select-item';
import { Prescription } from './../models/prescription';
import { ExamResult } from './../models/exam-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { PagedList } from './../../../utils/paged-list';

@Injectable()
export class PrescriptionService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/prescription';
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Prescription>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getPrescriptionTypes() : Observable<SelectItem[]>{
        return this.http
            .get(`${this.apiUrlV1}/prescription-types`, this.getAuthHeaderJson())
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

    add(prescription: FormData){
        return this.http.post(`${this.apiUrlV1}`, prescription, this.getToken())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    update(prescription: Prescription){
        return this.http.put(`${this.apiUrlV1}`, prescription, this.getAuthHeaderJson())
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