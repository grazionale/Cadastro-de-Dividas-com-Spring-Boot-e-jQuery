import { Component, OnInit } from '@angular/core';
import { Divida } from '../divida';
import { DividaService } from '../divida.service';
import {UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-dividas-cadastradas',
  templateUrl: './dividas-cadastradas.component.html',
  styleUrls: ['./dividas-cadastradas.component.css']
})
export class DividasCadastradasComponent implements OnInit {
  dividas = [];
  usuarios = [];

  constructor(private dividaService: DividaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.dividaService.consultarDividas()
      .then(debitos => {
        //console.log(debitos);
        this.dividas = debitos;
        
        for(var i = 0; i < this.dividas.length ; i++){
          //console.log(this.dividas[i]);
          this.usuarioService.consultarNomeUsuarioById(this.dividas)
          .then(usuario => {
            this.usuarios = usuario;
            console.log(usuario);
            //console.log(this.usuarios);
            
          });
        }

      });

    



  }

  

}
