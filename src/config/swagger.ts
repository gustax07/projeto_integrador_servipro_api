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
      responses: {
        InternalServerError: {
          description: 'Erro interno do servidor.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'error'
                  },
                  message: {
                    type: 'string',
                    example: 'Erro interno do servidor. Tente novamente mais tarde.'
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);