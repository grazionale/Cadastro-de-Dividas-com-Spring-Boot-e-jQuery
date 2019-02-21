import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  usuarios = [];
  

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.consultarUsuarios()
      .then(usuarios => {
        //console.log(usuarios);
        this.usuarios = usuarios;
      })
  }

}
