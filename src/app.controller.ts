import { EventsGateway } from './services/socket.gateway';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Moscow } from './enum/moscow.enum';
import { IssueService } from './services/issue.service';
import { Logger } from '@nestjs/common';
import { WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private issueService: IssueService,
    private readonly socket: EventsGateway
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

  @Delete('/issues/:number/:label')
  removeLabelToIssue(@Param('number') issueNumber: number, @Param('label') label: string) {
    return this.issueService.removeLabel(issueNumber, label);
  }

  @Post('/webhook')
  listenGithubWebhook(@Body() body) {
    this.socket.server.emit('updateIssue', body);
    Logger.log('Webhook : action=' + body.action + ", issue=" + body.issue.number);
  }
}
