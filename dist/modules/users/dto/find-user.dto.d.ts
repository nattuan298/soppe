import { Status } from 'src/common/common.constants';
import { CommonPaginationDto } from 'src/common/pagination.dto';
export declare class AdminFindUserDto extends CommonPaginationDto {
    status?: Status;
    startDate?: Date;
    endDate?: Date;
    keyword?: string;
}
