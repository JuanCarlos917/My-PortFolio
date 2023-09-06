import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';

export const Home = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getAbout());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<div>
				<div>
					<h1>Biografía:</h1>
					<p>{aboutInfo?.bio}</p>
				</div>
				<div>
					<img
						src='https://s3mediapf.s3.us-east-1.amazonaws.com/Captura%20de%20pantalla%202023-06-21%20a%20la%28s%29%2020.42.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXLCS7UOKL45CJ3TG%2F20230906%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230906T160928Z&X-Amz-Expires=3600&X-Amz-Signature=d9517d475a740299966983db3659cb2f7045198dd365e9022ad6fb77479ee638&X-Amz-SignedHeaders=host&x-id=GetObject'
						alt=''
					/>
				</div>
                <div></div>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};
