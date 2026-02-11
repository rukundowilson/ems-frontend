import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;