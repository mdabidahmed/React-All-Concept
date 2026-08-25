import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { TopicPage } from "../pages/TopicPage/TopicPage";
import { QuizDashboardPage } from "../pages/QuizDashboardPage/QuizDashboardPage";
import { QuizPlayPage } from "../pages/QuizPlayPage/QuizPlayPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics/:topicId" element={<TopicPage />} />
        <Route path="/quiz" element={<QuizDashboardPage />} />
        <Route path="/quiz/:categoryId" element={<QuizPlayPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </MainLayout>
  );
}
