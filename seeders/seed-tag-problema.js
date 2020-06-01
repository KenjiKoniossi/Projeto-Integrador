module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('tag_problema', 
      [
        {
            id: 1,
            tag: 'Calçada esburacada',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            tag: 'Inclinação íngrime',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            tag: 'Piso escorregadio',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            tag: 'Árvore obstruindo caminho',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 5,
            tag: 'Poste obstruindo caminho',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 6,
            tag: 'Ocupação irregular',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ], {}),
  
    down: (queryInterface) => queryInterface.bulkDelete('tag_problema', null, {}),
  };