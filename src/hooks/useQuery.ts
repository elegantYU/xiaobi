import { useLocation } from 'react-router-dom';

const useQuery = () => {
	const q = new URLSearchParams(useLocation().search);

	return q;
};

export default useQuery;
