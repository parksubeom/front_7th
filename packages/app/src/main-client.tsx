import "./assets/index.css";
import { createRoot } from "react-dom/client"; // 👈 hydrateRoot 제거
import { App } from "./App.tsx";

const $root = document.getElementById("root")!;

function main() {
  const app = <App />;
  
  // 🗑️ 기존의 하이드레이션 분기 로직 삭제
  // if (import.meta.env.PROD) {
  //   hydrateRoot($root, app);
  // } else {
  //   createRoot($root).render(app);
  // }

  // ✅ [수정] 무조건 CSR로 렌더링 (기존 내용을 덮어씌움)
  createRoot($root).render(app);
}

main();