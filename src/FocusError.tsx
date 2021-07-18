import { Fragment, useEffect } from 'react';
import { getIn, FormikContextType, FormikValues } from 'formik';
import flattenToLodashFormat from './FlattentoLodashFormat';

export interface FocusErrorProps {
  formik: Pick<
    FormikContextType<FormikValues>,
    'isSubmitting' | 'touched' | 'isValidating' | 'errors'
  >;

  focusDelay?: number;
}

export function FocusError({
  formik: { isSubmitting, touched, isValidating, errors },
  focusDelay = 100,
}: FocusErrorProps) {
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const flattedTouched = flattenToLodashFormat(touched);

      const errorNames = Object.keys(flattedTouched).reduce((prev, key) => {
        if (getIn(errors, key)) {
          prev.push(key);
        }
        return prev;
      }, [] as string[]);

      if (errorNames.length && typeof document !== 'undefined') {
        let errorElement: HTMLElement | null;

        errorNames.forEach((errorKey) => {
          const selector = `[name="${errorKey}"]`;
          if (!errorElement) {
            errorElement = document.querySelector(selector);
            return;
          }
        });

        setTimeout(() => {
          errorElement && errorElement.focus();
        }, focusDelay);
      }
    }
  }, [isSubmitting, isValidating, errors, touched, focusDelay]);

  return <Fragment />;
}
