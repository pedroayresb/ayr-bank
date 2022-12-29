import React from 'react';
import NavigationButtons from './NavigationButtons';

export default function LoadingContainer() {
  return (
    <div className="flex flex-col h-screen bg-offwhite grow">
      <NavigationButtons />
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white p-20">
        <div className="mb-10 w-34">
            <img src="https://i.imgur.com/1zZsF8X.png" alt="logo" className="w-24" />
        </div> 
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-light-purple"></div>
      </div>
    </div>
  );
}
