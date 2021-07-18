import { ComponentType } from 'react';
import { connect } from 'formik';

export function formikConnect<T extends ComponentType<{ formik: any }>>(
  component: T
) {
  return connect(component as any) as ComponentType<
    Omit<GetProps<T>, 'formik'>
  >;
}

type GetProps<T> = T extends ComponentType<infer P> ? P : never;
