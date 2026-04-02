import React from 'react';

import Contactuspath from '../ContactPath/Contactuspath';
import ContactHero from '../ContactHero/ContactHero';
import Contact from '../ContactCTA/Contact';
import Contactform from '../ContactForm/Contactform';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/footer';


const Contactus = () => {
  return (
    <>
    <Navbar/>
      <Contactuspath />
      <ContactHero />
      <Contact />
      <Contactform />
      <Footer/>
    </>
  );
};

export default Contactus;
