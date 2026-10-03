import { lazy, Suspense } from 'react';
import { ThemeProvider } from './lib/theme.jsx';
import Layout from './components/Layout.jsx';
import { pageUrl } from './lib/site.js';

// Route-split: each page hydrates from its own JS chunk instead of one
// 600KB+ bundle. The prerendered HTML is identical, so there is no visual
// flash — React just attaches interactivity per page (see prerender-entry,
// which suspends until chunks resolve via renderToPipeableStream).
const IndexPage = lazy(() => import('./pages/IndexPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage.jsx'));
const ResidentialPage = lazy(() => import('./pages/ResidentialPage.jsx'));
const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));
const BookingPage = lazy(() => import('./pages/BookingPage.jsx'));
const PpcPage = lazy(() => import('./pages/PpcPage.jsx'));
const AllPagesPage = lazy(() => import('./pages/AllPagesPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage.jsx'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// Shared app tree used by BOTH the browser entry (src/bootstrap.jsx) and the
// prerender script (src/prerender-entry.jsx). Keeping this in one place means
// the static HTML Google receives is identical to what the browser hydrates.
export default function App({ page = 'index', file = 'index', serviceKey, bhk }) {
  let Page = ServicePage;
  if (page === 'index') Page = IndexPage;
  else if (page === 'contact') Page = ContactPage;
  else if (page === 'thank-you') Page = ThankYouPage;
  else if (page === 'residential') Page = ResidentialPage;
  else if (page === 'partners') Page = PartnersPage;
  else if (page === 'landing') Page = BookingPage;
  else if (page === 'ppc') Page = PpcPage;
  else if (page === 'allpages') Page = AllPagesPage;
  else if (page === 'about') Page = AboutPage;
  else if (page === 'blog') Page = BlogIndexPage;
  else if (page === 'article') Page = BlogArticlePage;
  else if (page === 'notfound') Page = NotFoundPage;

  return (
    <ThemeProvider>
      <Layout page={page} file={file}>
        <Suspense fallback={null}>
          <Page url={pageUrl(file)} file={file} serviceKey={serviceKey} bhk={bhk} />
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}
