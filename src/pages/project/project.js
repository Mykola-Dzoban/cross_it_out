import { PenLine } from 'lucide-react';
import { Accordion, AccordionContent, AccordionTrigger, Button } from 'perkslab-ui';
import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CrossCard from '../../components/Card';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import Tasks from '../../components/Tasks';
import { dbProjects, dbTasks } from '../../config/firebaseConfig';
import { urlConfig } from '../../utils/urlConfig';
import { useGetProjectTasks } from './hooks/use-get-project-tasks';

const Project = memo(() => {
	const { id } = useParams();

	const navigate = useNavigate();

	const { tasks, isLoading, error, refetch: refetchTasks } = useGetProjectTasks(id);

	const deleteProject = async () => {
		if (tasks?.length === 0) {
			await dbProjects
				.delete(id)
				.then(() => {
					navigate(urlConfig.pages.dashboard);
					toast.success('Project deleted successfully!');
				})
				.catch((err) => console.log(err));

			return;
		}
		toast.error('Can not delete project with tasks');
		return;
	};

	const markAllAsDone = async () => {
		for (const task of tasks) {
			await dbTasks.update({ id: task.id, isDone: true });
		}
		refetchTasks?.();
	};

	const markAllAsUndone = async () => {
		for (const task of tasks) {
			await dbTasks.update({ id: task.id, isDone: false });
		}
		refetchTasks?.();
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (tasks.length === 0) {
		return (
			<div className="flex flex-col gap-2">
				<div className="w-full flex justify-between">
					<Button variant="secondary" onClick={() => navigate(-1)}>
						Back
					</Button>

					<Button variant="error-outline" onClick={() => deleteProject(id)}>
						Delete project
					</Button>
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-4">
					<div className="text-center text-xl font-medium flex flex-row items-center justify-center gap-3 border-b">
						<PenLine />
						Add first task
					</div>

					<Form tasks={tasks} refetchTasks={refetchTasks} projectId={id} />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="w-full flex justify-between">
				<Button variant="secondary" onClick={() => navigate(-1)}>
					Back
				</Button>

				<Button variant="error-outline" onClick={() => deleteProject(id)}>
					Delete project
				</Button>
			</div>
			<div className="w-full flex justify-center items-center flex-col lg:flex-row gap-4">
				<CrossCard tasks={tasks} refetchTasks={refetchTasks} />
			</div>
			<div className="w-full flex flex-col justify-center items-center md:flex-row gap-4">
				<Accordion className="w-11/12 md:w-1/2">
					<AccordionTrigger>
						<div className="text-center text-xl font-medium flex flex-row items-center justify-center gap-3">
							<PenLine />
							Add task
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<Form tasks={tasks} refetchTasks={refetchTasks} projectId={id} />
					</AccordionContent>
				</Accordion>
			</div>
			<div className='w-full flex justify-end gap-3'>
				<Button variant="info" onClick={() => markAllAsDone()}>
					Mark all as DONE
				</Button>

				<Button variant="neutral" onClick={() => markAllAsUndone()}>
					Mark all as UNDONE
				</Button>
			</div>

			<div className="w-full flex justify-center items-center flex-col gap-7">
				<Tasks tasks={tasks} refetchTasks={refetchTasks} />
			</div>
		</div>
	);
});
export default Project;
