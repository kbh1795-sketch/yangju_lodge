import React, { useEffect, useState } from "react";
import { aiScenarios } from "@/lib/yangjuData";

export default function AiAnalysis({ c }) {
  const sc = aiScenarios[c.pipeline.selectedScenarioKey];
  const [step, setStep] = useState(0); // 0,1 loading; 2 done

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (step < 2) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl text-center space-y-3">
          <div className="inline-block animate-spin text-blue-600 text-3xl mb-1"><i className="fa-solid fa-spinner"></i></div>
          <h3 className="font-bold text-blue-900 text-base">보호된 사진(maskedImage)으로 AI 분석 중...</h3>
          <p className="text-xs text-blue-700">
            {step === 0 ? "개인정보가 제거된 이미지로 안전 유형을 분류합니다." : "보호된 이미지(maskedImage)의 안전 위험도를 산출 중입니다..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl flex items-center space-x-3">
        <div className="w-10 h-10 bg-yangju-600 text-white rounded-2xl flex items-center justify-center text-lg flex-shrink-0">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div>
          <h3 className="font-bold text-yangju-900 text-sm">AI 추천 분석 완료 (maskedImage 검증됨)</h3>
          <p className="text-xs text-yangju-700">AI는 추천할 뿐, 최종 신고 내용은 시민이 확인하고 결정합니다.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">AI 분류 추천 유형</span>
          <span className="text-sm font-bold text-yangju-700 bg-yangju-50 px-3 py-1 rounded-xl border border-yangju-200">{sc.category}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">AI 추천 위험도</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${sc.riskBadgeColor}`}>AI 추천: {sc.riskLabel}</span>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block"><i className="fa-solid fa-magnifying-glass mr-1"></i> AI 판단 근거</span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl leading-relaxed border border-slate-200 whitespace-pre-line">{sc.aiReason}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-800"><i className="fa-solid fa-file-lines mr-1 text-yangju-600"></i> AI 작성 신고문 초안</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">시민 수정 가능</span>
        </div>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">{sc.draftContent}</div>
      </div>

      <button onClick={() => c.navigateTo("C-05")} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
        <span>신고 내용 확인 및 수정하기</span>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}