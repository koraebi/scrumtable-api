import { Moscow } from "src/enum/moscow.enum";

export class IssueDto {
    readonly name: string;
    readonly number: number;
    readonly selected: boolean;
    readonly moscow?: Moscow
}