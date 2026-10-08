import React, { useState } from "react";
import {
  initialReportsData, initialPipeline, aiScenarios, fraudTestScenarios, departmentMap,
  analyzeFraudMessage, screenMeta, needsAttention,
} from "@/lib/yangjuData";
import SelectMode from "@/components/yangju/SelectMode";
import CitizenHome from "@/components/yangju/CitizenHome";
import PhotoSelect from "@/components/yangju/PhotoSelect";
import PrivacyMask from "@/components/yangju/PrivacyMask";
import AiAnalysis from "@/components/yangju/AiAnalysis";
import ReportConfirm from "@/components/yangju/ReportConfirm";
import MyReports from "@/components/yangju/MyReports";
import FraudInput from "@/components/yangju/FraudInput";
import FraudResult from "@/components/yangju/FraudResult";
import AdminList from "@/components/yangju/AdminList";
import AdminDetail from "@/components/yangju/AdminDetail";
import AdminAssign from "@/components/yangju/AdminAssign";
import MockSms from "@/components/yangju/MockSms";
import AppHeader from "@/components/yangju/AppHeader";
import BottomNav from "@/components/yangju/BottomNav";
import AlertModal from "@/components/yangju/AlertModal";

const SCREENS = {
  SELECT_MODE: SelectMode, "C-01": CitizenHome, "C-02": PhotoSelect, "C-03": PrivacyMask,
  "C-04": AiAnalysis, "C-05": ReportConfirm, "C-06": MyReports, "C-07": FraudInput,
  "C-08": FraudResult, "C-09": MockSms, "A-01": AdminList, "A-02": AdminDetail, "A-03": AdminAssign,
};

const nowStr = () => new Date().toISOString().slice(0, 16).replace("T", " ");
const clone = (x) => JSON.parse(JSON.stringify(x));

