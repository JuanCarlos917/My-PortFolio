'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Eliminar columnas existentes
		await queryInterface.removeColumn('ProfessionalExps', 'startDate');
		await queryInterface.removeColumn('ProfessionalExps', 'endDate');

		// Agregar nuevas columnas
		await queryInterface.addColumn('ProfessionalExps', 'startYear', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
		await queryInterface.addColumn('ProfessionalExps', 'startMonth', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
		await queryInterface.addColumn('ProfessionalExps', 'endYear', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
		await queryInterface.addColumn('ProfessionalExps', 'endMonth', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
	},
	async down(queryInterface, Sequelize) {
		// Eliminar las nuevas columnas
		await queryInterface.removeColumn('ProfessionalExps', 'startYear');
		await queryInterface.removeColumn('ProfessionalExps', 'startMonth');
		await queryInterface.removeColumn('ProfessionalExps', 'endYear');
		await queryInterface.removeColumn('ProfessionalExps', 'endMonth');

		// Agregar nuevamente las columnas originales
		await queryInterface.addColumn('ProfessionalExps', 'startDate', {
			type: Sequelize.DATE,
			allowNull: true,
		});
		await queryInterface.addColumn('ProfessionalExps', 'endDate', {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},
};
