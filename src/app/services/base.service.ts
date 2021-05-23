import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export abstract class BaseService {
    protected apiUrlV1: string = environment.apiUrlV1;
    public localStorage = new LocalStorageUtils();

    protected getHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected getAuthHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorage.obterTokenUsuario()}`,
            })
        }
    }

    protected getToken(){
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.localStorage.obterTokenUsuario()}`,
            })
        }
    }

    protected extractData(response: any){
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}
        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
            
            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly                
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        return throwError(response);
    }
}