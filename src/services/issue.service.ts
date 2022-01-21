import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map, Observable } from "rxjs";
import { IssueDto } from "src/dto/issue.dto";

@Injectable()
export class IssueService {

    constructor(private httpService: HttpService) { }

    getIssues() {
        return this.httpService.get('https://api.github.com/repos/Scrumtable/web/issues').pipe(map(response => (response.data as any[])
            .map(value => { return { name: value.title, selected: false } })
        ));
    }
}