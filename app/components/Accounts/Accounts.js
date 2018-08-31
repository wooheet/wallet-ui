// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Accounts.css';
import routes from 'constants/routes.json';
import AccountHeader from 'components/AccountHeader';
import logo from '../../../resources/images/YGG_logo_main.png'
import Modal from 'react-modal';
import back from '../../../resources/images/back5.jpg'
import AccountModal from 'components/AccountModal'

const HDpath = "m/44'/60'/0'/0/0";
const bip38 = require('bip38'),
      HDKey = require("accounts/hdkey"),
      bip39 = require("bip39"),
      jayson = require('jayson'),
      { MASTER_NODE } = require('constants'),
      { remote } = window.require("electron"),
      lowdb = remote.getGlobal("lowdb"),
      { dataToJson } = require('utils'),
      zxcvbn = require('zxcvbn');

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  account: number
};
export default class Accounts extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic:"",
      modalStatus:"",
      modalIsOpen: false,
      accountName:"",
      password:"",
      passwordConfirm:"",
      importMnemonic:"",
      passwordValid:"",
      isloading:false,
      AlertImportAccount:"",
      AlertImportAccountName:"",
      AlertImportAccountPass:"",
      AlertImportAccountConfirmPass:""
    };

    this.createModal = this.createModal.bind(this);
    this.importModal = this.importModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this.createAccount1 = this.createAccount1.bind(this);
    this.createAccount2 = this.createAccount2.bind(this);
    this.createAccount3 = this.createAccount3.bind(this);
    this.importAccount = this.importAccount.bind(this);
  }

  componentDidMount = () => {

  }

  createModal = () => {
    this.setState({
      modalIsOpen: true,
      modalStatus:"create1"
    });
  }
  importModal = () => {
    this.setState({
      modalIsOpen: true,
      modalStatus:"import"
    });
  }

  _closeModal = () => {
    this.setState({
      modalIsOpen: false,
      mnemonic:"",
      modalStatus:"",
      accountName:"",
      password:"",
      passwordConfirm:"",
      importMnemonic:"",
      passwordValid:"",
      AlertImportAccount:"",
      AlertImportAccountName:"",
      AlertImportAccountPass:"",
      AlertImportAccountConfirmPass:""
    });
  }
  createAccount1 = () =>{
    if(this.state.accountName===""){
      this.setState({
          AlertImportAccountName:"Please enter your account name.",
          isloading:false
      });
    } else if(this.state.password===""){
      this.setState({
          AlertImportAccountPass:"Please enter password.",
          isloading:false
      });
    } else if(Number(this.state.passwordValid) < 3){
      if(zxcvbn(this.state.password).feedback.warning){
        this.setState({
          AlertImportAccountPass:zxcvbn(this.state.password).feedback.warning,
          isloading:false
        });
      }else{
        this.setState({
          AlertImportAccountPass:"You should satisfy a stronger password.",
          isloading:false
        });
      }
    } else if(this.state.password !== this.state.passwordConfirm){
      this.setState({
          AlertImportAccountPass:"Passwords do not match.",
          AlertImportAccountConfirmPass:" ",
          isloading:false
      });
    } else if(this.state.passwordConfirm===""){
      this.setState({
          AlertImportAccountConfirmPass:"Please enter verity password.",
          isloading:false
      });
    }else {
      let mnemonic = bip39.generateMnemonic();
      this.setState(currentState => {
        return {
          ...currentState,
          accountName:this.state.accountName,
          password:this.state.password,
          mnemonic:mnemonic,
          modalStatus:"create2"
        };
      });
    }
    setTimeout(() =>{
      this.setState({
        AlertImportAccount:"",
        AlertImportAccountName:"",
        AlertImportAccountPass:"",
        AlertImportAccountConfirmPass:""
      });
    }, 2000)
  }

  createAccount2 = () => {
    this.setState(() => {
      return {
        modalStatus:"create3"
      };
    });
  }

  createAccount3 = async () => {
    this.setState({isloading:true});
    var client  = await jayson.client.http(`${MASTER_NODE}/api/account`)
    const { accountName, password, mnemonic } = this.state
    const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const wallet = hdwallet.derivePath(HDpath).getWallet();
    let address = wallet.getAddressString();
    const fromPrivateKeyBuffer = wallet.getPrivateKey();
    setTimeout(() =>{
      const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, password )

      let address40 = address.substring(2)
      const balanceParamsdata = {
        "address":address40,
        "method":"balanceOf",
        "params":[
          {
            address :address40
          }
        ]
      }
      let balanceParamsdataJson = dataToJson(balanceParamsdata)
      client.request('balanceOf', {data: balanceParamsdataJson}, (err, res) => {
        if(err) {
          throw err
        } else {
          lowdb.get('accounts').push({
            name:accountName,
            address:address,
            balance:JSON.parse(res.result).result
          }).write()
          lowdb.get('principal').push({
            address:address,
            EncryptedKey:privatekeyEncryptedKey
          }).write()
        }
      });

      this.setState(currentState => {
        const newState = delete currentState.mnemonic;
        return {
          ...currentState,
          accountName:"",
          password:"",
          newState,
          modalIsOpen: false,
          isloading:false
        };
      });
      }, 100)
  }

  importAccount = () => {

  }

  _handleInput = e => {
    if(e.target.name === "password"){
      let pass = e.target.value
      if(zxcvbn(pass).score ===0){
        this.setState({
          passwordValid:"0",
          AlertImportAccountPass:zxcvbn(pass).feedback.warning,
        })
      } else if(zxcvbn(pass).score ===1){
        this.setState({
          passwordValid:"1",
          AlertImportAccountPass:zxcvbn(pass).feedback.warning,
        })
      } else if(zxcvbn(pass).score ===2){
        this.setState({
          passwordValid:"2",
          AlertImportAccountPass:zxcvbn(pass).feedback.warning,
        })
      } else if(zxcvbn(pass).score ===3){
        this.setState({
          passwordValid:"3",
          AlertImportAccountPass:"",
        })
      } else if(zxcvbn(pass).score ===4){
        this.setState({
          passwordValid:"4",
          AlertImportAccountPass:"",
        })
      }
    }
    if(e.target.name === "recoveryPharse" && e.target.value === "I have written down the pharse"){
      this.setState({
        confirmRecoveryPharse:false
      })
    }else{
      this.setState({
        confirmRecoveryPharse:true
      })
    }

    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    });
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
            createAccount1={this.createAccount1}
            createAccount2={this.createAccount2}
            createAccount3={this.createAccount3}
            importAccount={this.importAccount}
            closeModal={this._closeModal}
            status={this.state.modalStatus}
            handleInput={this._handleInput}
            accountName={this.state.accountName}
            password={this.state.password}
            passwordConfirm={this.state.passwordConfirm}
            importMnemonic={this.state.importMnemonic}
            mnemonic={this.state.mnemonic}
            passwordValid={this.state.passwordValid}
            AlertImportAccount={this.state.AlertImportAccount}
            AlertImportAccountName={this.state.AlertImportAccountName}
            AlertImportAccountPass={this.state.AlertImportAccountPass}
            AlertImportAccountConfirmPass={this.state.AlertImportAccountConfirmPass}
            isloading={this.state.isloading}
          />
          <div className={styles.logo}>
            <img src={logo} alt="ygg" />
          </div>
        </div>
      </div>
    );
  }
}

