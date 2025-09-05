import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces(): any {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong while fetching available places.'
    );
  }

  loadUserPlaces(): any {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong while fetching user places.'
    ).pipe(
      tap((places: Place[]) => {
        this.userPlaces.set(places as Place[]);
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        tap(() => {
          const prevPlaces = this.userPlaces();
          if (!prevPlaces.some((p) => p.id === place.id)) {
            this.userPlaces.update((places) => [...places, place]);
          }
        }),
        catchError((error) => {
          this.errorService.showError(
            'Something went wrong while adding place to user places.'
          );
          return throwError(
            () =>
              new Error(
                'Something went wrong while adding place to user places.'
              )
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        tap(() => {
          this.userPlaces.update((places) =>
            places.filter((p) => p.id !== place.id)
          );
        }),
        catchError((error) => {
          this.errorService.showError(
            'Something went wrong while removing place from user places.'
          );
          return throwError(
            () =>
              new Error(
                'Something went wrong while removing place from user places.'
              )
          );
        })
      );
  }

  private fetchPlaces(url: string, errorMsg: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
