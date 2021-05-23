import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { VaccineDose } from './../models/vaccine-dose';
import { SelectItem } from './../../../utils/select-item';

@Injectable()
export class VaccineDoseService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/vaccine-dose';
    }

    get() : Observable<[string, VaccineDose[]]>{
        return this.http
            .get(`${this.apiUrlV1}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getDoseTypes() : Observable<SelectItem[]>{
        return this.http
            .get(`${this.apiUrlV1}/dose-types`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    add(vaccineDose: VaccineDose){
        return this.http.post(`${this.apiUrlV1}`, vaccineDose, this.getAuthHeaderJson())
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