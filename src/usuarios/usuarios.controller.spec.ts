import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  // Criamos um dublê do Service para isolar o Controller
  const mockUsuariosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});