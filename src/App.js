import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import store from './store';
import { loginUser, handleRedirect } from './redux/actions/userActions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    dispatch(handleRedirect());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Reddit Minimal</p>
        <button onClick={() => dispatch(loginUser())}>Login with Reddit</button>
        {accessToken && <p>Access Token: {accessToken}</p>}
        {error && <p>Error: {error}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
