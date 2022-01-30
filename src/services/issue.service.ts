import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map, Observable } from "rxjs";
import { IssueDto } from "src/dto/issue.dto";
import { Moscow } from "src/enum/moscow.enum";

@Injectable()
export class IssueService {
    readonly API_URL = 'https://api.github.com/repos/Scrumtable/web/issues';
    readonly CONFIG = {headers: {Authorization: 'token '+process.env.GITHUB_TOKEN}};

    constructor(private httpService: HttpService) { }

    private getMosowFromLabels(labels: any[]): Moscow | undefined {
        if(labels.length === 0)
            return undefined;

        for(let label of labels) {
            switch(label.name) {
                case Moscow.MUST:
                    return Moscow.MUST;
                case Moscow.SHOULD:
                    return Moscow.SHOULD;
                case Moscow.COULD:
                    return Moscow.COULD;
                case Moscow.WONT:
                    return Moscow.WONT;
            }
        }

        return undefined;
    }

    getIssues(): Observable<IssueDto[]> {
        return this.httpService.get(this.API_URL, this.CONFIG).pipe(map(response => (response.data as any[])
            .map(value => { return { name: value.title, number: value.number, selected: false, moscow: this.getMosowFromLabels(value.labels)} })
        ));
    }

    addLabel(issueNumber: number, label: {label: Moscow} ): Observable<string[]> {
        return this.httpService.post(this.API_URL + '/' + issueNumber + '/labels', {labels: [label.label]}, this.CONFIG).pipe(map(response => (response.data as any[])
            .map(value => {return value.name as string})
        ));
    }

    removeLabel(issueNumber: number, label: string): Observable<string[]> {
        return this.httpService.delete(this.API_URL +'/' + issueNumber + '/labels/' + label, this.CONFIG).pipe(map(response => (response.data as any[])
            .map(value => {return value.name as string})
        ));
    }
}