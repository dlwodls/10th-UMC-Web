import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* store를 전역으로 공급 — 모든 컴포넌트에서 useSelector/useDispatch 사용 가능 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
