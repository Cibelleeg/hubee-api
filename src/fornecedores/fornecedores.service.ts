import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { eq, or, isNull } from 'drizzle-orm';
import { fornecedores } from '../database/schema';

@Injectable()
export class FornecedoresService {
  constructor(@Inject('DB_CONNECTION') private db: any) {}

  async create(createFornecedorDto: CreateFornecedorDto) {
    // 1. Verifica se já existe um fornecedor com esse CPF/CNPJ ou Email
    const fornecedorExistente = await this.db
      .select()
      .from(fornecedores)
      .where(
        or(
          eq(fornecedores.cnpjCpf, createFornecedorDto.cnpjCpf),
          createFornecedorDto.email
            ? eq(fornecedores.email, createFornecedorDto.email)
            : undefined,
        ),
      )
      .limit(1);

    if (fornecedorExistente.length > 0) {
      throw new ConflictException(
        'Já existe um fornecedor com este CNPJ/CPF ou E-mail.',
      );
    }

    // 2. Insere no banco
    const [novoFornecedor] = await this.db
      .insert(fornecedores)
      .values(createFornecedorDto)
      .returning();

    return novoFornecedor;
  }

  async findAll() {
    return this.db
      .select()
      .from(fornecedores)
      .where(isNull(fornecedores.deletedAt)); // Retorna apenas os ativos
  }

  async findOne(id: string) {
    const [fornecedor] = await this.db
      .select()
      .from(fornecedores)
      .where(eq(fornecedores.id, id));

    if (!fornecedor || fornecedor.deletedAt) {
      throw new NotFoundException('Fornecedor não encontrado.');
    }

    return fornecedor;
  }

  async update(id: string, updateFornecedorDto: UpdateFornecedorDto) {
    await this.findOne(id); // Garante que o fornecedor existe antes de atualizar

    const [fornecedorAtualizado] = await this.db
      .update(fornecedores)
      .set({ ...updateFornecedorDto, dataModificacao: new Date() })
      .where(eq(fornecedores.id, id))
      .returning();

    return fornecedorAtualizado;
  }

  async remove(id: string) {
    await this.findOne(id); // Garante que existe

    // Soft Delete: Preenche a data de deleção em vez de apagar o registro
    await this.db
      .update(fornecedores)
      .set({ deletedAt: new Date() })
      .where(eq(fornecedores.id, id));

    return { message: 'Fornecedor removido com sucesso.' };
  }
}
