import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
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
    try {
      this.beerService
        .getBeers()
        .pipe(catchError(() => of([{ name: 'my default data' }])))
        .subscribe((beers) => {
          console.log(beers);
          this.beers = beers;
          this.title = beers[0].name;
        });
    } catch (err) {
      this.title = 'Us a error';
    }
  }
}
