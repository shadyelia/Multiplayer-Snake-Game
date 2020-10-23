import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Controls } from '../../enums/Control'
import { GameLogicService } from '../../servers/game-logic.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss']
})
export class MainGameComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  @ViewChild('gameCanvas') gameCanvasRef: ElementRef;

  private gameCanvas: HTMLCanvasElement;
  gameCtx: CanvasRenderingContext2D;

  gameStarted: boolean = false;

  gameCode: string;

  private snake = {
    direction: Controls.LEFT,
    parts: [
      {
        x: -1,
        y: -1
      }
    ]
  };

  constructor(public gls: GameLogicService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.add(
      this.activatedRouter.params.subscribe((params) => {
        this.gameCode = params["gameCode"];
      })
    );
  }

  ngAfterViewInit() {
    this.gameCanvas = this.gameCanvasRef.nativeElement;
    this.gameCtx = this.gameCanvas.getContext('2d');
    this.gameCanvas.focus();
    this.gls.initializeGame();
  }


  keyWasPressed(e: KeyboardEvent) {

    if (e.key === Controls.LEFT && this.snake.direction !== Controls.RIGHT) {
      this.gls.keyPress(Controls.LEFT);
    } else if (e.key === Controls.UP && this.snake.direction !== Controls.DOWN) {
      this.gls.keyPress(Controls.UP);
    } else if (e.key === Controls.RIGHT && this.snake.direction !== Controls.LEFT) {
      this.gls.keyPress(Controls.RIGHT);
    } else if (e.key === Controls.DOWN && this.snake.direction !== Controls.UP) {
      this.gls.keyPress(Controls.DOWN);
    }
    this.gls.keyPress(e.key);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
