// Declara la función `checkEntitiesExistence` que será una función asincrónica.
const checkEntitiesExistence = async (Entity, ids, entityName) => {
	// Usa el método `findAll` del modelo `Entity` para buscar todas las entidades que tengan un ID dentro del array `ids`.
	const foundEntities = await Entity.findAll({
		where: {
			id: ids,
		},
	});

	// Compara la cantidad de entidades encontradas con la cantidad de IDs proporcionados.
	if (foundEntities.length !== ids.length) {
		// Si no coinciden las cantidades, lanza un error informando que algunos de los IDs no existen en la base de datos.
		throw new Error(
			`Algunos ${entityName} proporcionados no existen en la base de datos.`,
		);
	}

	// Si todas las entidades se encontraron, devuelve las entidades encontradas.
	return foundEntities;
};

module.exports = {
	checkEntitiesExistence,
};
