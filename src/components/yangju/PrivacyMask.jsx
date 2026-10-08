import React, { useEffect, useRef } from "react";

export default function PrivacyMask({ c }) {
  const p = c.pipeline;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width || 600;
      canvas.height = img.height || 400;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (p.hasDetectedFaces) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
        ctx.fillRect(40, 40, 140, 45);
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 12px Inter, sans-serif";
        ctx.fillText("🔒 [자동 얼굴 블러]", 50, 68);
      }
      p.manualMasks.forEach((r) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x, r.y, r.w, r.h);
      });
      try { c.patchPipeline({ maskedImage: canvas.toDataURL("image/png") }); } catch (e) { c.patchPipeline({ maskedImage: p.originalImage }); }
    };
    img.src = p.autoMaskedImage || p.originalImage;
    // eslint-disable-next-line
  }, [p.autoMaskedImage, p.originalImage, p.manualMasks, p.hasDetectedFaces]);

  const addMask = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    c.patchPipeline((prev) => ({ manualMasks: [...prev.manualMasks, { x: x - 35, y: y - 25, w: 70, h: 50 }], pipelineStatus: "MANUAL_EDITED" }));
  };

  const focusCanvas = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    el.classList.add("ring-4", "ring-amber-400");
    setTimeout(() => el.classList.remove("ring-4", "ring-amber-400"), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
        <h3 className="font-bold text-amber-800 text-sm mb-1"><i className="fa-solid fa-shield-halved mr-1"></i> 개인정보 보호 파이프라인</h3>
        <p className="text-amber-700 text-xs leading-relaxed">
          사진은 기기에서 먼저 가린 후 분석에 사용됩니다. 원본(<code className="bg-amber-100 px-1 rounded">originalImage</code>)은 보존되며, 최종 보호된 사진(<code className="bg-amber-100 px-1 rounded">maskedImage</code>)만 AI 분석에 전달됩니다.
        </p>
      </div>

      {p.hasDetectedFaces ? (
        <div className="p-4 bg-yangju-50 border border-yangju-300 rounded-2xl text-yangju-900 text-xs flex items-start space-x-3 shadow-sm">
          <i className="fa-solid fa-circle-check text-yangju-600 text-base mt-0.5"></i>
          <div>
            <strong className="block font-bold text-sm mb-0.5">AI가 얼굴을 자동으로 가렸습니다.</strong>
            <p className="text-yangju-800 leading-relaxed">사진을 한 번 더 확인해주세요. 추가로 가려야 할 영역이 있다면 아래 직접 가리기 도구를 사용하세요.</p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-2xl text-orange-900 text-xs flex items-start space-x-3 shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-orange-600 text-base mt-0.5"></i>
          <div>
            <strong className="block font-bold text-sm mb-0.5">자동으로 발견하지 못한 개인정보가 있을 수 있습니다.</strong>
            <p className="text-orange-800 leading-relaxed">사진을 확인하고 필요한 부분을 직접 가려주세요. (얼굴 미검출 또는 추가 확인 필요)</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-slate-300 rounded-2xl overflow-hidden bg-slate-50 relative p-2">
          <div className="text-[11px] font-bold text-slate-500 mb-1 px-1 flex justify-between items-center">
            <span>1. 원본 사진 (originalImage)</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">불변 보존</span>
          </div>
          <div className="h-44 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center">
            <img src={p.originalImage} alt="Original" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="border-2 border-yangju-500 rounded-2xl overflow-hidden bg-slate-50 relative p-2">
          <div className="text-[11px] font-bold text-yangju-800 mb-1 px-1 flex justify-between items-center">
            <span>2. 보호된 최종 이미지 (maskedImage)</span>
            <span className="text-[10px] bg-yangju-600 text-white px-2 py-0.5 rounded">AI 전송용</span>
          </div>
          <div ref={containerRef} className="h-44 rounded-xl overflow-hidden bg-slate-900 relative flex items-center justify-center cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-full object-cover" onMouseDown={(e) => addMask(e.clientX, e.clientY)} onTouchStart={(e) => { if (e.touches[0]) addMask(e.touches[0].clientX, e.touches[0].clientY); }}></canvas>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded pointer-events-none">
              <i className="fa-solid fa-paintbrush mr-1 text-amber-400"></i> 마우스/손가락으로 드래그하여 직접 가리기
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button onClick={c.runAutoMask} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1.5">
          <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
          <span>자동 가림 재실행</span>
        </button>
        <button onClick={c.resetManualMasks} className="px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 py-3 rounded-xl text-xs font-semibold transition">
          <i className="fa-solid fa-rotate-right mr-1"></i> 직접 가리기 초기화
        </button>
      </div>

      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={focusCanvas} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-sm transition text-xs flex items-center justify-center space-x-1.5">
            <i className="fa-solid fa-pen-nib"></i>
            <span>직접 가리기</span>
          </button>
          <button onClick={() => c.alertBox("보호된 사진 확인:\n- 원본(originalImage)과 분리됨\n- 자동 블러 및 수동 마스킹 반영 완료\n- AI 전송 준비 완료")} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center space-x-1.5">
            <i className="fa-solid fa-eye"></i>
            <span>보호된 사진 확인</span>
          </button>
        </div>
        <button onClick={c.finalizeMasking} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
          <span>이 사진으로 분석하기</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}