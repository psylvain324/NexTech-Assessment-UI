import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reset } from './metareducer/reset.reducer';
import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';
import { ApplicationState } from './state/application.state';
import { screenReducer } from './reducers/screen.reducer';

export const reducerToken = new InjectionToken<
  ActionReducerMap<ApplicationState>
>('Reducers');

export const rootReducer = {
  // Register screen reducer
  screen: screenReducer,
};

export function getReducers(): any {
  return rootReducer;
}

export const reducerProvider = [
  {
    provide: reducerToken,
    useFactory: getReducers,
  },
];

export const metaReducers: MetaReducer<
  ApplicationState
>[] = environment.production ? [reset] : [reset];

export function getMetaReducers(): MetaReducer<ApplicationState>[] {
  return metaReducers;
}
