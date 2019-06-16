import React from 'react';
import { connect } from 'react-redux';
import { startLogin, authProviders } from '../actions/auth';

export const LoginPage = ({ startGoogleLogin, startGithubLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <div className="box-layout__buttons">
        <button className="button" onClick={startGoogleLogin}>Login with Google</button>
        <button className="button" onClick={startGithubLogin}>Login with Github</button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startLogin(authProviders.GOOGLE)),
  startGithubLogin: () => dispatch(startLogin(authProviders.GITHUB))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);