import React from "react";

const TIPS = {
  HIGH: ["red", ["링크를 절대 누르지 마세요.", "어떤 경우에도 돈을 이체하거나 송금하지 마세요.", "주민등록번호, 비밀번호, 인증번호를 알려주지 마세요.", "공식 기관(경찰 112, 금융감독원 1332) 대표번호로 직접 확인하세요."]],
  MEDIUM: ["amber", ["메시지 발신자를 다시 한 번 신중히 확인하세요.", "포함된 링크를 즉시 누르지 말고 공식 앱이나 웹을 통하세요.", "개인정보나 금융정보를 요구하면 절대 응하지 마세요."]],
  LOW: ["emerald", ["특이 위험 신호는 발견되지 않았으나, 낯선 출처의 연락은 항상 주의하세요."]],
};
const COLOR = { red: "text-red-600", amber: "text-amber-600", emerald: "text-emerald-600" };

export default function FraudResult({ c }) {
  const res = c.fraud.analysisResult;
  if (!res) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-slate-600 text-sm">분석된 메시지가 없습니다. 메시지를 먼저 입력해주세요.</p>
        <button onClick={() => c.navigateTo("C-07")} className="bg-amber-600 text-white px-6 py-3 rounded-xl text-xs font-bold">메시지 입력으로 가기</button>
      </div>
    );
  }

  let badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
  let iconClass = "fa-circle-check text-emerald-600";
  let titleText = "낮은 위험 (LOW)";
  let descText = "낮은 위험으로 분석되었으나, 안전한 메시지라는 의미는 아닙니다.";
  if (res.riskLevel === "HIGH") {
    badgeBg = "bg-red-100 text-red-800 border-red-300";
    iconClass = "fa-triangle-exclamation text-red-600";
    titleText = "높은 위험 (HIGH)";
    descText = "금융사기 의심 요소가 여러 개 발견되었습니다. 상대방의 요구에 바로 응하지 마세요.";
  } else if (res.riskLevel === "MEDIUM") {
    badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
    iconClass = "fa-circle-exclamation text-amber-600";
    titleText = "주의 (MEDIUM)";
    descText = "의심스러운 요소가 발견되었습니다. 추가 확인 후 대응하세요.";
  }
  const [tipColor, tips] = TIPS[res.riskLevel];
  const demo = (who, real) => () => c.alertBox(`공모전 시연용 화면입니다.\n실제 ${who}이(가) 접수되지 않습니다.\n(실제 운영 시 ${real})`);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">금융사기 위험 신호등 진단 결과</span>
        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border text-base font-bold shadow-sm ${badgeBg}`}>
          <i className={`fa-solid ${iconClass} text-xl`}></i>
          <span>{titleText}</span>
        </div>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">{descText}</p>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-xs font-bold text-slate-800"><i className="fa-solid fa-list-check text-amber-600 mr-1"></i> 규칙 기반 위험 신호 분석</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">탐지 점수: {res.riskScore}점</span>
        </div>
        <div className="space-y-2 pt-1">
          {res.ruleResults.map((rule) => (
            <div key={rule.id} className={`flex items-start space-x-2.5 p-2.5 rounded-xl border ${rule.detected ? "bg-red-50/50 border-red-200 text-red-900" : "bg-slate-50 border-slate-200 text-slate-500"} text-xs`}>
              <i className={`fa-solid ${rule.detected ? "fa-circle-check text-red-600" : "fa-circle-xmark text-slate-400"} mt-0.5`}></i>
              <div><strong>{rule.name}:</strong> {rule.detected ? rule.reason : "해당 없음"}</div>
            </div>
          ))}
        </div>
        {res.detectedUrls.length > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <span className="font-bold block"><i className="fa-solid fa-link mr-1"></i> 발견된 의심 링크 (URL)</span>
            <div className="font-mono bg-white p-2 rounded border border-amber-200 text-[11px] text-amber-700 break-all">
              {res.detectedUrls.map((u, i) => <div key={i}>{u}</div>)}
            </div>
            <p className="text-[10px] text-amber-800">※ 실제 접속 위험 방지를 위해 링크를 활성화하지 않았습니다.</p>
          </div>
        )}
      </div>

      <div className="bg-yangju-50 border border-yangju-200 p-5 rounded-3xl space-y-2">
        <div className="flex items-center space-x-2 text-yangju-900 font-bold text-xs">
          <i className="fa-solid fa-robot text-yangju-700"></i>
          <span>AI 보조 분석 결과</span>
        </div>
        <p className="text-xs text-yangju-800 leading-relaxed bg-white p-3.5 rounded-2xl border border-yangju-200">{res.aiResults}</p>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3">
        <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
          <i className="fa-solid fa-shield-halved text-amber-600"></i>
          <span>지금 해야 할 행동 요령</span>
        </h4>
        <ul className="text-xs text-slate-700 space-y-2 pl-2">
          {tips.map((t) => (
            <li key={t} className="flex items-start space-x-2"><span className={`${COLOR[tipColor]} font-bold`}>•</span><span>{t}</span></li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-slate-700 block">외부 기관 신고 및 상담 연결 (Demo 시연용)</span>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={demo("112 신고", "경찰청 112 연계")} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-2 rounded-xl text-xs transition text-center shadow-sm">
            <i className="fa-solid fa-phone-volume mb-1 block"></i> 112 신고
          </button>
          <button onClick={demo("118 상담", "KISA 118 연계")} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-2 rounded-xl text-xs transition text-center shadow-sm">
            <i className="fa-solid fa-headset mb-1 block"></i> 118 상담
          </button>
          <button onClick={demo("카드사 정지", "카드사 FDS 연계")} className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-2 rounded-xl text-xs transition text-center shadow-sm">
            <i className="fa-solid fa-credit-card mb-1 block"></i> 카드사 확인
          </button>
        </div>
      </div>

      <button onClick={() => c.navigateTo("C-01")} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-4 rounded-2xl transition text-base">홈으로 돌아가기</button>
    </div>
  );
}