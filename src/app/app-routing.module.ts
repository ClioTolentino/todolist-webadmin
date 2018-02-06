import { NgModule, Injectable } from '@angular/core';
import { 
    RouterModule, Routes, Router, CanActivate, 
    ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { WorkbenchComponent } from './ui/workbench/workbench.component';
import { TasksComponent } from './ui/tasks/tasks.component';
import { AccountService } from './services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.accountService.currentUser().then(user => {
                resolve(true);
            }).catch(err => {
                this.router.navigate(['signin']);
                resolve(false);
            });
        });
    }
}

const appRoutes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '', 
        component: WorkbenchComponent,
        canActivate: [AuthGuard],
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
    providers: [
        AuthGuard
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
