import { CommonModule } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { signalUpdateFn } from '@angular/core/primitives/signals';
import { RouterOutlet } from '@angular/router';

const EMPTY_WATER_URL = 'https://cdn-icons-png.flaticon.com/512/3100/3100553.png';
const FILLED_WATER_URL = 'https://cdn-icons-png.flaticon.com/512/3100/3100566.png';
const EMPTY_COFFEE_URL = 'https://cdn-icons-png.flaticon.com/512/924/924412.png';
const FILLED_COFFEE_URL = 'https://cdn-icons-png.flaticon.com/512/924/924514.png';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firstApp';
  Drink =  Drink;
  indexes : number[] = [0,1,2,3,4];
  type :WritableSignal<Drink> =signal(Drink.Water);
  quantity :WritableSignal<number> = signal(2);
  emptyImageUrl = computed(() => this.type() === Drink.Water ? EMPTY_WATER_URL : EMPTY_COFFEE_URL);
  filledImageUrl = computed(() => this.type() === Drink.Water ? FILLED_WATER_URL : FILLED_COFFEE_URL);
  message = computed(() => `j'ai bu ${this.quantity()} ${this.type() === Drink.Water ?'verre(s) d/eau':'tasse(s) de (café)'}`);


  decrement() : void {
    this.quantity.update((quantity:number) => quantity ?quantity-1:0);
  }

  increment() : void {
    this.quantity.update((quantity:number) => quantity<this.indexes.length ?quantity+1:this.indexes.length);
  }

}

export enum Drink {
  Water = 'WATTER',
  Coffee = 'COFFEE'
}