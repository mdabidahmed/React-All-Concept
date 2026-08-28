import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { ToastProvider } from "./components/organisms/ToastProvider/ToastProvider";
import { QuizSessionProvider } from "./components/organisms/QuizSessionProvider/QuizSessionProvider";
import { ConfirmProvider } from "./components/organisms/ConfirmProvider/ConfirmProvider";

// Strip a trailing slash (except for the root "/") so React Router's basename matches its expected format.
const basename = import.meta.env.BASE_URL.length > 1
  ? import.meta.env.BASE_URL.replace(/\/$/, "")
  : import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <ToastProvider>
        <ConfirmProvider>
          <QuizSessionProvider>
            <AppRouter />
          </QuizSessionProvider>
        </ConfirmProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
