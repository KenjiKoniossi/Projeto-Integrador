// SENHAS: 123456

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('usuario', 
      [
        {
            nome: 'Wesley Soares',
            email: 'wesley@email.com',
            senha: '$2b$10$YqGhcRPM2QsV6l41MoVnBePSGa/qLFKg49HduxEIfRpptS/E.eAfe',
            admin: true,
            comercial: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            nome: 'João Carlos',
            email: 'joao@email.com',
            senha: '$2b$10$YqGhcRPM2QsV6l41MoVnBePSGa/qLFKg49HduxEIfRpptS/E.eAfe',
            admin: false,
            comercial: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ], {}),
  
    down: (queryInterface) => queryInterface.bulkDelete('usuario', null, {}),
  };