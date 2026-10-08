import React, { useState } from "react";
import { resolveClassification } from "@/lib/yangjuData";

export default function ReportConfirm({ c }) {
  const sc = resolveClassification(c.pipeline);
  const [desc, setDesc] = useState(c.pipeline.description || sc.draftContent);

  return (
    <div className="space-y-6">
      <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl">
        <h3 className="font-bold text-yangju-800 text-sm mb-1"><i className="fa-solid fa-clipboard-check mr-1"></i> 최종 신고 내용을 확인해주세요</h3>
        <p className="text-yangju-700 text-xs leading-relaxed">AI가 작성한 초안을 바탕으로 내용을 검토하고 필요시 수정 후 신고할 수 있습니다.</p>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-3 pb-3 border-b text-xs">
          <div>
            <span className="text-slate-500 block font-medium">신고 유형</span>
            <span className="font-bold text-slate-800 text-sm">{sc.category}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">AI 추천 위험도</span>
            <span className={`font-bold px-2 py-0.5 rounded text-xs ${sc.riskBadgeColor}`}>{sc.riskLabel}</span>
          </div>
        </div>
        <div className="space-y-1 pb-3 border-b text-xs">
          <span className="text-slate-500 font-medium">발생 위치</span>
          <p className="font-bold text-slate-800 text-sm"><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> {c.pipeline.location}</p>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">신고 내용 (직접 수정 가능)</label>
          <textarea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full border border-slate-300 rounded-2xl p-4 text-xs font-mono leading-relaxed bg-slate-50 focus:outline-none focus:border-yangju-600" />
        </div>
      </div>

      <button onClick={() => c.submitReport(desc)} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition text-base flex items-center justify-center space-x-2">
        <i className="fa-solid fa-paper-plane"></i>
        <span>최종 신고 제출하기</span>
      </button>
    </div>
  );
}