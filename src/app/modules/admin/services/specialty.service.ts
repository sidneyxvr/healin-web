import { Specialty } from './../models/specialty';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { SelectItem } from './../../../utils/select-item';
import { Exam } from './../../../models/exam';
import { PagedList } from './../../../utils/paged-list';

@Injectable()
export class SpecialtyService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/specialty';
    }

    get() : Observable<SelectItem[]>{
        return this.http
            .get(`${this.apiUrlV1}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Specialty>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${filter}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getById(id: string) : Observable<Specialty>{
        return this.http
            .get(`${this.apiUrlV1}/${id}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    add(specialty: Specialty){
        return this.http.post(`${this.apiUrlV1}`, specialty, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }

    update(specialty: Specialty){
        return this.http.put(`${this.apiUrlV1}`, specialty, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}