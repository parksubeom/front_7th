import { queryClient } from "@/clients";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, StaticRouter } from "react-router";
import * as Pages from "@/pages";
import { BASE_URL } from "@/constants";
import { withBaseLayout } from "@/components";
import { AppDataProvider } from "@/providers";

interface Props {
  url?: string;
  ssr?: boolean;
}

const Home = withBaseLayout(Pages.Home);
const User = withBaseLayout(Pages.User);
const Assignments = withBaseLayout(Pages.Assignments);
const NotFound = withBaseLayout(() => <div className="p-6">404 - 페이지를 찾을 수 없습니다</div>);
const AssignmentDetail = withBaseLayout(Pages.AssignmentDetail);

export const App = ({ url = "", ssr = false }: Props) => {
  // 공통으로 들어가는 내부 라우트 정의
  const AppRoutes = (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/assignments/" Component={Assignments} />
      <Route path="/:id/" Component={User} />
      <Route path="/:id/assignment/:assignmentId/" Component={AssignmentDetail} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );

  // 공통 Provider 래퍼
  const withProviders = (children: React.ReactNode) => (
    <AppDataProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppDataProvider>
  );

  // 1. 서버 사이드 렌더링 (SSR/SSG) 인 경우
  if (ssr) {
    return withProviders(
      <StaticRouter location={url} basename={BASE_URL}>
        {AppRoutes}
      </StaticRouter>
    );
  }

  // 2. 클라이언트 사이드 렌더링 (Browser) 인 경우
  return withProviders(
    <BrowserRouter basename={BASE_URL}>
      {AppRoutes}
    </BrowserRouter>
  );
};
