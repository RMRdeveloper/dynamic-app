import { Head } from '@inertiajs/react';

export default function MainLayout({ children }) {
    return (
        <>
            <Head title="Todo App" />
            {children}
        </>
    );
}