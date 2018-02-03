import { Base } from "./base";

export interface Task extends Base {
    title: string;
    dueDate: Date;
    notes: string;
    starred: boolean;
    completed: boolean;
    subtasks: Subtask[];
}

export interface Subtask {
    id: string;
    name: string;
    completed: boolean;
}
