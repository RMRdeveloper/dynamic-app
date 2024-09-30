import dayjs from 'dayjs';

export default {
    formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
    },
    statusColor(status) {
        switch (status) {
            default:
            case 'pending':
                return 'bg-red-500';
            case 'in_progress':
                return 'bg-blue-500';
            case 'completed':
                return 'bg-green-500';
        }
    }
}