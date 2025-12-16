import "./assets/index.css";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.tsx";

const $root = document.getElementById("root")!;
function main() {
  const app = <App />;
  if (import.meta.env.PROD) {
    hydrateRoot($root, app);
  } else {
    createRoot($root).render(app);
  }
  $root.innerHTML = ""; 

  // 이제 깨끗한 도화지에 React 앱을 새로 그립니다.
  createRoot($root).render(app);
}
main();
