// your.controller.ts

import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { WufooService } from './app.service';

@Controller()
export class WufooController {
  constructor(private readonly wufooService: WufooService) {}

  @Get('form/:formId/shareable-url')
  getFormShareableUrl(@Param('formId') formId: string) {
    const shareableUrl = this.wufooService.getFormShareableUrl(formId);
    return shareableUrl;
  }

  @Get('form/:formId/shareable-url/:name/:email')
  getPreFilledForm(
    @Param('formId') formId: string,
    @Param('name') name: string,
    @Param('email') email: string,
  ) {
    const shareableUrl = this.wufooService.getPreFilledForm(
      formId,
      name,
      email,
    );
    return shareableUrl;
  }

  @Get('forms')
  async getAllForms() {
    const forms = await this.wufooService.getForms();
    return forms;
  }

  @Get('form/:formId/entries')
  async getFormById(@Param('formId') formId: string) {
    const entries = await this.wufooService.getFormEntries(formId);
    return entries;
  }

  @Get('form/:formId/entries/:entryId')
  async getById(
    @Param('formId') formId: string,
    @Param('entryId') entryId: string,
  ) {
    const entry = await this.wufooService.getFormEntry(formId, entryId);
    if (entry) {
      return entry;
    } else {
      throw new NotFoundException('Entry not found');
    }
  }
}
