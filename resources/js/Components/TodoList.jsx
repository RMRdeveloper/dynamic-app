import utils from '@/utils';
import { router } from '@inertiajs/react';

/**
 * [DOM Components]
 */
import { CiTrash } from 'react-icons/ci';
import { MdOutlineModeEdit } from 'react-icons/md';

export default function TodoList(props) {

    const { tasks, onEditTask } = props;

    const handleDeleteTask = (taskId, event) => {
        event.preventDefault();
        router.delete(`task/${taskId}`);
    };

    const handleEditTask = (task, event) => {
        event.preventDefault();
        onEditTask(task);
    };

    const handleChangeTaskStatus = (task, event) => {

        const status = event.target.value;

        router.patch(`task/${task.id}`, {
            id: task.id,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            status,
        });
    };

    return (
        <>
            <p className={`text-gray-500 text-center pt-10 ${tasks.length ? 'hidden' : 'block'}`}>No tasks</p>
            {tasks.map((task, index) => (
                <div key={index} className="task shadow-sm p-6 mt-4 bg-white sm:rounded-lg text-gray-900 flex flex-col">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <p>{task.title}</p>
                        <div className="flex space-x-2">
                            <select value={task.status} onChange={handleChangeTaskStatus.bind(this, task)} className={`cursor-pointer text-sm text-white rounded px-2 border-none ${utils.statusColor(task.status)}`}>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button onClick={handleEditTask.bind(this, task)} className="bg-blue-500 hover:bg-blue-700 text-white text-sm p-2 rounded">
                                <MdOutlineModeEdit />
                            </button>
                            <button onClick={handleDeleteTask.bind(this, task.id)} className="bg-red-500 hover:bg-red-700 text-white text-sm p-2 rounded">
                                <CiTrash />
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 text-sm text-gray-500 flex justify-between">
                        <p>{task.description}</p>
                        <p className="font-bold badge ml-2">Due date: {task.due_date ? utils.formatDate(task.due_date) : '∞'}</p>
                    </div>
                </div> 
            ))}
        </>
    )
}