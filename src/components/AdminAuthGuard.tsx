'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authData = localStorage.getItem('auth') || sessionStorage.getItem('auth');
      
      if (!authData) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const parsedAuth = JSON.parse(authData);
        console.log('🔍 AdminAuthGuard checking auth:', parsedAuth); // Debug log
        // Check if user is logged in and has admin role (case insensitive)
        if (parsedAuth.isLoggedIn && (parsedAuth.role === 'ADMIN' || parsedAuth.role === 'admin')) {
          console.log('✅ Admin authentication successful');
          setIsAuthenticated(true);
        } else {
          console.log('❌ Admin authentication failed - role:', parsedAuth.role);
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading or nothing while checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Show default Next.js 404 page style with navbar and footer if not authenticated
  if (isAuthenticated === false) {
    return (
      <>
        <Navbar />
        <div className="bg-white dark:bg-gray-900" style={{
          fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <h1 style={{
              display: 'inline-block',
              margin: '0 20px 0 0',
              padding: '0 23px 0 0',
              fontSize: '24px',
              fontWeight: 500,
              verticalAlign: 'top',
              lineHeight: '49px',
              borderRight: '1px solid rgba(0, 0, 0, .3)',
              color: '#000'
            }} className="dark:!text-white dark:!border-r-white/30">
              404
            </h1>
            <div style={{ display: 'inline-block' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '49px',
                margin: 0,
                color: '#000'
              }} className="dark:!text-white">
                This page could not be found.
              </h2>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}
