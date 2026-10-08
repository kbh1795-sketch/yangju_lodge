import React, { useEffect, useState } from "react";
import { aiScenarios, suggestAlternatives, applyRiskUpgrade, getRiskLabel, getRiskBadgeClass } from "@/lib/yangjuData";

export default function AiAnalysis({ c }) {
  const sc = aiScenarios[c.pipeline.selectedScenarioKey];
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [c.pipeline.selectedScenarioKey]);

  if (step < 2) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl text-center space-y-3">
          <div className="inline-block animate-spin text-blue-600 text-3xl mb-1"><i className="fa-solid fa-spinner"></i></div>
          <h3 className="font-bold text-blue-900 text-base">보호된 사진(maskedImage)으로 AI 분석 중...</h3>
          <p className="text-xs text-blue-700">
            {step === 0 ? "개인정보가 제거된 이미지로 안전 유형을 분류합니다." : "참고 사진과 유사도를 비교해 위험도를 산출 중입니다..."}
          </p>
        </div>
      </div>
    );
  }

  const up = applyRiskUpgrade(sc.riskLevel, c.pipeline.riskContext);
  const alts = suggestAlternatives(c.pipeline.selectedScenarioKey);

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
          <span className="text-xs font-bold text-slate-500">AI 분류 추천 항목</span>
          <span className="text-sm font-bold text-yangju-700 bg-yangju-50 px-3 py-1 rounded-xl border border-yangju-200">{sc.subCategory}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">분류 유형(대)</span>
          <span className="text-xs font-bold text-slate-700">{sc.category}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">AI 추천 위험도</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskBadgeClass(up.level)}`}>{getRiskLabel(up.level)}{up.upgraded ? " (상향)" : ""}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">분류 신뢰도</span>
          <span className="text-xs font-bold text-slate-700"><i className="fa-solid fa-gauge-high text-yangju-600 mr-1"></i> {sc.confidence}%</span>
        </div>
        {up.upgraded && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-2xl text-xs text-red-800 space-y-1">
            <div className="font-bold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> 위험도 상향 적용 ({getRiskLabel(sc.riskLevel)} → {getRiskLabel(up.level)})</div>
            <p>사유: {up.reasons.join(", ")}</p>
          </div>
        )}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block"><i className="fa-solid fa-magnifying-glass mr-1"></i> AI 판단 근거</span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl leading-relaxed border border-slate-200 whitespace-pre-line">{sc.aiReason}</p>
        </div>
      </div>

      {confirmed === null ? (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
            <i className="fa-solid fa-circle-question text-amber-600"></i>
            <span>이 분류가 맞으신가요?</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">AI 추천이 정확하지 않을 수 있습니다. 확인 후 진행하거나 다시 분석할 수 있어요.</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setConfirmed(true)} className="bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-3.5 rounded-2xl text-sm transition flex items-center justify-center space-x-1.5">
              <i className="fa-solid fa-check"></i><span>맞아요</span>
            </button>
            <button onClick={() => setConfirmed(false)} className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-3.5 rounded-2xl text-sm transition flex items-center justify-center space-x-1.5">
              <i className="fa-solid fa-rotate"></i><span>아니오 (재분석)</span>
            </button>
          </div>
        </div>
      ) : confirmed === false ? (
        <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <i className="fa-solid fa-shuffle text-yangju-600"></i>
            <span>다른 항목으로 다시 분석</span>
          </div>
          <p className="text-xs text-slate-600">AI가 추천한 다른 항목을 선택하거나 전체 목록에서 골라주세요.</p>
          <div className="grid grid-cols-1 gap-2">
            {alts.map((key) => {
              const a = aiScenarios[key];
              return (
                <button key={key} onClick={() => c.selectScenario(key)} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-yangju-500 hover:bg-yangju-50 transition text-left">
                  <div>
                    <div className="text-sm font-bold text-slate-800">{a.subCategory}</div>
                    <div className="text-[11px] text-slate-500">{a.category}</div>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getRiskBadgeClass(a.riskLevel)}`}>{getRiskLabel(a.riskLevel)}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setShowAll((s) => !s)} className="w-full text-xs text-yangju-700 font-semibold py-2">
            {showAll ? "전체 목록 닫기" : "전체 18개 항목 보기"}
          </button>
          {showAll && (
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {Object.entries(aiScenarios).map(([key, v]) => (
                <button key={key} onClick={() => c.selectScenario(key)} className={`p-2.5 text-xs rounded-xl border text-left ${c.pipeline.selectedScenarioKey === key ? "bg-yangju-700 text-white border-yangju-700 font-bold" : "bg-white text-slate-700 border-slate-200"}`}>
                  {v.subCategory}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setConfirmed(null)} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-2xl text-xs transition">이전으로</button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-yangju-800 font-bold text-sm">
            <i className="fa-solid fa-circle-check text-yangju-600"></i>
            <span>분류를 확인했습니다.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">{sc.draftContent}</div>
          <button onClick={() => c.navigateTo("C-05")} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
            <span>신고 내용 확인 및 수정하기</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}