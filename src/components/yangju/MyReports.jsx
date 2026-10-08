import React from "react";
import { getStatusLabel, getRiskLabel, getRiskBadgeClass } from "@/lib/yangjuData";

function Detail({ rep, c }) {
  const steps = [
    ["RECEIVED", "fa-circle-check", "접수"],
    ["ASSIGNED", "fa-user-gear", "부서 배정"],
    ["PROCESSING", "fa-spinner", "처리 중"],
    ["COMPLETED", "fa-check-double", "완료"],
  ];
  const back = () => c.setSelectedId(null);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={back} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition font-semibold flex items-center space-x-1">
          <i className="fa-solid fa-arrow-left mr-1"></i> 목록으로 돌아가기
        </button>
        <span className="text-xs font-bold text-yangju-700 bg-yangju-50 px-3 py-1 rounded-full border border-yangju-200">상세 정보</span>
      </div>
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-xs font-bold text-slate-500">신고번호</span>
          <span className="text-sm font-bold text-yangju-700">{rep.id}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-3 border-b text-xs">
          <div>
            <span className="text-slate-500 block font-medium">신고 유형</span>
            <span className="font-bold text-slate-800 text-sm">{rep.category}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">현재 상태</span>
            <span className="font-bold text-yangju-700">{getStatusLabel(rep.status)}</span>
          </div>
        </div>
        <div className="space-y-1 pb-3 border-b text-xs">
          <span className="text-slate-500 font-medium">발생 위치</span>
          <p className="font-bold text-slate-800 text-sm"><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> {rep.location}</p>
        </div>
        <div className="space-y-1.5 pb-3 border-b">
          <span className="text-xs font-bold text-slate-500 block">개인정보 보호 사진 (maskedImage)</span>
          <div className="h-40 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-200">
            <img src={rep.maskedImage} alt="Protected Report Image" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block">신고 내용</span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed font-mono">{rep.description}</p>
        </div>
        <div className="space-y-2 pt-2 border-t">
          <span className="text-xs font-bold text-slate-700 block">처리 진행 상황</span>
          <div className="flex justify-between text-center text-[10px] text-slate-600 bg-slate-50 p-3 rounded-2xl border">
            {steps.map(([key, icon, label]) => (
              <div key={key} className={rep.status === key ? "text-yangju-700 font-bold" : ""}>
                <i className={`fa-solid ${icon} text-sm mb-1 block`}></i> {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={back} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 rounded-2xl transition text-base">목록으로 돌아가기</button>
    </div>
  );
}

export default function MyReports({ c }) {
  const sel = c.selectedId ? c.reports.find((r) => r.id === c.selectedId) : null;
  if (sel) return <Detail rep={sel} c={c} />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">나의 신고 내역</h3>
        <span className="text-xs bg-yangju-100 text-yangju-700 font-semibold px-2.5 py-1 rounded-full">총 {c.reports.length}건</span>
      </div>
      <div className="space-y-4">
        {c.reports.map((rep) => (
          <div key={rep.id} onClick={() => c.setSelectedId(rep.id)} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm hover:border-yangju-500 cursor-pointer transition space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">{rep.id}</span>
              <span className="bg-yangju-50 text-yangju-700 border border-yangju-200 text-xs px-2.5 py-1 rounded-full font-semibold">{getStatusLabel(rep.status)}</span>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-base">{rep.category}</h4>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getRiskBadgeClass(rep.riskLevel)}`}>AI 추천: {getRiskLabel(rep.riskLevel)}</span>
            </div>
            <p className="text-xs text-slate-600 truncate"><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> {rep.location}</p>
            <div className="pt-2 border-t flex justify-between items-center text-xs text-slate-500">
              <span>접수일시: {rep.createdAt}</span>
              <span className="text-yangju-600 font-semibold flex items-center space-x-1">
                <span>상세보기</span>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => c.navigateTo("C-01")} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-4 rounded-2xl transition text-base">홈으로 돌아가기</button>
    </div>
  );
}