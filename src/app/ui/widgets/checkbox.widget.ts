import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

declare var $: any;

@Component({ 
    selector: 'checkbox-widget',
    template: `
        <div class="checkbox">
            <label style="margin-top: -5px">
                <div class="checker">
                    <span [ngClass]="{'checked': checked}">
                        <input type="checkbox" [(ngModel)]="checked" (change)="onValueChanged()">
                    </span>
                </div>
            </label>
            <ng-content></ng-content>
        </div>
    `
})
export class CheckboxWidget {
    @Input() checked: boolean;
    @Output() checkedChange = new EventEmitter<boolean>();

    onValueChanged() {
        this.checkedChange.emit(this.checked);
    }
}

@Component({ 
    selector: 'checkbox-switch',
    template: `
        <div class="checkbox checkbox-switch">
            <label>
                <input type="checkbox" class="switch" data-on-text="Yes" data-off-text="No" [(ngModel)]="checked" (change)="onValueChanged()">
                <ng-content></ng-content>
            </label>
        </div>
    `
})
export class SwitchWidget implements OnInit {
    @Input() checked: boolean;
    @Output() checkedChange = new EventEmitter<boolean>();

    ngOnInit(): void {
        $(".switch").bootstrapSwitch();
    }

    onValueChanged() {
        this.checkedChange.emit(this.checked);
    }
}