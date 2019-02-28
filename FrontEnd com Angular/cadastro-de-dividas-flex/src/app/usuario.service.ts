import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  consultarUsuarios(): Promise<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
    .toPromise()
    .then(response => {
      return response;
    });
  }

  consultarNomeUsuarioById(divida: any): Promise<any>{
    // console.log(divida);
    for( var i = 0 ; i < divida.length ; i++ ){
      return this.http.get('https://jsonplaceholder.typicode.com/users/' + divida[i].id)
      .toPromise()
      .then(response => {
        console.log(response['name']);
        // console.log(divida);
        divida[i]['nome_usuario'] = response['name'];
        return divida;
      });
    }

  }
}
