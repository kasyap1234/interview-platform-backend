// src/companies/dto/create-company.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  // Other properties like industry, size, etc.
}
