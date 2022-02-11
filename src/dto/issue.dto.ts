import { Moscow } from 'src/enum/moscow.enum';

export class Assignee{
  login: string;
  avatar_url: string;
}
export class IssueDto {
  readonly name: string;
  readonly description: string;
  readonly number: number;
  readonly assignee: Assignee;
  readonly assignees: Assignee[];
  readonly selected: boolean;
  readonly moscow?: Moscow;
}

