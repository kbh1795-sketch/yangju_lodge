import React from "react";

export default function AppHeader({ title, subtitle, showBack, onBack, onReset }) {
  return (
    <header className="bg-yangju-700 text-white px-5 py-4 flex items-center justify-between shadow-md z-10">
      <div className="flex items-center space-x-3">
        {showBack && (
          <button onClick={onBack} className="text-white hover:bg-yangju-600 p-2 rounded-lg transition text-lg">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-xs text-yangju-100">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onReset} title="Demo 데이터 초기화" className="text-[10px] bg-yangju-800 hover:bg-yangju-900 text-yangju-100 px-2 py-1 rounded border border-yangju-600 transition flex items-center space-x-1">
          <i className="fa-solid fa-rotate-right"></i>
          <span>초기화</span>
        </button>
        <div className="text-xs bg-yangju-800 px-2.5 py-1 rounded-full font-medium">DEMO</div>
      </div>
    </header>
  );
}