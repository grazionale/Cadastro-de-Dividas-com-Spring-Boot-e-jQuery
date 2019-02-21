import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';
import { FormularioComponent } from './formulario/formulario.component';
import { DividasCadastradasComponent } from './dividas-cadastradas/dividas-cadastradas.component';
import { DividaService } from './divida.service';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    DividasCadastradasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DividaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
