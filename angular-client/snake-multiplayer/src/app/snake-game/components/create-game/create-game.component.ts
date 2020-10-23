import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  gameCode: string = "121S";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createGame() {
    this.router.navigateByUrl("/game/" + this.gameCode);
  }
}
