export enum BannerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum BannerResponseMessage {
  NotFound = 'Banner loop is not found.',
  TooManyBanner = 'You can only activate 10 banners at the same time.',
  NameUnique = 'Banner name must be unique in a Loop.',
  CannotInactive = 'You cannot inactive this banner right now.',
  CannotDeleteBanner = `You cannot delete this banner right now.`,
}
