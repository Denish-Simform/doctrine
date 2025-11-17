import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';
import { Roles } from 'src/decorators/roles.decorator';
import UserRole from 'src/Enum/UserRole';
import { RolesGuard } from './guard/roles.guard';
import { Public } from 'src/decorators/public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @Public()
    create(@Body() createUserDto: CreateUserDto) {
        try {
            return this.userService.create(createUserDto);
        } catch (error) {
            return { error: error.message };
        }
    }

    @Roles(UserRole.ADMIN)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: UUID) {
        return this.userService.remove(id);
    }
}
