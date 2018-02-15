import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu  style={{ marginTop: '10px' }}>
      <Link route="/">
        <img src="../static/biots.png" style={{width: 300, height: 100}}/>
      </Link>

      <Menu.Menu color='red' position="right">
        <Link route="/">
          <a className="item">Polls</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
