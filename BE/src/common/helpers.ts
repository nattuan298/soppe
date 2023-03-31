import { IPaginationData } from './common.interface';

export function paginationTransformer(input): IPaginationData {
  return {
    data: input.docs,
    total: input.totalDocs,
    page: input.page,
    limit: input.limit,
  };
}
