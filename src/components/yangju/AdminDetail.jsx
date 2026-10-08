import React from "react";
import { departmentMap, getStatusLabel, getRiskLabel, getRiskBadgeClass, needsAttention } from "@/lib/yangjuData";

export default function AdminDetail({ c }) {
  const rep = c.reports.find((r) => r.id === c.selectedId) || c.reports[0];
  const attn = needsAttention(rep);
  const rec = departmentMap[rep.category] || { department: "Demo 종합민원팀", reason: "기본 담당 부서" };
  const riskColor = rep.riskLevel === "HIGH" ? "text-red-600" : rep.riskLevel === "MEDIUM" ? "text-amber-600" : "text-emerald-600";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => c.navigateTo("A-01")} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition font-semibold flex items-center space-x-1">
          <i className="fa-solid fa-arrow-left mr-1"></i> 민원 목록으로
        </button>
        <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full">관리자 상세 검토</span>
      </div>

      {attn && (
        <div className="bg-red-50 border-2 border-red-500 p-4 rounded-3xl text-red-900 text-xs space-y-2 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm text-red-700">
            <i className="fa-solid fa-triangle-exclamation text-base"></i>
            <span>⚠ 민원매니저 확인 필요 (핑퐁 민원 또는 기한 초과 감지)</span>
          </div>
          <p className="text-red-800 leading-relaxed">
            이 민원은 <strong>부서 재배정 횟수 {rep.reassignmentCount}회</strong> 또는 <strong>처리 기한 초과</strong> 조건에 해당하여 담당 매니저의 직접 검토가 필요합니다.
          </p>
        </div>
      )}

      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <span className="text-xs font-bold text-slate-500 block">민원 번호</span>
            <span className="text-lg font-bold text-slate-900">{rep.id}</span>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRiskBadgeClass(rep.riskLevel)}`}>AI 추천 위험도: {getRiskLabel(rep.riskLevel)}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div><span className="text-slate-500 block mb-0.5">신고 유형</span><span className="font-bold text-slate-900 text-sm">{rep.category}</span></div>
          <div><span className="text-slate-500 block mb-0.5">현재 처리 상태</span><span className="font-bold text-yangju-700 text-sm">{getStatusLabel(rep.status)}</span></div>
          <div><span className="text-slate-500 block mb-0.5">현재 담당 부서</span><span className="font-bold text-slate-900 text-sm">{rep.currentDepartment}</span></div>
          <div><span className="text-slate-500 block mb-0.5">부서 재배정 횟수</span><span className="font-bold text-slate-900 text-sm">{rep.reassignmentCount}회</span></div>
          <div className="col-span-2 pt-2 border-t border-slate-200">
            <span className="text-slate-500 block mb-0.5">발생 위치</span>
            <span className="font-bold text-slate-900"><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> {rep.location}</span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-slate-100 p-3 rounded-xl text-xs">
          <span className="text-slate-600 font-medium">Demo 기한 초과 테스트 시뮬레이션</span>
          <button onClick={() => c.toggleDeadline(rep.id)} className={`px-3 py-1.5 rounded-lg font-bold text-xs ${rep.deadlineExceeded ? "bg-red-600 text-white" : "bg-white text-slate-700 border border-slate-300"} transition`}>
            {rep.deadlineExceeded ? "기한 초과 켜짐 (해제하려면 클릭)" : "기한 초과 시뮬레이션"}
          </button>
        </div>

        <div className="text-xs bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex justify-between items-center">
          <div>
            <span className="font-bold text-amber-900 block">신고자 정보 (개인정보 보호 적용)</span>
            <span className="text-amber-800">성명: {rep.reporter.name} | 연락처: {rep.reporter.phone}</span>
          </div>
          <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-1 rounded font-semibold">비식별화 완료</span>
        </div>

        <div className="bg-gradient-to-r from-yangju-50 to-blue-50 border border-yangju-200 p-5 rounded-3xl space-y-3">
          <div className="flex items-center space-x-2 text-yangju-900 font-bold text-xs">
            <i className="fa-solid fa-building-user text-yangju-700 text-base"></i>
            <span>AI 추천 부서 vs 관리자 최종 결정</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-yangju-200 shadow-sm space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">🤖 AI 추천 담당 부서</span>
              <span className="font-bold text-yangju-800 text-sm block">{rec.department}</span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1 border-t">{rec.reason}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-300 shadow-sm space-y-1">
              <span className="text-slate-700 font-semibold block text-[11px]">👤 관리자 최종 지정 부서</span>
              <span className="font-bold text-slate-900 text-sm block">{rep.currentDepartment}</span>
              <p className="text-slate-500 text-[11px] leading-relaxed pt-1 border-t">관리자가 최종 승인 또는 변경한 담당 부서입니다.</p>
            </div>
          </div>
        </div>

        {rep.reassignmentHistory.length > 0 && (
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 block"><i className="fa-solid fa-clock-rotate-left mr-1"></i> 부서 재배정 이력 ({rep.reassignmentHistory.length}회)</span>
            <div className="space-y-1.5 pt-1">
              {rep.reassignmentHistory.map((h, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border flex justify-between items-center text-[11px]">
                  <span>{i + 1}. <strong>{h.from}</strong> → <strong className="text-yangju-700">{h.to}</strong></span>
                  <span className="text-slate-400">{h.changedAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 block"><i className="fa-solid fa-shield-halved text-yangju-600 mr-1"></i> 현장 사진 (개인정보 보호된 maskedImage 우선 표시)</span>
          <div className="h-48 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-200">
            <img src={rep.maskedImage} alt="Admin Masked View" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 block">시민 제출 신고 내용</span>
          <p className="text-xs text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-mono">{rep.description}</p>
        </div>

        <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-yangju-900 font-bold text-xs">
            <i className="fa-solid fa-robot text-yangju-700"></i>
            <span>AI 추천 분석 결과 및 판단 근거</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-3 rounded-xl border border-yangju-200"><span className="text-slate-500 block mb-0.5">AI 추천 유형</span><span className="font-bold text-yangju-900">{rep.category}</span></div>
            <div className="bg-white p-3 rounded-xl border border-yangju-200"><span className="text-slate-500 block mb-0.5">AI 추천 위험도</span><span className={`font-bold ${riskColor}`}>{getRiskLabel(rep.riskLevel)}</span></div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-yangju-200 text-xs space-y-1">
            <span className="text-slate-500 font-bold block">AI 판단 근거</span>
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{rep.aiReason}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-md space-y-3">
        <span className="text-xs font-bold text-slate-700 block">관리자 업무 처리 액션</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button onClick={() => c.navigateTo("A-03")} className="bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center space-x-1.5 shadow-sm">
            <i className="fa-solid fa-user-gear"></i>
            <span>담당 부서 지정 / 변경</span>
          </button>
          {rep.status === "ASSIGNED" && (
            <button onClick={() => c.updateStatus(rep.id, "PROCESSING")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center space-x-1.5 shadow-sm">
              <i className="fa-solid fa-play"></i>
              <span>처리 시작 (PROCESSING)</span>
            </button>
          )}
          {rep.status === "PROCESSING" && (
            <button onClick={() => c.updateStatus(rep.id, "COMPLETED")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center space-x-1.5 shadow-sm">
              <i className="fa-solid fa-check"></i>
              <span>처리 완료 (COMPLETED)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}