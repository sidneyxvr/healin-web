import { Prescription } from './../models/prescription';
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

    getPaged(patientId: string, page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<Prescription>>{
        return this.http
            .get(`${this.apiUrlV1}/paged-by-patient/${patientId}?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}