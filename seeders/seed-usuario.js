module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('usuario', 
      [
        {
            nome: 'Wesley Soares',
            email: 'wesley@email.com',
            senha: '123456',
            admin: true,
            comercial: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            nome: 'João Carlos',
            email: 'joao@email.com',
            senha: '9ff7b641722c30acdc058f2499d97dd8',
            admin: false,
            comercial: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ], {}),
  
    down: (queryInterface) => queryInterface.bulkDelete('usuario', null, {}),
  };