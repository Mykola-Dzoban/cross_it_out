import { where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { dbProjects } from '../../../config/firebaseConfig';

export const useUserProjects = (ownerId) => {
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);

	const fetchData = useCallback(async (owner) => {
		try {
			setLoading(true);
			const userProjects = await dbProjects.query(where('ownerId', '==', owner));
			setProjects(userProjects);
		} catch (error) {
			setError(error.message);
			setProjects([]);
		} finally {
			setLoading(false);
		}
	}, []);

	// useEffect(() => {
	//       const q = query(
	//           collection(firebaseFirestore, firebaseCollections.chats),
	//           where(ChatTypeFieldsEnum.IS_ARCHIVED, '==', false),
	//           where(ChatTypeFieldsEnum.IS_BANNED, '==', false),
	//       )
	//       const unsub = onSnapshot(q, snapshot => {
	//           const chats = snapshot.docs.map(
	//               doc =>
	//                   ({
	//                       ...doc.data(),
	//                       id: doc.id,
	//                   } as ChatType),
	//           )
	//           setAllChats(chats)
	//       })
	//       return () => {
	//           unsub()
	//       }
	//   }, [setAllChats])

	useEffect(() => {
		if (ownerId) {
			fetchData(ownerId);
		}
	}, [fetchData, ownerId]);

	const refetch = () => {
		fetchData(ownerId);
	};

	return { error, isLoading, projects, refetch };
};
