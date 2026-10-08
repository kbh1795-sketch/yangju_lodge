import React from "react";

export default function BottomNav({ mode, navigateTo, switchMode }) {
  if (mode === "citizen") {
    return (
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center shadow-lg z-20">
        <button onClick={() => navigateTo("C-01")} className="flex flex-col items-center text-slate-500 hover:text-yangju-700 transition">
          <i className="fa-solid fa-house text-lg"></i><span className="text-xs mt-1">홈</span>
        </button>
        <button onClick={() => navigateTo("C-06")} className="flex flex-col items-center text-slate-500 hover:text-yangju-700 transition">
          <i className="fa-solid fa-list-check text-lg"></i><span className="text-xs mt-1">내 신고</span>
        </button>
        <button onClick={() => switchMode("select")} className="flex flex-col items-center text-slate-400 hover:text-slate-700 transition">
          <i className="fa-solid fa-rotate text-lg"></i><span className="text-xs mt-1">모드전환</span>
        </button>
      </nav>
    );
  }
  if (mode === "admin") {
    return (
      <nav className="absolute bottom-0 left-0 right-0 bg-slate-900 text-white px-6 py-3 flex justify-around items-center shadow-lg z-20">
        <button onClick={() => navigateTo("A-01")} className="flex flex-col items-center text-slate-300 hover:text-white transition">
          <i className="fa-solid fa-folder-open text-lg"></i><span className="text-xs mt-1">민원 목록</span>
        </button>
        <button onClick={() => switchMode("select")} className="flex flex-col items-center text-amber-400 hover:text-amber-300 transition">
          <i className="fa-solid fa-right-from-bracket text-lg"></i><span className="text-xs mt-1">시민모드로</span>
        </button>
      </nav>
    );
  }
  return null;
}