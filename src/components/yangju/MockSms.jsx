import React, { useState } from "react";
import { fraudTestScenarios } from "@/lib/yangjuData";

const PRESETS = [
  ["prosecutor", "검찰 사칭", "fa-scale-balanced"],
  ["benefit", "지원금 링크", "fa-gift"],
  ["messenger", "메신저 가족 사칭", "fa-mobile-screen"],
];

export default function MockSms({ c }) {
  const [key, setKey] = useState("messenger");
  const msg = fraudTestScenarios[key];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-4 rounded-2xl">
        <h3 className="font-bold text-sm flex items-center space-x-2">
          <i className="fa-solid fa-mobile-screen-button"></i>
          <span>수신 문자 모의 알림 (시나리오 3 시연)</span>
        </h3>
        <p className="text-[11px] text-slate-300 mt-1">실제 휴대폰에 문자가 수신된 것처럼 알림을 시연합니다. 알림을 눌러 진단으로 연결해보세요.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600">알림으로 보여줄 시나리오 선택</label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map(([k, label, icon]) => (
            <button key={k} onClick={() => setKey(k)} className={`p-2.5 text-xs rounded-xl border flex flex-col items-center gap-1 ${key === k ? "bg-slate-800 text-white border-slate-800 font-bold" : "bg-white text-slate-700 border-slate-200"}`}>
              <i className={`fa-solid ${icon}`}></i><span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-5 rounded-3xl">
        <div className="text-center text-slate-400 text-[10px] mb-3">{new Date().toISOString().slice(0, 16).replace("T", " ")}</div>
        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs"><i className="fa-solid fa-comment-sms"></i></div>
              <div>
                <div className="text-xs font-bold text-slate-800">문자 메시지</div>
                <div className="text-[10px] text-slate-500">발신: 070-XXXX-1234</div>
              </div>
            </div>
            <span className="text-[10px] text-slate-400">지금</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{msg}</p>
        </div>
      </div>

      <button onClick={() => { c.loadFraudTest(key); c.navigateTo("C-07"); }} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
        <i className="fa-solid fa-shield-dog"></i>
        <span>이 문자 진단하기</span>
      </button>
      <button onClick={() => c.navigateTo("C-01")} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3.5 rounded-2xl transition text-sm">홈으로 돌아가기</button>
    </div>
  );
}