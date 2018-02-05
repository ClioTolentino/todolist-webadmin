import { Base } from "./base";

export interface Attachment extends Base {
    path: string;
    filename: string;
    size: number;
    type: string;
}