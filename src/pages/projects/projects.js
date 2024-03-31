import { Card, CardHeader } from 'perkslab-ui';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
import { useUserProjects } from './hooks/useUserProjects';
import { urlConfig } from '../../utils/urlConfig';

const Projects = () => {
	const auth = useAuthUser();

	const navigate = useNavigate();

	const { projects, isLoading, error } = useUserProjects(auth?.ownerId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}
	return (
		<div className="flex gap-4 flex-wrap">
			<Card className="w-fit bg-lime-300 cursor-pointer">
				<CardHeader className="font-bold">+ Create new</CardHeader>
			</Card>
			{projects?.map((project) => (
				<Card
					className="w-fit cursor-pointer"
					key={project.id}
					onClick={() => navigate(urlConfig.pages.project.replace(':id', project.id))}>
					<CardHeader className="font-semibold">{project.name}</CardHeader>
				</Card>
			))}
		</div>
	);
};
export default Projects;
