// wufoo.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

const WUFOO_API_KEY = '';
const WUFOO_SUBDOMAIN = '';

@Injectable()
export class WufooService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `https://${WUFOO_SUBDOMAIN}.wufoo.com/api/v3`;
  }

  getFormShareableUrl(formId: string): string {
    return `https://${WUFOO_SUBDOMAIN}.wufoo.com/forms/${formId}/`;
  }

  getPreFilledForm(formId: string, name: string, email: string): string {
    const baseUrl2 = `https://${WUFOO_SUBDOMAIN}.wufoo.com/forms/${formId}/`;

    const queryParams = new URLSearchParams({
      Field1: name,
      Field2: email,
    });

    return `${baseUrl2}?${queryParams.toString()}`;
  }

  async getForms() {
    const response = await axios.get(`${this.baseUrl}/forms.json`, {
      auth: {
        username: WUFOO_API_KEY,
        password: 'footastic',
      },
    });

    return response.data.Forms;
  }

  //get form entries but get field names by Field1,Field2 below code get response by replacing Filed1,Field2 with Name and Email
  // async getFormEntries(formId: string) {
  //   const response = await axios.get(
  //     `${this.baseUrl}/forms/${formId}/entries.json`,
  //     {
  //       auth: {
  //         username: WUFOO_API_KEY,
  //         password: 'footastic',
  //       },
  //     },
  //   );

  //   return response.data.Entries;
  // }

  async getFormEntries(formId: string) {
    const response = await axios.get(
      `${this.baseUrl}/forms/${formId}/entries.json`,
      {
        auth: {
          username: WUFOO_API_KEY,
          password: 'footastic',
        },
      },
    );

    const mappedEntries = response.data.Entries.map((entry: any) => ({
      EntryId: entry.EntryId,
      Name: entry.Field1,
      Email: entry.Field2,
      DateCreated: entry.DateCreated,
      CreatedBy: entry.CreatedBy,
      DateUpdated: entry.DateUpdated,
      UpdatedBy: entry.UpdatedBy,
    }));

    return mappedEntries;
  }

  async getFormEntry(formId: string, entryId: string) {
    const entries = await this.getFormEntries(formId);
    const entry = entries.find((e) => e.EntryId === entryId);
    return entry;
  }
}
