import Navbar from "../components/common/Navbar";
import Hero from "../components/hompage/Hero";
import Features from "../components/hompage/Features";
import CTA from "../components/hompage/CTA";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
