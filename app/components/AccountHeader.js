// @flow
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountHeader.css';
import headerLogo from '../../resources/images/YGG_logo.png'

type Props = {

};

export default class AccountsHeader extends Component<Props> {
  props: Props;

  render() {
    const {

    } = this.props;
    return (
      <div class="row">
        <div class="col-md-5" className={styles.logo}>
          <div className={styles.btnGroup}>
            <img src={headerLogo} alt="headerLogo" />
          </div>
          <div className={styles.version}>
            v 0.0.1
          </div>
        </div>
      </div>
    );
  }
}
