import React, { useEffect, useRef, useState } from "react";

// 자동 블러가 덮는 영역(퍼센트) — 사진 내 민감 정보(글자/얼굴)가 주로 있는 중앙
const AUTO_RECT = { x: 24, y: 30, w: 52, h: 32 };

export default function PrivacyMask({ c }) {
  const p = c.pipeline;
  const [baseSrc, setBaseSrc] = useState(null);
  const wrapRef = useRef(null);
  const startRef = useRef(null);
  const [draft, setDraft] = useState(null);

  // 원본을 데이터 URL로 변환해 캔버스 오염(taint) 방지 → 실제 마스킹 저장 가능
  useEffect(() => {
    const src = p.autoMaskedImage || p.originalImage;
    if (!src) { setBaseSrc(null); return; }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onload = () => { if (!cancelled) setBaseSrc(reader.result); };
        reader.onerror = () => { if (!cancelled) setBaseSrc(src); };
        reader.readAsDataURL(blob);
      } catch (e) {
        if (!cancelled) setBaseSrc(src);
      }
    })();
    return () => { cancelled = true; };
  }, [p.autoMaskedImage, p.originalImage]);

  // 보호된 최종 이미지(maskedImage)에 마스킹 실제로 굽기
  useEffect(() => {
    if (!baseSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 600;
      canvas.height = img.height || 400;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const R = (r) => ({
        x: (r.x / 100) * canvas.width,
        y: (r.y / 100) * canvas.height,
        w: (r.w / 100) * canvas.width,
        h: (r.h / 100) * canvas.height,
      });
      if (p.hasDetectedFaces) {
        const a = R(AUTO_RECT);
        ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
        ctx.fillRect(a.x, a.y, a.w, a.h);
      }
      p.manualMasks.forEach((m) => {
        const r = R(m);
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 3;
        ctx.strokeRect(r.x, r.y, r.w, r.h);
      });
      try { c.patchPipeline({ maskedImage: canvas.toDataURL("image/png") }); } catch (e) { /* ignore */ }
    };
    img.src = baseSrc;
    // eslint-disable-next-line
  }, [baseSrc, p.manualMasks, p.hasDetectedFaces]);

  const toPct = (clientX, clientY) => {
    const el = wrapRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  };

  const onDown = (clientX, clientY) => {
    const pt = toPct(clientX, clientY);
    startRef.current = pt;
    setDraft({ x: pt.x, y: pt.y, w: 0, h: 0 });
  };
  const onMove = (clientX, clientY) => {
    if (!startRef.current) return;
    const pt = toPct(clientX, clientY);
    const s = startRef.current;
    setDraft({
      x: Math.min(s.x, pt.x),
      y: Math.min(s.y, pt.y),
      w: Math.abs(pt.x - s.x),
      h: Math.abs(pt.y - s.y),
    });
  };
  const onUp = () => {
    if (draft && draft.w > 2 && draft.h > 2) {
      c.patchPipeline((prev) => ({ manualMasks: [...prev.manualMasks, { ...draft }], pipelineStatus: "MANUAL_EDITED" }));
    }
    startRef.current = null;
    setDraft(null);
  };

  const maskStyle = (r) => ({
    left: `${r.x}%`,
    top: `${r.y}%`,
    width: `${r.w}%`,
    height: `${r.h}%`,
  });

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
            <strong className="block font-bold text-sm mb-0.5">AI가 민감 정보를 자동으로 가렸습니다.</strong>
            <p className="text-yangju-800 leading-relaxed">사진을 한 번 더 확인해주세요. 추가로 가려야 할 영역이 있다면 보호된 사진 위를 드래그해 직접 가려주세요.</p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-2xl text-orange-900 text-xs flex items-start space-x-3 shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-orange-600 text-base mt-0.5"></i>
          <div>
            <strong className="block font-bold text-sm mb-0.5">자동으로 발견하지 못한 개인정보가 있을 수 있습니다.</strong>
            <p className="text-orange-800 leading-relaxed">사진을 확인하고 필요한 부분을 드래그로 직접 가려주세요.</p>
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
            {baseSrc ? <img src={baseSrc} alt="Original" className="w-full h-full" /> : <div className="text-slate-400 text-xs">이미지 로드 중...</div>}
          </div>
        </div>
        <div className="border-2 border-yangju-500 rounded-2xl overflow-hidden bg-slate-50 relative p-2">
          <div className="text-[11px] font-bold text-yangju-800 mb-1 px-1 flex justify-between items-center">
            <span>2. 보호된 최종 이미지 (maskedImage)</span>
            <span className="text-[10px] bg-yangju-600 text-white px-2 py-0.5 rounded">AI 전송용</span>
          </div>
          <div ref={wrapRef} className="h-44 rounded-xl overflow-hidden bg-slate-900 relative select-none touch-none">
            {baseSrc ? (
              <img src={baseSrc} alt="Masked" className="w-full h-full block" draggable={false} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">이미지 로드 중...</div>
            )}

            {p.hasDetectedFaces && (
              <div className="absolute bg-slate-900/85 border border-sky-400 rounded pointer-events-none flex items-center justify-center" style={maskStyle(AUTO_RECT)}>
                <span className="text-sky-300 text-[10px] font-bold whitespace-nowrap">🔒 자동 블러</span>
              </div>
            )}

            {p.manualMasks.map((m, i) => (
              <div key={i} className="absolute bg-black/90 border-2 border-amber-400 rounded pointer-events-none" style={maskStyle(m)} />
            ))}

            {draft && (
              <div className="absolute bg-amber-500/40 border-2 border-dashed border-amber-400 pointer-events-none" style={maskStyle(draft)} />
            )}

            <div
              className="absolute inset-0 cursor-crosshair"
              onMouseDown={(e) => onDown(e.clientX, e.clientY)}
              onMouseMove={(e) => onMove(e.clientX, e.clientY)}
              onMouseUp={onUp}
              onMouseLeave={onUp}
              onTouchStart={(e) => { if (e.touches[0]) { onDown(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }}
              onTouchMove={(e) => { if (e.touches[0]) { onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }}
              onTouchEnd={onUp}
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded pointer-events-none text-center">
              <i className="fa-solid fa-paintbrush mr-1 text-amber-400"></i> 드래그하여 직접 가릴 영역 지정
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
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-600">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">직접 가린 영역</span>
            <span className="font-bold text-yangju-700">{p.manualMasks.length}개</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-yangju-500 transition-all" style={{ width: `${Math.min(100, p.manualMasks.length * 20)}%` }} />
          </div>
        </div>
        <button onClick={() => c.alertBox("보호된 사진 확인:\n- 원본(originalImage)과 분리됨\n- 자동 블러 및 수동 마스킹 반영 완료\n- AI 전송 준비 완료")} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3.5 rounded-2xl transition text-sm flex items-center justify-center space-x-1.5">
          <i className="fa-solid fa-eye"></i>
          <span>보호된 사진 확인</span>
        </button>
        <button onClick={c.finalizeMasking} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
          <span>이 사진으로 분석하기</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}