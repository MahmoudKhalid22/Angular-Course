import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent],
})
export class UserPlacesComponent implements OnInit {
  placeService = inject(PlacesService);
  favoritePlaces = this.placeService.loadedUserPlaces;
  isFetching = signal(false);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.placeService.loadUserPlaces().subscribe({
      error: (err: Error) => {
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  onDeletePlace(place: Place) {
    const subscription = this.placeService.removeUserPlace(place).subscribe();
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
