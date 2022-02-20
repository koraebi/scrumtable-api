import { Moscow } from 'src/enum/moscow.enum';

export class Assignee {
  name: string;
  description: string;
}
export class Labels {
  name: string;
  description: string;
  color: string;
}
export class IssueDto {
  readonly name: string;
  readonly description: string;
  readonly state: string;
  readonly number: number;
  readonly assignee: Assignee;
  readonly assignees: Assignee[];
  readonly selected: boolean;
  readonly moscow?: Moscow;
  readonly labels?: Labels[];
}
