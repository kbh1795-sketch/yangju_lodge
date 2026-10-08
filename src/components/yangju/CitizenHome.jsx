import React from "react";

export default function CitizenHome({ c }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yangju-600 to-yangju-800 text-white p-6 rounded-3xl shadow-md">
        <span className="bg-yangju-500 text-white text-xs px-3 py-1 rounded-full font-medium">시민 안전 포털</span>
        <h2 className="text-xl font-bold mt-3">안녕하세요, 양주시민님!</h2>
        <p className="text-yangju-100 text-sm mt-1">불편한 생활안전 신고와 금융사기 예방을 한 곳에서 해결하세요.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div onClick={c.startNewReport} className="bg-white p-6 rounded-2xl border-2 border-yangju-500 hover:border-yangju-600 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-yangju-50 text-yangju-600 rounded-2xl flex items-center justify-center text-2xl mb-3">
            <i className="fa-solid fa-camera"></i>
          </div>
          <h3 className="font-bold text-slate-800 text-base">사진으로 신고하기</h3>
          <p className="text-slate-500 text-xs mt-1">현장 사진 선택 및 파이프라인</p>
        </div>
        <div onClick={() => c.navigateTo("C-07")} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-3">
            <i className="fa-solid fa-shield-dog"></i>
          </div>
          <h3 className="font-bold text-slate-800 text-base">금융사기 예방</h3>
          <p className="text-slate-500 text-xs mt-1">의심 문자·메시지 진단</p>
        </div>
      </div>
      <div onClick={() => c.navigateTo("C-06")} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-100 transition">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yangju-100 text-yangju-700 rounded-full flex items-center justify-center font-bold">{c.reports.length}</div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">나의 신고 내역 확인</h4>
            <p className="text-xs text-slate-500">현재 처리 상태 및 접수 내역 확인</p>
          </div>
        </div>
        <i className="fa-solid fa-chevron-right text-slate-400"></i>
      </div>
    </div>
  );
}