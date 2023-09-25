import './input.css';
import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReplyProvider from './context/ReplyProvider';
function App() {
  const clientId = "269264329952-2dvro9tuvdelu7jk5ad62alnk4v5tsc2.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ReplyProvider>
        <div className="App">
          <Messenger />
        </div>
      </ReplyProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
