import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";


import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';

import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import {  FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { environment } from 'src/environments/environment';

import { UserGuard } from './services/user.guard';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    AboutComponent,
    HistoryComponent,
    PieChartComponent,
    ScatterPlotComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'signUp', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'history', component: HistoryComponent, canActivate: [UserGuard], pathMatch: 'full' },
      { path: '', component: HomeComponent, canActivate: [UserGuard], pathMatch: 'full' },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
