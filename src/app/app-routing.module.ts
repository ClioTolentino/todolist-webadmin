import { NgModule, Injectable } from '@angular/core';
import { 
    RouterModule, Routes, Router, CanActivate, 
    ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { WorkbenchComponent } from './ui/workbench/workbench.component';
import { TasksComponent } from './ui/tasks/tasks.component';

const appRoutes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '', 
        component: WorkbenchComponent,
        children: [
            { path: 'tasks', component: TasksComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        )
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
