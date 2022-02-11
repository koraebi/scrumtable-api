import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Moscow } from './enum/moscow.enum';
import { IssueService } from './services/issue.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private issueService: IssueService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('issues')
  getIssues() {
    return this.issueService.getIssues();
  }

  @Post('/issues/:number')
  addLabelsToIssue(@Param('number') issueNumber: number, @Body() body: {label: Moscow}) {
    return this.issueService.addLabel(issueNumber, body);
  }

  @Post('/issues/:number/:label')
  addLabelToIssue(@Param('number') issueNumber: number, @Param('label') label: string) {
    return this.issueService.addLabel(issueNumber, { label: Moscow[label] });
  }

  @Delete('/issues/:number/:label')
  removeLabelToIssue(@Param('number') issueNumber: number, @Param('label') label: string) {
    return this.issueService.removeLabel(issueNumber, label);
  }
}
