import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório.' })
  nomeEmpresa: string;

  @IsString()
  @IsNotEmpty({ message: 'O CNPJ ou CPF é obrigatório.' })
  @IsNumberString({}, { message: 'O CNPJ ou CPF deve conter apenas números.' })
  @Length(11, 14, { message: 'O documento deve ter entre 11 e 14 caracteres.' })
  cnpjCpf: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  categoria?: string;
}
