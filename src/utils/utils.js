export const calculateDuration = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};

export const priorityText = (priority) => {
	let text = '';
	let color = '';
	switch (priority) {
		case 'high':
			text = 'Высокий';
			color = 'red';
			break;
		case 'medium':
			text = 'Средний';
			color = 'yellow';
			break;
		case 'low':
			text = 'Низкий';
			color = 'green';
			break;
		default:
			text = '';
			color = '';
	}
	return { text, color };
};

export const getDaysString = (count) => {
	const cases = [2, 0, 1, 1, 1, 2];
	const words = ['день', 'дня', 'дней'];
	return `${count} ${
		words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]
	}`;
};
