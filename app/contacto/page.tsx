
import React from 'react';
import ContactPageHero from '@/components/layout/ContactPageHero';
import ContactForm from '@/components/shared/ContactForm';
import ContactInfoMap from '@/components/shared/ContactInfoMap';

const ContactPage = () => {
  return (
    <>
      <ContactPageHero />
      <ContactForm />
      <ContactInfoMap />
    </>
  );
};

export default ContactPage;
