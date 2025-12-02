import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';
import { Roles } from 'src/decorators/roles.decorator';
import UserRole from 'src/Enum/UserRole';
import { RolesGuard } from './guard/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { ImageInterceptor } from 'src/image-interceptor/image-interceptor.interceptor';

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

    @Roles([UserRole.ADMIN])
    @Get()
    findAll(@Req() req) {
        if ('page' in req.query && 'limit' in req.query) {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            return this.userService.findAllPaginated(page, limit);
        }
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @Public()
    update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Roles([UserRole.ADMIN])
    @Delete(':id')
    remove(@Param('id') id: UUID) {
        return this.userService.remove(id);
    }

    @Post('upload-image')
    @UseInterceptors(ImageInterceptor)
    uploadImage(@Req() req) {
        return this.userService.uploadImage(req.user.sub, req.file);
    }
}
