import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import styles from "../layout.module.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
