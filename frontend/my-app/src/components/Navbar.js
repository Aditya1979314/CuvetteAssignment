import React from 'react';
import { ReactComponent as Cuvette } from './cuvette.svg'

export function Navbar() {
    return (
        <div className='w-screen flex justify-between px-4'>
            <Cuvette className="w-[80px] h-[80px]"/>
            <div>CONTACT</div>
        </div>
    );
}
