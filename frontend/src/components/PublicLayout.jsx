import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicLayout({ page, setPage, utilisateur, deconnecter, children }) {
  return (
    <>
      <Navbar page={page} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter} />
      <main>{children}</main>
      <Footer setPage={setPage} />
    </>
  );
}

export default PublicLayout;
