import { parse } from 'url';

export default function(req, res, next) {
  const returnTo = parse(req.headers.referer).path;
  req.session = req.session || {};
  req.session.returnTo = returnTo;
  next();
}
