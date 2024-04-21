import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Profil from "../components/Profil";
import Connect from "../components/Connect";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() { // Mengubah nama fungsi menjadi Home
  return (
    <div >
      <Navbar/>
      <Hero/>
      <Profil/>
      <Connect/>
      <Features/>
      <Footer/>
    </div>
  );
}

export default Home; // Mengexport komponen sebagai Home
