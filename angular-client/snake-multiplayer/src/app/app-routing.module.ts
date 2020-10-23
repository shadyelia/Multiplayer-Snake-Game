import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./snake-game/snake-game.module").then(
        (m) => m.SnakeGameModule
      ),
  },
  {
    path: "snake",
    loadChildren: () =>
      import("./snake-game/snake-game.module").then(
        (m) => m.SnakeGameModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
