import { Component, OnInit, Input } from '@angular/core';
import { Divida } from '../divida';
import { DividaService } from '../divida.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-dividas-cadastradas',
  templateUrl: './dividas-cadastradas.component.html',
  styleUrls: ['./dividas-cadastradas.component.css']
})
export class DividasCadastradasComponent implements OnInit {
  dividas = [];
  usuarios = [];
  @Input() divs: any;

  constructor(private dividaService: DividaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    alert('123');
    this.dividaService.consultarDividas()
      .then(debitos => {
        this.dividas = debitos;

        this.usuarioService.consultarUsuarios().then(usuarios => {
          this.dividas.forEach(d => {
            d.nome_usuario = usuarios.find(item => item.id === d.id_usuario).name;
          });
        });
      });
  }

}
