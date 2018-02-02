import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
    selector: 'app-workbench',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        this.initJqueryComponents();
    }

    private initJqueryComponents() {
        var resizePageContainer = () => {
            var e = $(window).height() - $(".page-container").offset().top - $(".navbar-fixed-bottom").outerHeight();
            $(".page-container").attr("style", "min-height:" + e + "px");
        };

        var miniSidebar  = () => {
            if ($('body').hasClass('sidebar-xs')) {
                $('.sidebar-main.sidebar-fixed .sidebar-content').on('mouseenter', function () {
                    if ($('body').hasClass('sidebar-xs')) {
                        $('body').removeClass('sidebar-xs').addClass('sidebar-fixed-expanded');
                    }
                }).on('mouseleave', function () {
                    if ($('body').hasClass('sidebar-fixed-expanded')) {
                        $('body').removeClass('sidebar-fixed-expanded').addClass('sidebar-xs');
                    }
                });
            }
        };

        resizePageContainer();

        $(".navigation").find("li.active").parents("li").addClass("active"); 
        $(".navigation").find("li").not(".active, .category-title").has("ul").children("ul").addClass("hidden-ul");
        $(".navigation").find("li").has("ul").children("a").addClass("has-ul");
        $(".dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu").has("li.active").
            addClass("active").parents(".navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)").
            addClass("active");
        $(".navigation-main > .navigation-header > i").tooltip({
            placement: "right",
            container: "body"
        });

        $(".navigation-main").find("li").has("ul").children("a").on("click", function(e) {
            e.preventDefault();
            $(this).parent("li").not(".disabled").not($(".sidebar-xs").not(".sidebar-xs-indicator").find(".navigation-main").
                children("li")).toggleClass("active").children("ul").slideToggle(250);
            $(".navigation-main").hasClass("navigation-accordion") && $(this).parent("li").not(".disabled").not($(".sidebar-xs").
                not(".sidebar-xs-indicator").find(".navigation-main").children("li")).siblings(":has(.has-ul)").removeClass("active").
                children("ul").slideUp(250);
        });

        // $(".sidebar-main-toggle").on("click", (e) => {
        //     e.preventDefault(), $("body").toggleClass("sidebar-xs");
        //     miniSidebar();
        // });
        miniSidebar();

        $(document).on("click", ".sidebar-control", (a) => {
            resizePageContainer();
        });

        $(".sidebar-fixed .sidebar-content").niceScroll({
            mousescrollstep: 100,
	        cursorcolor: '#ccc',
	        cursorborder: '',
	        cursorwidth: 3,
	        hidecursordelay: 100,
	        autohidemode: 'scroll',
	        horizrailenabled: false,
	        preservenativescrolling: false,
	        railpadding: {
	        	right: 0.5,
	        	top: 1.5,
	        	bottom: 1.5
	        }
        });
            
        $(window).on("resize", () => {
            var self = this;
            setTimeout(function() {
                resizePageContainer(); 
                $(window).width() <= 768 ? (
                    $("body").addClass("sidebar-xs-indicator"),
                    $(".sidebar-opposite").insertBefore(".content-wrapper"),
                    $(".sidebar-detached").insertBefore(".content-wrapper"),
                    $(".dropdown-submenu").on("mouseenter", function() {
                        $(this).children(".dropdown-menu").addClass("show")
                    }).on("mouseleave", function() {
                        $(this).children(".dropdown-menu").removeClass("show");
                    })) : (
                        $("body").removeClass("sidebar-xs-indicator"), 
                        $(".sidebar-opposite").insertAfter(".content-wrapper"), 
                        $("body").removeClass("sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached sidebar-mobile-opposite"),
                        $("body").hasClass("has-detached-left") ? $(".sidebar-detached").insertBefore(".container-detached") : $("body").hasClass("has-detached-right") && $(".sidebar-detached").insertAfter(".container-detached"),
                        $(".page-header-content, .panel-heading, .panel-footer").removeClass("has-visible-elements"), 
                        $(".heading-elements").removeClass("visible-elements"), 
                        $(".dropdown-submenu").children(".dropdown-menu").removeClass("show"))
            }, 100)
        }).resize(); 
    }
}
