import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  places = signal<Place[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal<string | null>(null);
  placeService = inject(PlacesService);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadAvailablePlaces().subscribe({
      next: (places: Place[]) => {
        // console.log(places);

        this.places.set(places as Place[]);
      },
      error: (err: Error) => {
        console.error(err);
        this.isFetching.set(false);
        this.error.set('Something went wrong!');
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    this.placeService.addPlaceToUserPlaces(place).subscribe({
      next: () => {
        console.log('Place added to user places.');
      },
      error: (err: Error) => {
        console.error(err);
        this.error.set('Something went wrong!');
      },
      complete: () => {
        console.log('Place added to user places.');
      },
    });
  }
}
