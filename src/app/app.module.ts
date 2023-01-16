import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { ConverterComponent } from './converter/converter.component';
import { PreloaderComponent } from "./preloader/preloader.component";

@NgModule({
    declarations: [
        AppComponent,
        PreloaderComponent,
        HeadComponent,
        ConverterComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ]
})
export class AppModule { }
