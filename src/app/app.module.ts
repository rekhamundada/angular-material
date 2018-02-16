import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout'; import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';


const routes: Routes = [
  {path: 'contactmanager', loadChildren:  './contactmanager/contactmanager.module#ContactmanagerModule'},
  {path: 'demo', loadChildren:  './demo/demo.module#DemoModule'},
  {path: '**' , redirectTo: 'contactmanager'}

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
