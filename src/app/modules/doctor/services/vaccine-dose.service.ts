import { VaccineDose } from '../models/vaccine-dose';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class VaccineDoseService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/vaccine-dose/patient';
    }

    getByPatientId(patientId: string) : Observable<[string, VaccineDose[]]>{
        return this.http
            .get(`${this.apiUrlV1}/${patientId}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}