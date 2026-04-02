import React from 'react';

import Contactuspath from '../ContactPath/Contactuspath';
import ContactHero from '../ContactHero/ContactHero';
import Contact from '../ContactCTA/Contact';
import Contactform from '../ContactForm/Contactform';
import Navbar from '../Navbar/Navbar';

const Contactus = () => {
  return (
    <>
    <Navbar/>
      <Contactuspath />
      <ContactHero />
      <Contact />
      <Contactform />
    </>
  );
};

export default Contactus;
