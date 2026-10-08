import React, { useState } from "react";
import { departmentMap } from "@/lib/yangjuData";

const DEPTS = ["Demo 도로관리팀", "Demo 교통관리팀", "Demo 시설관리팀", "Demo 물관리팀"];

export default function AdminAssign({ c }) {
  const rep = c.reports.find((r) => r.id === c.selectedId) || c.reports[0];
  const rec = departmentMap[rep.category] || { department: "Demo 종합민원팀", reason: "기본 담당 부서" };
  const [dept, setDept] = useState(DEPTS.includes(rep.currentDepartment) ? rep.currentDepartment : DEPTS[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => c.navigateTo("A-02")} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition font-semibold flex items-center space-x-1">
          <i className="fa-solid fa-arrow-left mr-1"></i> 민원 상세로
        </button>
        <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full">담당 부서 지정 및 이관 관리</span>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
        <div className="border-b pb-3">
          <h3 className="font-bold text-slate-900 text-base">민원 번호: {rep.id}</h3>
          <p className="text-xs text-slate-500">신고 유형: {rep.category}</p>
        </div>
        <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl space-y-1">
          <span className="text-xs font-bold text-yangju-800 block"><i className="fa-solid fa-robot mr-1"></i> AI 추천 담당 부서</span>
          <div className="text-sm font-bold text-yangju-900">{rec.department}</div>
          <p className="text-xs text-yangju-700 pt-1 border-t border-yangju-200">{rec.reason}</p>
        </div>
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">담당 부서 선택 (관리자 최종 결정)</label>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full border border-slate-300 rounded-2xl p-4 text-sm bg-slate-50 focus:outline-none focus:border-yangju-600 font-semibold">
            {DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <p className="text-[11px] text-slate-500">※ AI 추천과 다른 부서를 선택할 경우 재배정 횟수(reassignmentCount)가 자동으로 증가하며 핑퐁 민원으로 감지될 수 있습니다.</p>
        </div>
      </div>

      <button onClick={() => c.assignDept(rep.id, dept)} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition text-base flex items-center justify-center space-x-2">
        <i className="fa-solid fa-check-double"></i>
        <span>담당 부서 지정 완료 (ASSIGNED 상태로 변경)</span>
      </button>
    </div>
  );
}