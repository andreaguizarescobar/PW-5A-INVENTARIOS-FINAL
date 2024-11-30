import axios from 'axios';
export async function getCommerceAll() {
	let result = await axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv`);
	console.log('<<AXIOS-ECOMMERCE>>: ', result.data);
	return result.data;
}