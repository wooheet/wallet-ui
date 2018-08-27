// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Accounts.css';
import routes from 'constants/routes.json';
import AccountHeader from './AccountHeader';
import logo from '../../resources/images/YGG_logo_main.png'
import Modal from 'react-modal';
import back from '../../resources/images/back5.jpg'
import AccountModal from './AccountModal'

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

// Modal.setAppElement('#body');
// document.getElementById('body')
export default class Accounts extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic:"",
      modalStatus:"",
      modalIsOpen: false
    };

    this.createModal = this.createModal.bind(this);
    this.importModal = this.importModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {

  }

  createModal() {
    this.setState({
      modalIsOpen: true,
      modalStatus:"create"
    });
  }
  importModal() {
    this.setState({
      modalIsOpen: true,
      modalStatus:"import"
    });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fcfcfc';
    this.subtitle.style.marginLeft ='20px';
    this.subtitle.style.marginTop ='10px';
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
              onClick={this.importModal}
              data-tclass="ImportBtn"
              type="button"
            >
            <i className="fa fa-download"/>
          </button>
        </div>
        <div className={`account ${styles.account}`} data-tid="account">
          <button
              className={styles.createBtn}
              onClick={this.createModal}
              data-tclass="createBtn"
              type="button"
            >
            <i class="fa fa-plus" />
          </button>
          <AccountModal
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            afterOpenModal={this.afterOpenModal}
            status={this.state.modalStatus}
          />
          <div className={styles.logo}>
            <img src={logo} alt="ygg" />
          </div>
        </div>
      </div>
    );
  }
}

