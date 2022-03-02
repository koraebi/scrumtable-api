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

  @Post('/webhook')
  listenGithubWebhook(@Body() body) {
    if (body.action === 'labeled') {
      this.socket.server.emit('updateIssue', { issue: body.issue.number, label: body.label.name });
      Logger.log('Webhook: Label \"' + body.label.name + '\" set for issue #' + body.issue.number);
    }
  }
}