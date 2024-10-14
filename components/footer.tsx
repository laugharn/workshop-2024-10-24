import React from 'react';
import Auth from '@/components/auth';

const Footer: React.FC = () => {
  return (
    <footer>
      &copy;{new Date().getFullYear()}, all rights reserved. <Auth />
    </footer>
  );
};

export default Footer;