

export function displayProfessionalExperience(exp) {
	const startDate = `${exp.startMonth}/${exp.startYear}`;
	const endDate = exp.endYear ? `${exp.endMonth}/${exp.endYear}` : 'Actual';
	return `${startDate} - ${endDate}`;
}
