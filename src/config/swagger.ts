import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ServiPro API',
      version: '1.0.0',
      description: 'Resumo de Todas as Rotas da API documentadas',
    },
    // O components precisa ficar AQUI DENTRO do definition
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT gerado no login para acessar esta rota.',
        },
      },
    },
  },

  apis: ['./src/routes/*.ts'], 
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);