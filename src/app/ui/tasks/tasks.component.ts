import { Component, OnInit } from '@angular/core';
import { TasksDbService } from '../../services/tasks-db.service';
import { Task } from '../../models/task';

declare var $: any;

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    private newTask: string;
    private tasks: Task[] = [];
    private selectedTask: Task;

    constructor(private tasksService: TasksDbService) { }

    ngOnInit() {
        this.initJqueryComponents();

        this.tasksService.tasks().then(tasks => {
            this.tasks = tasks;
        });
    }

    private async addTask() {
        let newTask: Task = {
            id: null,
            createdAt: null,
            updatedAt: null,
            title: this.newTask,
            dueDate: null,
            notes: null,
            starred: false,
            completed: false,
            subtasks: []
        };
        const task = await this.tasksService.create(newTask);
        this.tasks.push(task);
        this.newTask = null;
    }

    private taskClick(task: Task) {
        this.selectedTask = task;
        $('body').addClass('sidebar-opposite-visible');
    }

    private closeTaskClick() {
        this.selectedTask = null;
        $('body').toggleClass('sidebar-opposite-visible');
    }

    private async deleteTaskClick(task: Task) {
        try {
            await this.tasksService.destroy(this.selectedTask);
            const index = this.tasks.findIndex(item => item.id === this.selectedTask.id);
            this.tasks.splice(index, 1);
            this.selectedTask = null;
            $('body').toggleClass('sidebar-opposite-visible');
        } catch (err) {

        }
    }

    private async completedClick(task: Task) {
        try {
            task.completed = !task.completed;
            await this.tasksService.update(task);
        } catch (err) {

        }
    }

    private async starredClick(task: Task) {
        try {
            task.starred = !task.starred;
            await this.tasksService.update(task);
        } catch (err) {

        }
    }

    private titleChanged(newTitle) {
        this.selectedTask.title = newTitle;
        this.tasksService.update(this.selectedTask);
    }

    private notesChanged(newNotes) {
        newNotes = newNotes === '' ? null : newNotes;
        this.selectedTask.notes = newNotes;
        this.tasksService.update(this.selectedTask);
    }

    private async addSubtask(newSubtask) {
        this.selectedTask.subtasks.push({
            id: null,
            name: newSubtask,
            completed: false
        });
        const updatedTask = await this.tasksService.update(this.selectedTask);
        const task = this.tasks.find(item => item.id === updatedTask.id);
        task.subtasks = updatedTask.subtasks;
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
