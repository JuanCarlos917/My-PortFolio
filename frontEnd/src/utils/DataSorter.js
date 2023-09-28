export const DataSorter = (props) => {
	// Desestructuración de props
	const { data, dateField } = props;

    if (!Array.isArray(data)) {
		return [];
	}


	// Lógica para ordenar los datos basándose en la fecha
	const organizedData = data.slice().sort((a, b) => {
		const dateA = new Date(a[dateField]);
		const dateB = new Date(b[dateField]);
		return dateB - dateA; //  ordenará los datos desde la fecha más reciente hasta la más antigua.
	});

	// Aquí simplemente devuelvo el conjunto de datos organizados.
	return organizedData;
}