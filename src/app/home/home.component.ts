import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <mat-card>
      <div id="home"></div>
    </mat-card>
  `,
  styles: [`
    #home {
      width: 100%;
      height: 90vh;
      background: url('https://images.pexels.com/photos/7067/notes-clean-hero-minimal.jpg?w=1280&h=853/');
      background-repeat: no-repeat;
      background-position: center top;
      background-size: contain;
    }
  `]
})
export class HomeComponent { }
