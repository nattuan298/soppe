export interface PermissionModel {
  _id: string;
  feature: string;
  subFeature: string;
  action: string;
  method: string;
}

export interface PermissionFeatureModel {
  access?: string;
  export?: string;
  create?: string;
  update?: string;
  delete?: string;
}
