import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
