import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    private email: string;
    private password: string;
    private error: string;

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit() {
    }

    private async signInBtnClick() {
        try {
            await this.accountService.signIn(this.email, this.password);
            this.router.navigate(['tasks']);
        } catch (err) {
            this.error = 'Bad credentials, try again';
        }
    }

    private signUpBtnClick() {
        this.router.navigate(['signup']);
    }
}
