import { Base } from "./base";
import { Attachment } from "./attachment";

export interface Task extends Base {
    title: string;
    dueDate: Date;
    notes: string;
    starred: boolean;
    completed: boolean;
    subtasks: Subtask[];
    attachments: Attachment[];
}

export interface Subtask {
    id: string;
    name: string;
    completed: boolean;
}
