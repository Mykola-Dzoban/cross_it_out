import { Provider } from 'react-redux';
import { Routes } from './auth/Routes';
import Navbar from './components/Navbar';
import store from './store';

export const App = () => {
	console.log(process.env);
	return (
		<Provider store={store}>
			<Navbar />
			<div className="container mx-auto pt-10">
				<Routes />
			</div>
			{/* <Footer /> */}
		</Provider>
	);
};
