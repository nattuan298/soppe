export enum BannerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum BannerResponseMessage {
  NotFound = 'Banner is not found.',
  NameExist = 'Banner name already exist.',
  NoActiveBanner = 'No banner has active status.',
  NameUnique = 'Banner name must be unique in a Loop.',
  CannotInactive = 'You cannot inactive this banner right now.',
  CannotDeleteBanner = `You cannot delete this banner right now.`,
}
