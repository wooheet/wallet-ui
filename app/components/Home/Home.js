// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes.json';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>YGGDRASH</h2>
        <Link to={routes.ACCOUNTS}>CONNECT</Link>
      </div>
    );
  }
}
