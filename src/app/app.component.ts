import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CardapioComponent } from "./components/cardapio/cardapio.component";
import { FooterComponent } from "./components/footer/footer.component";
import { InicioComponent } from "./components/inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CardapioComponent, FooterComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cardapioDigital';
}
