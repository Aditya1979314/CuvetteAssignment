import React, { useState } from 'react';
import { ReactComponent as Cuvette } from './cuvette.svg';

export function Dashboardnavbar() {
  const [isOpen, setIsOpen] = useState(false);

  function clearToken() {
    localStorage.removeItem('token');
  }

  return (
    <div className='w-screen flex justify-between px-4 border-b-2 border-black'>
      <Cuvette className="w-[80px] h-[80px]" />
      <div className='flex items-center justify-center gap-2'>
        <div>CONTACT</div>
        <div className='relative inline-block'>
          <button 
            className='border-2 border-black' 
            onClick={() => setIsOpen(prev => !prev)}
          >
            Your Name
          </button>
          {isOpen && (
            <div className='border-2 border-black absolute left-0 top-full mt-1 z-10'>
              <div>Your Name</div>
              <button onClick={clearToken}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
