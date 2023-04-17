import { IPaginationData } from './common.interface';
import { ApiBody } from '@nestjs/swagger';

export function paginationTransformer(input): IPaginationData {
  return {
    data: input.docs,
    total: input.totalDocs,
    page: input.page,
    limit: input.limit,
  };
}

export const ApiFile =
  (fileName = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
          folder: {
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
