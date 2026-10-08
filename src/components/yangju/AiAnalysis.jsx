import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { aiScenarios, suggestAlternatives, applyRiskUpgrade, getRiskLabel, getRiskBadgeClass } from "@/lib/yangjuData";

async function ensureUrl(src) {
  if (!src) return null;
  if (/^https?:\/\//.test(src)) return src;
  const blob = await (await fetch(src)).blob();
  const file = new File([blob], "masked.png", { type: blob.type || "image/png" });
  const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
  const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri, expires_in: 600 });
  return signed_url;
}

export default function AiAnalysis({ c }) {
  const p = c.pipeline;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ai, setAi] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      setConfirmed(null);
      try {
        const url = await ensureUrl(p.maskedImage || p.originalImage);
        if (!url) throw new Error("분석할 사진이 없습니다.");
        const resp = await base44.functions.invoke("analyzeReportImage", {
          imageUrl: url,
          location: p.location,
          description: p.description,
          riskContext: p.riskContext,
        });
        if (cancelled) return;
        const result = resp.data?.result || resp.data;
        if (!result || result.error) throw new Error(result?.error || "AI 분석 실패");
        setAi(result);
        c.patchPipeline({ aiResult: result });
      } catch (e) {
        if (cancelled) return;
        const msg = e?.message || String(e);
        setError(msg);
        const sc = aiScenarios[p.selectedScenarioKey];
        setAi({
          subCategory: sc.subCategory, category: sc.category, riskLevel: sc.riskLevel,
          confidence: sc.confidence, reasoning: sc.aiReason, draftContent: sc.draftContent, _fallback: true,
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, [p.selectedScenarioKey, retryKey]);

  const chooseAlt = (key) => {
    const sc = aiScenarios[key];
    const data = {
      subCategory: sc.subCategory, category: sc.category, riskLevel: sc.riskLevel,
      confidence: sc.confidence, reasoning: sc.aiReason, draftContent: sc.draftContent, _manual: true,
    };
    setAi(data);
    c.patchPipeline({ aiResult: data });
    setConfirmed(null);
  };

  if (loading || !ai) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl text-center space-y-3">
          <div className="inline-block animate-spin text-blue-600 text-3xl mb-1"><i className="fa-solid fa-spinner"></i></div>
          <h3 className="font-bold text-blue-900 text-base">보호된 사진(maskedImage)으로 AI 분석 중...</h3>
          <p className="text-xs text-blue-700">개인정보가 제거된 이미지를 AI가 분류하고 위험도를 산정 중입니다.</p>
        </div>
      </div>
    );
  }

  const up = applyRiskUpgrade(ai.riskLevel, p.riskContext);

  return (
    <div className="space-y-6">
      <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl flex items-center space-x-3">
        <div className="w-10 h-10 bg-yangju-600 text-white rounded-2xl flex items-center justify-center text-lg flex-shrink-0">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div>
          <h3 className="font-bold text-yangju-900 text-sm">
            AI 추천 분석 완료 {ai._fallback && <span className="text-amber-600 text-[11px]">(기본값 사용)</span>}{ai._manual && <span className="text-amber-600 text-[11px]">(수동 선택)</span>}
          </h3>
          <p className="text-xs text-yangju-700">AI는 추천할 뿐, 최종 신고 내용은 시민이 확인하고 결정합니다.</p>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-800">
          <i className="fa-solid fa-triangle-exclamation mr-1"></i> AI 분석 중 오류가 발생해 기본 분류를 표시합니다: {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">AI 분류 추천 항목</span>
          <span className="text-sm font-bold text-yangju-700 bg-yangju-50 px-3 py-1 rounded-xl border border-yangju-200">{ai.subCategory}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">분류 유형(대)</span>
          <span className="text-xs font-bold text-slate-700">{ai.category}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">AI 추천 위험도</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskBadgeClass(up.level)}`}>{getRiskLabel(up.level)}{up.upgraded ? " (상향)" : ""}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">분류 신뢰도</span>
          <span className="text-xs font-bold text-slate-700"><i className="fa-solid fa-gauge-high text-yangju-600 mr-1"></i> {ai.confidence}%</span>
        </div>
        {up.upgraded && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-2xl text-xs text-red-800 space-y-1">
            <div className="font-bold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> 위험도 상향 적용 ({getRiskLabel(ai.riskLevel)} → {getRiskLabel(up.level)})</div>
            <p>사유: {up.reasons.join(", ")}</p>
          </div>
        )}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block"><i className="fa-solid fa-magnifying-glass mr-1"></i> AI 판단 근거</span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl leading-relaxed border border-slate-200 whitespace-pre-line">{ai.reasoning}</p>
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
          <button onClick={() => setRetryKey((k) => k + 1)} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-3 rounded-2xl text-sm transition flex items-center justify-center space-x-1.5">
            <i className="fa-solid fa-wand-magic-sparkles"></i><span>AI 재분석 실행</span>
          </button>
          <p className="text-xs text-slate-600">또는 AI가 추천한 다른 항목을 선택하거나 전체 목록에서 골라주세요.</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestAlternatives(p.selectedScenarioKey).map((key) => {
              const a = aiScenarios[key];
              return (
                <button key={key} onClick={() => chooseAlt(key)} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-yangju-500 hover:bg-yangju-50 transition text-left">
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
                <button key={key} onClick={() => chooseAlt(key)} className={`p-2.5 text-xs rounded-xl border text-left ${p.selectedScenarioKey === key ? "bg-yangju-700 text-white border-yangju-700 font-bold" : "bg-white text-slate-700 border-slate-200"}`}>
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
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">{ai.draftContent}</div>
          <button onClick={() => c.navigateTo("C-05")} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
            <span>신고 내용 확인 및 수정하기</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}