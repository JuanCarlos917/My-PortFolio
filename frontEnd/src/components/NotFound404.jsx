import { Link } from 'react-router-dom';
import { Result } from 'antd';
import { Button } from '@nextui-org/react';

export const NotFound404 = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen px-4 md:px-0'>
			<Result
				status='404'
				title='404'
				subTitle='¡Ups! Parece que esta página ha decidido tomarse unas vacaciones. ¿La ayudamos a regresar?'
				extra={
					<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
						<Link to='/'>
							<Button
								className='text-base md:text-lg font-volkhov text-dark_grayish_blue'
								color='warning'
								variant='ghost'>
								Regresar al Inicio
							</Button>
						</Link>
						<p className='text-sm md:text-base mt-4 md:mt-0 text-gray-600'>
							¿Esperabas encontrar algo diferente?{' '}
							<Link to='/contact' className='text-vivid_blue'>
								Contáctame
							</Link>
						</p>
					</div>
				}
			/>
		</div>
	);
};
