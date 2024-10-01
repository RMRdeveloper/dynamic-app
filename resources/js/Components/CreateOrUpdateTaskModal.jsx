import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { MdErrorOutline } from "react-icons/md";

export default function CreateOrUpdateTaskModal(props) {

    const [errors, setErrors] = useState({});

    const { data, setData, submit, reset: resetForm } = useForm({
        id: '',
        title: '',
        description: '',
        status: 'pending',
        due_date: ''
    });

    const handleCloseModal = () => {
        props.onCloseModal();
        resetForm();
        setErrors({});
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault();

            const url = props.taskToEdit
                ? `task/${props.taskToEdit.id}`
                : 'task/create';

            const method = props.taskToEdit ? 'patch' : 'post';

            submit(method, url, {
                onSuccess: (page) => {
                    setErrors(page.props.flash.statusMessage);

                    if (page.props.flash.statusCode === 200) {
                        handleCloseModal();
                    }
                }
            });
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const getError = (inputKey) => {
        if (errors && errors[inputKey]) {
            return (
                <p className={`text-sm font-medium text-red-700 my-0 flex items-center gap-1 ${errors[inputKey].at(0) ? 'block' : ' hidden'}`}>
                    <MdErrorOutline /> <span>{errors[inputKey].at(0)}</span>
                </p>
            )
        }
    }

    useEffect(() => {
        if (props.taskToEdit) {
            setData({
                id: props.taskToEdit.id,
                title: props.taskToEdit.title,
                description: props.taskToEdit.description,
                status: props.taskToEdit.status,
                due_date: props.taskToEdit.due_date
            });
        }
    }, [props.taskToEdit]);

    return (
        <>
            {props.showModal && <div className="fixed inset-0 flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block mt-10 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6">
                        <h2 className="text-2xl font-bold text-center" id="modal-headline">{props.taskToEdit ? 'Edit Task' : 'Create Task'}</h2>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input defaultValue={data.title} onChange={(e) => setData('title', e.target.value)} type="text" name="title" id="title" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        {getError('title')}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} name="description" id="description" className="resize-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        {getError('description')}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select onChange={(e) => setData('status', e.target.value)} value={data.status} name="status" id="status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        {getError('status')}
                        <div>
                            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due date</label>
                            <input defaultValue={data.due_date} onChange={(e) => setData('due_date', e.target.value)} type="date" name="due_date" id="due_date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        {getError('due_date')}
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCloseModal} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">Cancel</button>
                            <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                {props.taskToEdit ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </>
    )
}