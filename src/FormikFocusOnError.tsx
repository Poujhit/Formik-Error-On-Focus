import { formikConnect } from './FormikConnect';
import { FocusErrorProps, FocusError } from './FocusError';

export interface ConnectedFocusErrorProps extends FocusErrorProps {}

export const ConnectedFocusError = formikConnect(FocusError);
