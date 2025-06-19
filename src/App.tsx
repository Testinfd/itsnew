import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Components
import Layout from '@/components/layout/Layout';

// Pages - Lazy loaded for better performance
const News = lazy(() => import('@/pages/News'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect root to news */}
        <Route index element={<Navigate to="/news" replace />} />
        
        {/* News Routes */}
        <Route path="news" element={
          <Suspense fallback={<div className="flex items-center justify-center min-h-[70vh]">Loading...</div>}>
            <News />
          </Suspense>
        } />
        
        {/* Article Detail Route */}
        <Route path="news/article/:articleId" element={
          <Suspense fallback={<div className="flex items-center justify-center min-h-[70vh]">Loading...</div>}>
            <ArticleDetail />
          </Suspense>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={
          <Suspense fallback={<div className="flex items-center justify-center min-h-[70vh]">Loading...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App; 