// @flow
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountModal.css';
import Modal from 'react-modal';

export default class AccountModal extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  componentDidMount() {

  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fcfcfc';
    this.subtitle.style.marginLeft ='20px';
    this.subtitle.style.marginTop ='10px';
    this.subtitle.style.fontStyle= 'italic';
  }

  renderImportPassphrase = () => {
    if(this.props.status === "import"){
      return (
        <input
          className={styles.inputVal}
          placeholder={"PASSPHRASE"}
          required
          maxLength={130}
          name="importMnemonic"
          value={this.props.importMnemonic}
          type={"text"}
          onChange={this.props.handleInput}
        />
      );
    }else {
      return null;
    }
  };

  btnStatus = () => {
    if(this.props.status === "import"){
      return "IMPORT"
    }else if(this.props.status === "create3"){
      return "CREATE"
    }else {
      return "NEXT"
    }
  };

  passwordStrengthMeter = () => {
    if(this.props.passwordValid === "1"){
      return (
        <div className={styles.passwordStrengthMeter1}></div>
      );
    }else if(this.props.passwordValid === "2"){
      return (
        <div className={styles.passwordStrengthMeter2}></div>
      );
    }else if(this.props.passwordValid === "3"){
      return (
        <div className={styles.passwordStrengthMeter3}></div>
      );
    }else if(this.props.passwordValid === "4"){
      return (
        <div className={styles.passwordStrengthMeter4}></div>
      );
    }else {
      return (
        <div className={styles.passwordStrengthMeter0}></div>
      );
    }
  };

  alertInfo = () => {
    if(this.props.AlertImportAccount){
      return <div className={styles.alertInfo}>{this.props.AlertImportAccount}</div>
    }else if(this.props.AlertImportAccountName){
      return <div className={styles.alertInfo}>{this.props.AlertImportAccountName}</div>
    }else if(this.props.AlertImportAccountPass){
      return <div className={styles.alertInfo}>{this.props.AlertImportAccountPass}</div>
    }else if(this.props.AlertImportAccountConfirmPass){
      return <div className={styles.alertInfo}>{this.props.AlertImportAccountConfirmPass}</div>
    }
  };

  render() {
    return (
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          className={styles.Modal}
          contentLabel="Account Modal"
          >
            <h3 ref={subtitle => this.subtitle = subtitle}>{this.props.status === "import" ? "IMPORT" : "CREATE"}</h3>
            <div className={styles.line}></div>
            <form>
              <div className={styles.descriptive}>account name</div>
              <input
                className={this.props.AlertImportAccountName ? styles.inputAlertName : styles.inputVal}
                placeholder={"a descriptive name for the account"}
                required
                maxLength={130}
                name="accountName"
                value={this.props.accountName}
                type={"text"}
                onChange={this.props.handleInput}
              />
              <div className={styles.descriptive}>password</div>
              <input
                type="password"
                class="form-control input-lg"
                id="password"
                className={this.props.AlertImportAccountPass || this.props.passwordValid === "0" ? styles.inputAlertPass : styles.inputVal}
                placeholder={"a strong, unique password"}
                required
                maxLength={130}
                name="password"
                value={this.props.password}
                type={"password"}
                onChange={this.props.handleInput}
              />
              <div className={styles.descriptive}>password(repeat)</div>
              <input
                className={this.props.AlertImportAccountConfirmPass ? styles.inputAlertPassConfirm : styles.inputVal}
                placeholder={"verify your password"}
                required
                maxLength={130}
                name="passwordConfirm"
                value={this.props.passwordConfirm}
                type={"password"}
                onChange={this.props.handleInput}
              />
            </form>
            <div className={styles.descriptive}>password strength</div>
            <div className={styles.passStrength}>
              {this.passwordStrengthMeter()}
            </div>
            <div class="pwstrength_viewport_progress"></div>
            {this.renderImportPassphrase()}
            {this.alertInfo()}
            <div className={styles.btnGroup}>
              <button className={styles.btn} onClick={this.props.closeModal}>CLOSE</button>
              <button className={styles.btn} onClick={this.props.createAccount1}>
                {this.btnStatus()}
              </button>
            </div>
        </Modal>
    );
  }
}
