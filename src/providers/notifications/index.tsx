import { createContext, useMemo, useState } from 'react';

type Notification = {
	message: string;
};

type INotification = Notification | null;

export const NotificationContext = createContext<{
	notification: INotification;
	show: (message: string) => void;
}>({
	notification: null,
	show: () => {}
});

type IProps = {
	children: React.ReactNode;
};

const DURATION = 3000;

const NotificationProvider = ({ children }: IProps) => {
	let timeout: NodeJS.Timeout;
	const [notification, setNotification] = useState<INotification>(null);

	const show = (message) => {
		if (message === notification?.message) {
			return;
		}
		if (notification) {
			clearTimeout(timeout);
		}

		setNotification({ message });
		timeout = setTimeout(() => {
			setNotification(null);
		}, DURATION);
	};

	const contextValue = useMemo(
		() => ({
			notification,
			show
		}),
		[notification]
	);

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
