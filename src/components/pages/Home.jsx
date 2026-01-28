import React from "react";

/* HOME SECTIONS */
import HomeHero from "../Home/HomeHero/HomeHero";
import HowItWorks from "../Home/HowItWorks/HowItWorks";
import WhyChooseUs from "../Home/WhyChooseUs/WhyChooseUs";
import TrustSafety from "../Home/TrustSafety/TrustSafety";
import ImpactStats from "../Home/ImpactStats/ImpactStats";
import Stats from "../Home/Stats/Stats";
import DonorCTA from "../Home/DonorCTA/DonorCTA";
import Testimonials from "../Home/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <HomeHero />
      <HowItWorks />
      <WhyChooseUs />
      <TrustSafety />
      <ImpactStats />
      <Stats />
      <DonorCTA />
      <Testimonials />
    </>
  );
};

export default Home;
