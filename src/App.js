import Main from './Main'
import './App.css';
import 'antd/dist/antd.css';
import {UserProvider} from "./context/UserContext"

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Main/>
      </UserProvider>
    </div>
  );
}

export default App;
