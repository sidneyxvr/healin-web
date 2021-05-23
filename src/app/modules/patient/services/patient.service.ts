import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class PatientService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/patient';
    }

    addDoctorToMyDoctors(doctorId: string){
        return this.http
            .post(`${this.apiUrlV1}/doctor`, {id: doctorId}, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    removeDoctorToMyDoctors(doctorId: string){
        return this.http
            .delete(`${this.apiUrlV1}/doctor/${doctorId}`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    updateImage(form: FormData){
        return this.http.put(`${this.apiUrlV1}/image`, form, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}