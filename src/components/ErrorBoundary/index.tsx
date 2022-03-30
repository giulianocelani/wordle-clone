import { ErrorBoundary as ErrorWrapper } from 'react-error-boundary';

type IProps = {
	children: React.ReactNode;
};

const ErrorFallback = () => {
	return <p>Something went wrong</p>;
};

const ErrorBoundary = ({ children }: IProps) => {
	return <ErrorWrapper fallbackRender={ErrorFallback}>{children}</ErrorWrapper>;
};

export default ErrorBoundary;
