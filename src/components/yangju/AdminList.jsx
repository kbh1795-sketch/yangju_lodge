import React from "react";
import { getStatusLabel, getRiskLabel, getRiskBadgeClass, needsAttention } from "@/lib/yangjuData";

const W = { HIGH: 3, MEDIUM: 2, LOW: 1 };
const FILTERS = [
  ["ALL", "전체", "bg-white text-slate-900 shadow-sm", "text-slate-600 hover:text-slate-900"],
  ["HIGH", "높음 (HIGH)", "bg-red-600 text-white shadow-sm", "text-slate-600 hover:text-red-700"],
  ["MEDIUM", "보통 (MEDIUM)", "bg-amber-500 text-white shadow-sm", "text-slate-600 hover:text-amber-700"],
  ["LOW", "낮음 (LOW)", "bg-emerald-600 text-white shadow-sm", "text-slate-600 hover:text-emerald-700"],
];

export default function AdminList({ c }) {
  let list = c.reports.filter((r) => c.adminFilter === "ALL" || r.riskLevel === c.adminFilter);
  list = [...list].sort((a, b) => {
    const aa = needsAttention(a), bb = needsAttention(b);
    if (aa && !bb) return -1;
    if (!aa && bb) return 1;
    const d = (W[b.riskLevel] || 0) - (W[a.riskLevel] || 0);
    if (d !== 0) return d;
    return new Date(b.createdAt.replace(" ", "T")) - new Date(a.createdAt.replace(" ", "T"));
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">민원 관리 대시보드</h3>
          <p className="text-xs text-slate-500">시민 제출 데이터 실시간 공유 및 핑퐁 민원 자동 감지</p>
        </div>
        <span className="text-xs bg-slate-900 text-white font-semibold px-3 py-1 rounded-full">총 {list.length}건</span>
      </div>

      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold">
        {FILTERS.map(([key, label, on, off]) => (
          <button key={key} onClick={() => c.setAdminFilter(key)} className={`flex-1 py-2 rounded-xl transition ${c.adminFilter === key ? on : off}`}>{label}</button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((rep) => {
          const attn = needsAttention(rep);
          return (
            <div key={rep.id} onClick={() => { c.setSelectedId(rep.id); c.navigateTo("A-02"); }} className={`bg-white border ${attn ? "border-red-500 ring-2 ring-red-100" : "border-slate-200"} p-5 rounded-3xl shadow-sm hover:border-slate-800 cursor-pointer transition space-y-3 relative`}>
              {attn && (
                <div className="absolute -top-3 left-5 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>⚠ 민원매니저 확인 필요</span>
                </div>
              )}
              <div className={`flex justify-between items-center ${attn ? "pt-1" : ""}`}>
                <span className="text-xs font-bold text-slate-500">{rep.id}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getRiskBadgeClass(rep.riskLevel)}`}>위험도: {getRiskLabel(rep.riskLevel)}</span>
                  <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-bold">{getStatusLabel(rep.status)}</span>
                </div>
              </div>
              <h4 className="font-bold text-slate-900 text-base">{rep.category}</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> {rep.location}</div>
                <div><i className="fa-solid fa-building text-slate-500 mr-1"></i> 담당: {rep.currentDepartment}</div>
              </div>
              <div className="pt-2 border-t flex justify-between items-center text-xs text-slate-500">
                <span>접수일시: {rep.createdAt}</span>
                <span className="text-slate-900 font-semibold flex items-center space-x-1">
                  <span>상세 검토</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}