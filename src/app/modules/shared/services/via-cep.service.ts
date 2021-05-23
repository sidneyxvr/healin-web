import { AddressReponse } from './../models/address-response';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class ViaCepService extends BaseService{
    constructor(private http: HttpClient){
        super();
    }

    getAddress(postalCode: string) : Observable<AddressReponse>{
        return this.http
            .get(`https://viacep.com.br/ws/${postalCode}/json/`)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}