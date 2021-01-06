import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { RegionsComponent } from './components/regions/regions.component';
import { CountryComponent } from './components/country/country.component';
import { environment } from '../environments/environment';
import { AppEffects } from './state+/app.effects';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { reducer } from './state+/app.reducer';
import { ArrayPipe } from './pipes/array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegionsComponent,
    CountryComponent,
    DropdownComponent,
    ArrayPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ app: reducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
