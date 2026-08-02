import AppRouter from "./router/AppRouter";
import { LogInOutProvider } from "./context/LogInOutContext";

import "./App.css";

const App = () => {
  return (
    <div>
      <LogInOutProvider>
        <AppRouter />
      </LogInOutProvider>
    </div>
  );
};

export default App;
