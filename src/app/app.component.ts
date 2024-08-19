import { CommonModule } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const EMPTY_WATER_URL = 'https://cdn-icons-png.flaticon.com/512/3100/3100553.png';
const FILLED_WATER_URL = 'https://cdn-icons-png.flaticon.com/512/3100/3100566.png';
const EMPTY_COFFEE_URL = 'https://cdn-icons-png.flaticon.com/512/924/924412.png';
const FILLED_COFFEE_URL = 'https://cdn-icons-png.flaticon.com/512/924/924514.png';

interface DrinkData {
  coffee: number;
  water: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Drink Tracker';

  Drink = Drink;
  indexes: number[] = [0, 1, 2, 3, 4];

  // Signals
  selectedDrink: WritableSignal<Drink> = signal(Drink.Water);
  drinkData: WritableSignal<DrinkData> = signal({ water: 0, coffee: 0 });

  // Computed signals for dynamic image URLs and message
  emptyImageUrl = computed(() => this.selectedDrink() === Drink.Water ? EMPTY_WATER_URL : EMPTY_COFFEE_URL);
  filledImageUrl = computed(() => this.selectedDrink() === Drink.Water ? FILLED_WATER_URL : FILLED_COFFEE_URL);

  message = computed(() => 
    `J'ai bu ${this.drinkData()[this.selectedDrink()]} ${this.selectedDrink() === Drink.Water ? 'verre(s) d\'eau' : 'tasse(s) de café'}`
  );

  // Change selected drink type and reset the quantity
  onDrinkSelection(selectedDrink: Drink): void {
    this.selectedDrink.set(selectedDrink);
  }

  // Decrement drink count
  decrement(): void {
    this.updateDrinkQuantity(-1);
  }

  // Increment drink count
  increment(): void {
    this.updateDrinkQuantity(1);
  }

  // Helper function to update drink quantity based on type
  private updateDrinkQuantity(amount: number): void {
    this.drinkData.update((data: DrinkData) => {
      const currentDrink = this.selectedDrink();
      const newValue = Math.max(0, data[currentDrink] + amount);
      return { ...data, [currentDrink]: newValue };
    });
  }
}

export enum Drink {
  Water = 'water',
  Coffee = 'coffee'
}
