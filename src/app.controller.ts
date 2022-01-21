import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { IssueDto } from './dto/issue.dto';
import { IssueService } from './services/issue.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private issueService: IssueService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('issues')
  getIssues() {
    console.log('HERE');
    return this.issueService.getIssues();
  }
}
