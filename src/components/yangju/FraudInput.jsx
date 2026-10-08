import React from "react";

const TESTS = [
  ["prosecutor", "fa-scale-balanced text-red-600", "1. 검찰 사칭 피싱"],
  ["bank", "fa-building-columns text-amber-600", "2. 은행 개인정보 요구"],
  ["benefit", "fa-gift text-orange-600", "3. 의심 혜택/지원금 링크"],
  ["normal", "fa-comment text-emerald-600", "4. 일반 일상 대화"],
];

export default function FraudInput({ c }) {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl space-y-2">
        <h3 className="font-bold text-amber-900 text-base flex items-center space-x-2">
          <i className="fa-solid fa-triangle-exclamation text-amber-600"></i>
          <span>받은 문자나 메시지가 의심되나요?</span>
        </h3>
        <p className="text-amber-800 text-xs leading-relaxed">의심되는 문자나 메시지를 아래에 붙여넣어 주세요. 규칙 기반 분석과 AI 보조 분석으로 위험 신호를 먼저 진단해드립니다.</p>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600">테스트 메시지 시나리오 선택</label>
        <div className="grid grid-cols-2 gap-2">
          {TESTS.map(([key, icon, label]) => (
            <button key={key} onClick={() => c.loadFraudTest(key)} className="p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-amber-500 text-slate-700 font-medium transition text-left">
              <i className={`fa-solid ${icon} mr-1`}></i> {label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">의심 메시지 입력</label>
        <textarea rows={5} value={c.fraud.inputMessage} onChange={(e) => c.setFraud((f) => ({ ...f, inputMessage: e.target.value }))} className="w-full border border-slate-300 rounded-2xl p-4 text-xs font-mono leading-relaxed bg-slate-50 focus:outline-none focus:border-amber-500" placeholder="예: [국외발신] 자녀 긴급합격비용 입금 요망..." />
      </div>
      <button onClick={c.runFraudAnalysis} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
        <i className="fa-solid fa-shield-dog"></i>
        <span>위험 신호 분석하기</span>
      </button>
    </div>
  );
}