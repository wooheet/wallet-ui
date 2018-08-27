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
  }
  render() {
    const {

    } = this.props;
    return (
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          className={styles.Modal}
          contentLabel="Account Modal"
          >
            <h3 ref={subtitle => this.subtitle = subtitle}>{this.props.status === "create" ? "CREATE" : "IMPORT"}</h3>
            <div className={styles.line}></div>
            <form>
              <input />
            </form>
            <button onClick={this.props.closeModal}>close</button>
        </Modal>
    );
  }
}
