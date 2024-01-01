import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.companyService.findOneByName(name);
  }

  @Put(':name')
  async update(
    @Param('name') name: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateByName(name, updateCompanyDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.companyService.removeByName(name);
  }
}
