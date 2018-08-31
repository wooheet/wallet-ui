// @flow
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountModal.css';
import Modal from 'react-modal';

export default class AccountModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showMnemonic:false,
      showConfirmPassphrase:false,
      confirmRecoveryPharse:false,
      recoveryPharse:"",
      word3:"",
      word6:"",
      word9:"",
      AlertLastConfirm:""
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this._showMnemonic = this._showMnemonic.bind(this);
    this._showConfirmPassphrase = this._showConfirmPassphrase.bind(this);
    this.wordCheck = this.wordCheck.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.closeLastPopup = this.closeLastPopup.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.closeLastPopup);
  }
  closeLastPopup = e => {
    if (!(e.key === "Escape" || e.keyCode === 27)) return
    console.log("asdf")
      this.setState({
        recoveryPharse:"",
        word3:"",
        word6:"",
        word9:"",
        AlertLastConfirm:""
      })
   }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fcfcfc';
    this.subtitle.style.marginLeft ='20px';
    this.subtitle.style.marginTop ='10px';
    this.subtitle.style.fontStyle= 'italic';
  }
  _showMnemonic(){
    this.setState({showMnemonic:true})
  }
  _showConfirmPassphrase(){
    this.props.createAccount2();
    this.setState({
      showConfirmPassphrase:true,
      showMnemonic:false
    })
  }
  renderImportPassphrase = () => {
    if(this.props.status === "import"){
      return (
        <div>
          <input
            className={styles.importPassphrase}
            placeholder={"PASSPHRASE"}
            required
            maxLength={130}
            name="importMnemonic"
            value={this.props.importMnemonic}
            type={"text"}
            onChange={this.props.handleInput}
          />
          <div className={styles.descriptive}>
            Use a few words, avoid common phrases No need for symbols, digits, or uppercase letters
          </div>
        </div>
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

  createAccount = () => {
    if(this.props.status === "create1" || this.props.status === "import") {
      return (
          <div>
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
        </div>
      );
    }else if(this.state.showMnemonic){
      return (
        <div>
          <div className={styles.createInfo}>
            Before proceeding further, first BACKUP THE PASSPHRASE SECURELY, this client does NOT store it and thus cannot recover your passphrase! If you lose it, delete it, or it gets stolen - we CANNOT help you recover it. There is no forgot my passphrase option!
          </div>
          <div className={styles.passphrase}>
            Passphrase
          </div>
          <div className={styles.mnemonicInfo}>
            {this.props.mnemonic}
          </div>
          <div className={styles.confirmPassphrase}>
            Type "I have written down the pharse" below to confirm it is backed up.
          </div>
          <div>
            <input
              className={this.state.confirmRecoveryPharse ? styles.inputVal : styles.inputAlertPass}
              placeholder={"the account recovery phrase"}
              required
              maxLength={130}
              name="recoveryPharse"
              value={this.state.recoveryPharse}
              type={"text"}
              onChange={this.handleInput}
            />
          </div>
        </div>
      );
    }else if(this.state.showConfirmPassphrase){
      return (
        <div>
          <div className={styles.confirmInfo}>
            Please type word 3, 6 and 9 from your passphrase to validate the account creation.
          </div>
          <div className={styles.lastConfirmPassphrase}>
            Passphrase
          </div>
          <div>
            <input
              className={this.state.AlertLastConfirm ? styles.inputAlertPass : styles.confirmPassPhraseInputVal}
              placeholder={"word3"}
              required
              maxLength={130}
              name="word3"
              value={this.state.word3}
              type={"text"}
              onChange={this.handleInput}
            />
            <input
              className={this.state.AlertLastConfirm ? styles.inputAlertPass : styles.confirmPassPhraseInputVal}
              placeholder={"word6"}
              required
              maxLength={130}
              name="word6"
              value={this.state.word6}
              type={"text"}
              onChange={this.handleInput}
            />
            <input
              className={this.state.AlertLastConfirm ? styles.inputAlertPass : styles.confirmPassPhraseInputVal}
              placeholder={"word9"}
              required
              maxLength={130}
              name="word9"
              value={this.state.word9}
              type={"text"}
              onChange={this.handleInput}
            />
          </div>
          <div className={styles.alertInfo}>{this.state.AlertLastConfirm}</div>
        </div>
      );
    }
  };


  handleInput = e => {
    if(e.target.name === "recoveryPharse" && e.target.value === "I have written down the pharse"){
      this.setState({
        confirmRecoveryPharse:true
      })
    }else{
      this.setState({
        confirmRecoveryPharse:false
      })
    }

    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    });
  };

  Loading() {
    return (
      <div className={styles.loading}/>
    )
  }

  wordCheck = () => {
    let wordSplit = this.props.mnemonic.split(" ");
    if(wordSplit[2]=== this.state.word3 && wordSplit[5]=== this.state.word6 && wordSplit[8]=== this.state.word9){
      this.props.createAccount3();
      this.setState({
        word3:"",
        word6:"",
        word9:"",
        AlertLastConfirm:""
      })
    }else {
      this.setState(() => {
        return {
            AlertLastConfirm:"The words does not match the original passphrase."
        };
      });
    }
    setTimeout(() =>{
      this.setState(() => {
          return {
            AlertLastConfirm:""
          };
      });
    }, 2000)

  }
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
            {this.createAccount()}
            <div class="pwstrength_viewport_progress"></div>
            {this.renderImportPassphrase()}
            {this.alertInfo()}
            {this.props.isloading ? this.Loading() : ""}
            <div className={styles.btnGroup}>
              <button className={styles.btn} onClick={this.props.closeModal}>CLOSE</button>
              <button className={styles.btn}
              onClick={() => {
                  if(this.props.status === "create1"){
                    this.props.createAccount1();
                    this._showMnemonic();
                  }else if(this.props.status === "create2" && this.state.confirmRecoveryPharse === true){
                    this._showConfirmPassphrase();
                  }else if(this.props.status === "create3"){
                    this.wordCheck();
                  }else if(this.props.status === "import"){
                    this.props.importAccount()
                  }
                }}
              >
                {this.btnStatus()}
              </button>
            </div>
        </Modal>
    );
  }
}
