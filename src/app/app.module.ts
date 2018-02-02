import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { WorkbenchComponent } from './ui/workbench/workbench.component';
import { TasksComponent } from './ui/tasks/tasks.component';

import { CheckboxWidget, SwitchWidget } from './ui/widgets/checkbox.widget';

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        WorkbenchComponent,
        TasksComponent,
        CheckboxWidget,
        SwitchWidget
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
