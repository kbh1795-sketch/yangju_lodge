import React from "react";

export default function SelectMode({ c }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-20 h-20 bg-yangju-100 text-yangju-700 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm">
        <i className="fa-solid fa-shield-halved"></i>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">양주 생활안전 원스톱</h2>
      <p className="text-slate-600 mb-8 leading-relaxed max-w-sm text-base">
        “신고는 한 번에, 사기는 먼저.<br />
        <strong className="text-yangju-700">AI가 먼저 정리하고, 사람은 결정합니다.</strong>”
      </p>
      <div className="w-full space-y-4 max-w-xs">
        <button onClick={() => c.switchMode("citizen")} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center space-x-3 text-lg">
          <i className="fa-solid fa-user-shield"></i>
          <span>시민으로 이용하기</span>
        </button>
        <button onClick={() => c.switchMode("admin")} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center space-x-3 text-lg">
          <i className="fa-solid fa-user-gear"></i>
          <span>관리자 화면 보기</span>
        </button>
      </div>
    </div>
  );
}