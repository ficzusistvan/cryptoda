import { connect } from 'react-redux'
import TestComponent from "../../components/Test.component"
import { setTest } from '../actions/testConfigs';

const mapStateToProps = state => {
  return {
    test: state.testConfigs.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTest: () => {
      dispatch(setTest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)