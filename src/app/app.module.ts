import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { WorkbenchComponent } from './ui/workbench/workbench.component';
import { TasksComponent } from './ui/tasks/tasks.component';

import { CheckboxWidget, SwitchWidget } from './ui/widgets/checkbox.widget';

import { TasksDbService } from './services/tasks-db.service';

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
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        TasksDbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
