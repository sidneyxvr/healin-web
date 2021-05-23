import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { PagedList } from './../../../utils/paged-list';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/doctor';
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Doctor>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getPagedByPatientId(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Doctor>>{
        return this.http
            .get(`${this.apiUrlV1}/paged-by-patient?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}