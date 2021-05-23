export class LocalStorageUtils{

    public getUser(){
        return JSON.parse(localStorage.getItem('healin.user'));
    }

    public saveLocalUser(response: any){
        this.saveToken(response.accessToken);
        this.saveUser(JSON.stringify(response.userToken));
    }

    public limparDadosLocaisUsuario(){
        localStorage.removeItem('healin.token');
        localStorage.removeItem('healin.user');
    }

    public obterTokenUsuario(): string{
        return localStorage.getItem('healin.token');
    }

    public saveToken(token: string){
        localStorage.setItem('healin.token', token);
    }

    public saveUser(user: string){
        localStorage.setItem('healin.user', user);
    }
}