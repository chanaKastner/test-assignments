import './App.css';
import { UsersTable } from './components/UsersTable';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
      <UsersTable></UsersTable>
      </Provider>
    </div>
  );
}

export default App;
