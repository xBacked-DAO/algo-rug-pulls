import React from 'react';

// https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
export const useAsyncError = () => {
  const [_, setError] = React.useState(); // eslint-disable-line no-unused-vars
  return React.useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
