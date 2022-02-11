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
    if (typeof body.label === 'string') {
      body.label = Moscow[body.label.toUpperCase()];
    }
    return this.issueService.addLabel(issueNumber, body);
  }

  @Delete('/issues/:number/:label')
  removeLabelToIssue(@Param('number') issueNumber: number, @Param('label') label: string) {
    return this.issueService.removeLabel(issueNumber, label);
  }
}
