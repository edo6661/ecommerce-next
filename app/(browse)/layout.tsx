import Footer from "@/components/general/Footer";
import Navbar from "./_components/navbar/index";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default BrowseLayout;
