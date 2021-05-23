import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';
import { PagedList } from './../../../utils/paged-list';
import { Patient } from '../models/patient';

@Injectable()
export class PatientService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/patient';
    }

    getPaged(page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Patient>>{
        return this.http
            .get(`${this.apiUrlV1}/paged?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getById(id: string) : Observable<Patient>{
        return this.http
            .get(`${this.apiUrlV1}/${id}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}