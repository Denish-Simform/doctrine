import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Roles } from 'src/decorators/roles.decorator';
import UserRole from 'src/Enum/UserRole';
import { UUID } from 'node:crypto';


@Roles([UserRole.ADMIN])
@Controller('specialization')
export class SpecializationController {
    constructor(private readonly specializationService: SpecializationService) { }

    @Post()
    create(@Body() createSpecializationDto: CreateSpecializationDto) {
        return this.specializationService.create(createSpecializationDto);
    }

    @Get()
    findAll() {
        return this.specializationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID) {
        return this.specializationService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: UUID, @Body() updateSpecializationDto: UpdateSpecializationDto) {
        return this.specializationService.update(id, updateSpecializationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: UUID) {
        return this.specializationService.remove(id);
    }
}
