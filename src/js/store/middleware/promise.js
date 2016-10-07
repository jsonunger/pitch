export default () => next => action => {
  if (!action.promise) return next(action);

  const { promise, types, ...rest } = action;
  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  return promise
    .then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    )
    .catch(err => next({ ...rest, error: `MIDDLEWARE ERROR: ${err.message}`, type: FAILURE }));
};
