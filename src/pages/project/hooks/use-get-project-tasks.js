import { where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { dbTasks } from '../../../config/firebaseConfig';

export const useGetProjectTasks = (projectId) => {
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);

	const fetchData = useCallback(async (id) => {
		try {
			setLoading(true);
			const projectTasks = await dbTasks.query(where('projectId', '==', id));
			setTasks(projectTasks);
		} catch (error) {
			setError(error.message);
			setTasks([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (projectId) {
			fetchData(projectId);
		}
	}, [fetchData, projectId]);

	const refetch = () => {
		fetchData(projectId);
	};

	return { error, isLoading, tasks, refetch };
};
