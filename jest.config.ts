import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true, // Mostra mais detalhes na execução dos testes
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Suporta arquivos .ts, .tsx, e .js
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Utiliza ts-jest para transformar arquivos TypeScript
  },
  testMatch: ['**/tests/**/*.test.ts'], // Define o padrão de arquivos de teste
  globals: {
    'ts-jest': {
      isolatedModules: true, // Modo de isolamento dos módulos para melhorar performance
    },
  },
  // Remova esta linha, pois você não está usando o arquivo `jest.setup.ts`:
  // setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
