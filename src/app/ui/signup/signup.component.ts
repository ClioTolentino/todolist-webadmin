import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    private email: string;
    private password: string;

    /**
     * Manejo de errores.
     */
    private error: string;
    private emailError: string;
    private passwordError: string;

    constructor(private router: Router) { }

    ngOnInit() {
    }

    private signInBtnClick() {
        this.router.navigate(['signin']);
    }
}
