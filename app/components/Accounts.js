// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Accounts.css';
import routes from 'constants/routes.json';
import AccountHeader from './AccountHeader';
import logo from '../../resources/images/YGG_logo_main.png'
// import Modal from 'react-modal';

const bip38 = require('bip38'),
      HDKey = require("accounts/hdkey"),
      bip39 = require("bip39");

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  account: number
};

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

// Modal.setAppElement('#body')

export default class Accounts extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic:"",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {

  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  generationMnemonic = () => {
    let mnemonic = bip39.generateMnemonic();
    console.log(mnemonic)
  };

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      account
    } = this.props;
    return (
      <div>
        <AccountHeader/>
        <div className={styles.title}>
          Accounts
          <button
              className={styles.ImportBtn}
              onClick={increment}
              data-tclass="ImportBtn"
              type="button"
            >
            <i className="fa fa-download"/>
          </button>
        </div>
        <div className={`account ${styles.account}`} data-tid="account">
          <button
              className={styles.createBtn}
              onClick={this.generationMnemonic}
              data-tclass="createBtn"
              type="button"
            >
            <i class="fa fa-plus" />
          </button>
          <div className={styles.logo}>
            <img src={logo} alt="ygg" />
          </div>
        </div>
      </div>
    );
  }
}
