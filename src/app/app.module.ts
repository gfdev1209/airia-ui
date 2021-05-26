import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemApiService } from '@shared/services/in-mem-api.service';
import { FloorEffects } from '@store/floor/floor.effects';
import { LocationEffects } from '@store/location/location.effects';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { reducers } from './store';
import { AlertEffects } from './store/alert/alert.effects';
import { BuildingEffects } from './store/building/building.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AlertEffects,
      BuildingEffects,
      LocationEffects,
      FloorEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: environment.production,
    }),
    HttpClientInMemoryWebApiModule.forRoot(InMemApiService, {
      delay: 500,
      passThruUnknownUrl: true,
    }),
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
    }),
  ],
  exports: [NgxMapboxGLModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
