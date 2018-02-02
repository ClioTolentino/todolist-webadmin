import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        this.initJqueryComponents();
    }

    private taskClick() {
        $('body').addClass('sidebar-opposite-visible');
    }

    private closeTaskClick() {
        $('body').toggleClass('sidebar-opposite-visible');
    }

    private initJqueryComponents() {
        const navbarHeight = $('.navbar').height();
        // $('body').toggleClass('sidebar-opposite-visible');
        $('.task-content').css('height', $(window).height() - navbarHeight);
        $(window).on("resize", () => {
            $('.task-content').css('height', $(window).height() - navbarHeight);
        });
    }
}
