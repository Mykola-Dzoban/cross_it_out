import { PenLine } from 'lucide-react';
import { Accordion, AccordionContent, AccordionTrigger, Button } from 'perkslab-ui';
import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CrossCard from '../../components/Card';
import Form from '../../components/Form';
import Tasks from '../../components/Tasks';
import { useGetProjectTasks } from './hooks/use-get-project-tasks';

const Project = memo(() => {
	const { id } = useParams();

	const navigate = useNavigate();

	const { tasks, isLoading, error, refetch: refetchTasks } = useGetProjectTasks(id);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (tasks.length === 0) {
		return (
			<div>
				<Button variant="secondary" onClick={() => navigate(-1)}>
					Back
				</Button>
				Add first task
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<Button variant="secondary" onClick={() => navigate(-1)}>
				Back
			</Button>
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
			<div className="w-full flex justify-center items-center flex-col gap-7">
				<Tasks tasks={tasks} refetchTasks={refetchTasks} />
			</div>
		</div>
	);
});
export default Project;
