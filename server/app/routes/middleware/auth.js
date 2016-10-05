function isAuthenticated (req) {
  return !!req.user;
}

function isAdmin (req) {
  return req.user && req.user.isAdmin;
}

function isSelf (req) {
  return !req.requestedUser ? false : req.user.id === req.requestedUser.id;
}

function assert (assertion, status = 401) {
  return function (req, res, next) {
    if (assertion(req)) return next();
    const err = new Error('Not authenticated');
    err.status = status;
    next(err);
  };
}

export const assertAuthenticated = assert(isAuthenticated);

export const assertAdmin = assert(isAdmin, 403);

export const assertSelf = assert(isSelf);

export const assertAdminOrSelf = assert(req => isAuthenticated(req) && (isAdmin(req) || isSelf(req)), 403);
