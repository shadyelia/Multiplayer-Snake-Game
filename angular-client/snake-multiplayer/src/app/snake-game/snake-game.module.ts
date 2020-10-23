import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { MainGameComponent } from './components/main-game/main-game.component';
import { SnakeGameRoutingModule } from './snake-game-routing.module';



@NgModule({
  declarations: [CreateGameComponent, MainGameComponent],
  imports: [
    CommonModule,
    SnakeGameRoutingModule
  ]
})
export class SnakeGameModule { }
