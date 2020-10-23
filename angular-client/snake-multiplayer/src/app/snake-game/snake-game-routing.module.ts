import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { MainGameComponent } from './components/main-game/main-game.component';

const routes: Routes = [
    {
        path: "",
        component: CreateGameComponent,
    },
    {
        path: "snake",
        component: CreateGameComponent,
    },
    {
        path: "game/:gameCode",
        component: MainGameComponent,
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SnakeGameRoutingModule { }
