import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { ToastProvider } from "./components/organisms/ToastProvider/ToastProvider";
import { ProgressProvider } from "./components/organisms/ProgressProvider/ProgressProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ProgressProvider>
          <AppRouter />
        </ProgressProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
