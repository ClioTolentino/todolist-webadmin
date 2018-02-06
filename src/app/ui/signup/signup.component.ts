import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

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

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit() {
    }

    private async signUpBtnClick() {
        try {
            await this.accountService.signUp(this.email, this.password);
            await this.accountService.signIn(this.email, this.password);
            this.router.navigate(['tasks']);
        } catch (err) {
            this.error = 'Bad credentials, try again';
        }
    }

    private signInBtnClick() {
        this.router.navigate(['signin']);
    }
}