export default function Home() {
  const [view, setView] = useState("SELECT_MODE");
  const [history, setHistory] = useState([]);
  const [userMode, setUserMode] = useState("none");
  const [selectedId, setSelectedId] = useState(null);
  const [adminFilter, setAdminFilter] = useState("ALL");
  const [reports, setReports] = useState(clone(initialReportsData));
  const [pipeline, setPipeline] = useState(clone(initialPipeline));
  const [fraud, setFraud] = useState({ inputMessage: "", analysisResult: null });
  const [alertMsg, setAlertMsg] = useState(null);

  const alertBox = (msg) => setAlertMsg(msg);
  const patchPipeline = (patch) => setPipeline((p) => ({ ...p, ...(typeof patch === "function" ? patch(p) : patch) }));

  const navigateTo = (id) => {
    if (view !== "SELECT_MODE" && view !== id) setHistory((h) => [...h, view]);
    setView(id);
  };

  const switchMode = (mode) => {
    setHistory([]);
    setSelectedId(null);
    if (mode === "citizen") { setUserMode("citizen"); setView("C-01"); }
    else if (mode === "admin") { setUserMode("admin"); setView("A-01"); }
    else { setUserMode("none"); setView("SELECT_MODE"); }
  };

  const goBack = () => {
    if (history.length > 0) { setView(history[history.length - 1]); setHistory((h) => h.slice(0, -1)); }
    else switchMode("select");
  };

  const resetDemo = () => {
    setReports(clone(initialReportsData));
    setPipeline(clone(initialPipeline));
    setFraud({ inputMessage: "", analysisResult: null });
    alertBox("Demo 데이터가 초기 상태로 복구되었습니다.");
  };

  const resetPipelineFor = (key) => {
    const sc = aiScenarios[key];
    return { selectedScenarioKey: key, originalImage: sc.defaultImageUrl, hasDetectedFaces: sc.hasFaces, autoMaskedImage: null, manualMasks: [], maskedImage: null, pipelineStatus: "IDLE", riskContext: { childZone: false, night: false, rain: false, elderly: false } };
  };

  const c = {
    view, userMode, reports, pipeline, fraud, selectedId, adminFilter,
    setSelectedId, setAdminFilter, setFraud, patchPipeline, alertBox, navigateTo, switchMode, goBack,
    startNewReport: () => { patchPipeline(resetPipelineFor(pipeline.selectedScenarioKey)); navigateTo("C-02"); },
    selectScenario: (key) => patchPipeline(resetPipelineFor(key)),
    handleFileSelect: (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
        alertBox("이미지 파일(JPG, JPEG, PNG, WEBP)만 업로드할 수 있습니다.");
        e.target.value = "";
        return;
      }
      patchPipeline({ originalImage: URL.createObjectURL(file), hasDetectedFaces: true, autoMaskedImage: null, manualMasks: [], maskedImage: null, pipelineStatus: "IDLE" });
    },
    clearImage: () => patchPipeline({ originalImage: null, autoMaskedImage: null, maskedImage: null, pipelineStatus: "IDLE" }),
    runAutoMask: () => patchPipeline((p) => ({ autoMaskedImage: p.originalImage, maskedImage: p.originalImage, pipelineStatus: p.hasDetectedFaces ? "AUTO_MASKING_DONE" : "NO_FACES_DETECTED" })),
    proceedToPrivacy: () => {
      if (!pipeline.originalImage) { alertBox("사진을 먼저 선택해주세요."); return; }
      patchPipeline((p) => ({ autoMaskedImage: p.originalImage, maskedImage: p.originalImage, pipelineStatus: p.hasDetectedFaces ? "AUTO_MASKING_DONE" : "NO_FACES_DETECTED" }));
      navigateTo("C-03");
    },
    resetManualMasks: () => patchPipeline((p) => ({ manualMasks: [], pipelineStatus: p.hasDetectedFaces ? "AUTO_MASKING_DONE" : "NO_FACES_DETECTED" })),
    finalizeMasking: () => {
      patchPipeline((p) => ({ maskedImage: p.maskedImage || p.autoMaskedImage || p.originalImage, pipelineStatus: "READY" }));
      navigateTo("C-04");
    },
    submitReport: (desc) => {
      const sc = aiScenarios[pipeline.selectedScenarioKey];
      const rec = departmentMap[sc.category] || { department: "Demo 종합민원팀" };
      const id = "YJ-DEMO-" + String(reports.length + 1).padStart(3, "0");
      const rep = {
        id, category: sc.category, riskLevel: sc.riskLevel, image: pipeline.originalImage, maskedImage: pipeline.maskedImage,
        location: pipeline.location, description: desc, aiReason: sc.aiReason, recommendedDepartment: rec.department,
        currentDepartment: "미지정", status: "RECEIVED", reassignmentHistory: [], reassignmentCount: 0,
        deadlineExceeded: false, managerAttention: false, reporter: { name: "시*민", phone: "010-****-7890" }, createdAt: nowStr(),
      };
      setReports((r) => [rep, ...r]);
      alertBox(`신고가 성공적으로 접수되었습니다.\n신고번호: ${id}\n(관리자 대시보드와 즉시 동기화되었습니다)`);
      navigateTo("C-06");
    },
    loadFraudTest: (type) => setFraud((f) => ({ ...f, inputMessage: fraudTestScenarios[type] })),
    runFraudAnalysis: () => {
      const msg = fraud.inputMessage.trim();
      if (!msg) { alertBox("분석할 의심 메시지를 입력해주세요."); return; }
      setFraud({ inputMessage: msg, analysisResult: analyzeFraudMessage(msg) });
      navigateTo("C-08");
    },
    assignDept: (id, dept) => {
      setReports((rs) => rs.map((r) => {
        if (r.id !== id) return r;
        const hist = [...r.reassignmentHistory];
        let count = r.reassignmentCount;
        if (r.currentDepartment !== "미지정" && r.currentDepartment !== dept) {
          hist.push({ from: r.currentDepartment, to: dept, changedAt: nowStr() });
          count += 1;
        } else if (r.currentDepartment === "미지정") {
          hist.push({ from: "미지정", to: dept, changedAt: nowStr() });
        }
        const next = { ...r, currentDepartment: dept, status: "ASSIGNED", reassignmentHistory: hist, reassignmentCount: count };
        return { ...next, managerAttention: needsAttention(next) };
      }));
      alertBox(`담당 부서가 [${dept}](으)로 지정되었습니다.\n(상태가 ASSIGNED로 변경됨)`);
      navigateTo("A-02");
    },
    updateStatus: (id, status) => {
      setReports((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
      const label = { PROCESSING: "처리 중", COMPLETED: "완료" }[status];
      alertBox(`민원 처리 상태가 [${label}](으)로 변경되었습니다.`);
    },
    toggleDeadline: (id) => setReports((rs) => rs.map((r) => {
      if (r.id !== id) return r;
      const next = { ...r, deadlineExceeded: !r.deadlineExceeded };
      return { ...next, managerAttention: needsAttention(next) };
    })),
  };

  const Screen = SCREENS[view];
  const [title, subtitle] = screenMeta[view];

  return (
    <div className="bg-slate-100 text-slate-800 antialiased min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex-1 flex flex-col max-w-md md:max-w-4xl mx-auto w-full bg-white shadow-xl min-h-screen relative overflow-hidden">
        <AppHeader title={title} subtitle={subtitle} showBack={!["SELECT_MODE", "C-01", "A-01"].includes(view)} onBack={goBack} onReset={resetDemo} />
        <main className="flex-1 overflow-y-auto p-5 pb-24">
          <Screen key={view === "C-04" ? `${view}-${c.pipeline.selectedScenarioKey}` : view} c={c} />
        </main>
        <BottomNav mode={view === "SELECT_MODE" ? "none" : userMode} navigateTo={navigateTo} switchMode={switchMode} />
      </div>
      <AlertModal message={alertMsg} onClose={() => setAlertMsg(null)} />
    </div>
  );
}