export type PreviewType = {
  lastModified: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  twoFaStatus: string;
  roles: [
    {
      _id: string;
      name: string;
    },
  ];
};
