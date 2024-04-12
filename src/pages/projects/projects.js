import {
	Button,
	Card,
	CardHeader,
	Input,
	Label,
	Sheet,
	SheetActionButton,
	SheetCloseButton,
	SheetContent,
	SheetTrigger,
} from 'perkslab-ui';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { dbProjects } from '../../config/firebaseConfig';
import { urlConfig } from '../../utils/urlConfig';
import { useUserProjects } from './hooks/useUserProjects';

const Projects = () => {
	const auth = useAuthUser();

	const navigate = useNavigate();

	const { projects, isLoading, error, refetch } = useUserProjects(auth?.ownerId);

	const [projectName, setProjectName] = useState('');

	const createNewProject = async (data) => {
		await dbProjects
			.create(data)
			.then((res) => {
				refetch?.();
				toast.success('Project created successfully!');
			})
			.catch((err) => console.log(err));
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}
	return (
		<div className="flex flex-col gap-4">
			<Sheet>
				<SheetTrigger>
					<Button variant="accent">+ Create new project</Button>
				</SheetTrigger>
				<SheetContent position="right">
					<div className="p-5 ">
						<h2 className="font-bold text-2xl">Create new project</h2>
						<hr />
						<form className="w-full flex flex-col gap-2 mt-4">
							<Label className="text-sm text-left">Just enter project name and that's it</Label>
							<Input
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
								type="text"
								placeholder="Very cool project"
								className={`w-full max-w-xs`}
							/>
						</form>
						<div className="w-full flex justify-end gap-3 mt-6">
							<SheetCloseButton>
								<Button>Close</Button>
							</SheetCloseButton>
							<SheetActionButton>
								<Button variant="success" onClick={() => createNewProject({ name: projectName, ownerId: auth?.ownerId })}>
									Save
								</Button>
							</SheetActionButton>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			<div className="flex flex-wrap gap-4 ">
				{projects?.map((project) => (
					<Card
						className="w-56 cursor-pointer"
						key={project.id}
						onClick={() => navigate(urlConfig.pages.project.replace(':id', project.id))}>
						<CardHeader className="font-semibold text-center text-xl">{project.name}</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
export default Projects;
