import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  keyPress(key: string) {
    // emit key to  the socket 
  }

  initializeGame() { }
}
