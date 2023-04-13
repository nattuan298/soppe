import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import { TempateHomeBodyModel } from "src/types/home-template.model";

export function editTemplateHomeService(templatehome: TempateHomeBodyModel): Promise<void | any> {
  const { status, name, sections, _id, countryCode } = templatehome;
  return authorizedRequest.patch(`${config.apiBaseUrl}/admin/home-templates/${_id}`, {
    status,
    name,
    sections,
    countryCode,
  });
}

export function deleteTemplateHomeService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/home-templates/${id}`);
}

export function createTemplateHomeService(body: TempateHomeBodyModel): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/home-templates`, body);
}

export function deleteSectionTemplateHomeService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/home-templates/sections/${id}`);
}

export function createSectionTemplateHomeService(
  id: string,
  body: TempateHomeBodyModel,
): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/home-templates/${id}/sections`, body);
}
