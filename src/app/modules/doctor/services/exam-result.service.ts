import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';
import { PagedList } from '../../../utils/paged-list';
import { ExamResult } from '../models/exam-result';

@Injectable()
export class ExamResultService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/exam-result';
    }

    getPagedByPatient(patientId: string, page: number, pageSize: number, search: string, filter: string, order: string) : Observable<PagedList<ExamResult>>{
        return this.http
            .get(`${this.apiUrlV1}/paged-by-patient?patientId=${patientId}&page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&order=${order}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}