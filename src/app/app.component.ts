import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BeerService } from './beer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my first beer';
  beers = [];
  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService
      .getBeers()
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe({
        next: (beers) => {
          console.log(beers);
          this.beers = beers;
          this.title = beers[0].name;
        },
      });
  }
}
