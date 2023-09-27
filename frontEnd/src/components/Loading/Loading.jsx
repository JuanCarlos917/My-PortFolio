// import styles from './loading.module.css';
import { CircularProgress } from '@nextui-org/react';
import { useEffect, useState } from 'react';


export const Loading = () => {
	const [value, setValue] = useState(0);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setValue((v) => {
				if (v >= 100) {
					setNotFound(true);
					return 0;
				} else {
					return v + 5;
				}
			});
		}, 500);

		return () => clearInterval(interval);
	}, []);

	if (notFound) {
		return <div>Not Found 404</div>;
	}

	return (
		<CircularProgress
			aria-label='Loading...'
			size='lg'
			value={value}
			color='warning'
			showValueLabel={true}
		/>
	);
};
