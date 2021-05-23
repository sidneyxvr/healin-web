import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Address } from '../models/address';
import { User } from '../models/user';

@Injectable()
export class PatientService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/patient';
    }

    update(formData: FormData){
        return this.http
            .put(`${this.apiUrlV1}`, formData, this.getToken())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    updateAddress(address: Address){
        return this.http
            .put(`${this.apiUrlV1}/address`, address, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getAddress(){
        return this.http
            .get(`${this.apiUrlV1}/address`, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    updateImage(form: FormData){
        return this.http.put(`${this.apiUrlV1}/image`, form, this.getToken())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            )
    }
}