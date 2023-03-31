import { CommonIdParams } from 'src/common/common.dto';
import { AdminFindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';
export declare class AdminController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUser(findUserDto: AdminFindUserDto): Promise<import("../../common/common.interface").IPaginationData<any>>;
    findOne(commonIdParams: CommonIdParams): Promise<any>;
    delete(commonIdParams: CommonIdParams): Promise<void>;
}
