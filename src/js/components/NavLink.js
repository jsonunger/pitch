import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => {
  return (
    <section>
      <Link {...props} activeClassName="active" />
    </section>
  );
};

export default NavLink;
