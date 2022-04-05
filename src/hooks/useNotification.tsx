import { useContext } from 'react';

import { NotificationContext } from '../providers/notifications';

const useNotification = () => {
	const context = useContext(NotificationContext);
	return context;
};

export default useNotification;
