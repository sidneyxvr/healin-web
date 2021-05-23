import { UpdatePassword } from './../models/update-password';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Login } from 'src/app/models/auth/login';
import { UserToken } from './../../../models/auth/user-token';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { User } from '../models/user';

@Injectable()
export class AuthService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/auth';
    }

    login(login: Login) : Observable<UserToken>{
        return this.http
            .post(`${this.apiUrlV1}`, login, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    registerDoctor(doctor: Doctor) {
        return this.http
            .post(`${this.apiUrlV1}/doctor`, doctor, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    registerPatient(patient: Patient) {
        return this.http
            .post(`${this.apiUrlV1}/patient`, patient, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    changePassword(updatePassword: UpdatePassword){
        return this.http
        .put(`${this.apiUrlV1}/password`, updatePassword, this.getAuthHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }

    deactivateAccount(){
        return this.http
        .put(`${this.apiUrlV1}/deactivate`, {}, this.getAuthHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }

    getUserInfo() : Observable<User>{
        return this.http
        .get(`${this.apiUrlV1}/info`, this.getAuthHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }
}