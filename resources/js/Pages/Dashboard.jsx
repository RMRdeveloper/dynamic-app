import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import utils from '@/utils';

/**
 * [DOM Components]
 */
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateOrUpdateTaskModal from '@/Components/CreateOrUpdateTaskModal';
import TodoList from '@/Components/TodoList';


export default function Dashboard() {

    const { tasks } = usePage().props;

    const [taskToEdit, setTaskToEdit] = useState(null);

    const [showCreateOrUpdateTaskModal, setShowCreateTaskModal] = useState(false);

    const onHideCreateOrUpdateTaskModal = () => {
        setTaskToEdit(null);
        setShowCreateTaskModal(false);
    }

    const onShowCreateOrUpdateTaskModal = () => {
        setShowCreateTaskModal(true);
    }

    const handleEditTask = (task) => {
        setTaskToEdit({
            ...task,
            due_date: task.due_date ? utils.formatDate(task.due_date) : ''
        });
        onShowCreateOrUpdateTaskModal();
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dynamic Tasks | Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <CreateOrUpdateTaskModal taskToEdit={taskToEdit} showModal={showCreateOrUpdateTaskModal} onCloseModal={onHideCreateOrUpdateTaskModal} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-between items-center">
                            <h1 className="font-bold">Your tasks</h1>
                            <button onClick={setShowCreateTaskModal.bind(this, true)} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
                                + Add task
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden sm:rounded-lg">
                        <TodoList tasks={tasks} onEditTask={handleEditTask} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
