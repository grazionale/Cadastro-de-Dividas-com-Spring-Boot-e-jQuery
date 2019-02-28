import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  usuarios = [];
  @Output() debitoAdicionado = new EventEmitter();

  constructor(private usuarioService: UsuarioService, private http: HttpClient) { }
  ngOnInit() {
    this.usuarioService.consultarUsuarios()
      .then(usuarios => {
        // console.log(usuarios);
        this.usuarios = usuarios;
      });
  }

  salvarDebito(divida: any): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/debitos', '{"motivo":"sdafads","id_usuario":"5","data":"2019-02-22","valor":"123123"}', { headers})
      .toPromise()
      .then(response => {
        this.debitoAdicionado.emit(response);
        return response;
      });
  }

}
