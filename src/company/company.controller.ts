import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findOneByName(name: string): Promise<Company> {
    const company = await this.companyModel.findOne({ name }).exec();
    if (!company) {
      throw new NotFoundException(`Company with name "${name}" not found`);
    }
    return company;
  }

  async updateByName(
    name: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const updatedCompany = await this.companyModel
      .findOneAndUpdate({ name }, updateCompanyDto, { new: true })
      .exec();
    if (!updatedCompany) {
      throw new NotFoundException(`Company with name "${name}" not found`);
    }
    return updatedCompany;
  }

  async removeByName(name: string): Promise<Company> {
    const company = await this.companyModel.findOne({ name }).exec();
    if (!company) {
      throw new NotFoundException(`Company with name "${name}" not found`);
    }
    await company.deleteOne();
    return company;
  }
}
