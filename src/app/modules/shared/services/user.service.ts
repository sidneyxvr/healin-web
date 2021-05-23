import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseService{
    constructor(private http: HttpClient){
        super();

        this.apiUrlV1 = this.apiUrlV1 + '/auth';
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