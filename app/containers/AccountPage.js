import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Accounts from 'components/Accounts';
import * as ActionAccounts from 'actions/accounts';

function mapStateToProps(state) {
  return {
    account: state.account
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionAccounts, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
