import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    private email: string;
    private password: string;
    private error: string;

    constructor(private router: Router) { }

    ngOnInit() {
    }

    private signUpBtnClick() {
        this.router.navigate(['signup']);
    }
}
