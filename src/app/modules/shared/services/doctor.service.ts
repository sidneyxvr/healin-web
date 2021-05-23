import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Address } from '../models/address';

@Injectable()
export class DoctorService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/doctor';
    }

    updateAddress(address: Address){
        return this.http
            .put(`${this.apiUrlV1}/address`, address, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    update(formData: FormData){
        return this.http
            .put(`${this.apiUrlV1}`, formData, this.getToken())
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