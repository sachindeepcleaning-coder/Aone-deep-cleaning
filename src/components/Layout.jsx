import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import UrgencyBar from './UrgencyBar.jsx';
import StickyMobileBar from './StickyMobileBar.jsx';
import WaNudge from './WaNudge.jsx';

export default function Layout({ children, page, file }) {
  return (
    <>
      <UrgencyBar page={page} />
      <Nav file={file} />
      <main id="main">{children}</main>
      <Footer file={file} />
      <StickyMobileBar />
      <WaNudge />
    </>
  );
}