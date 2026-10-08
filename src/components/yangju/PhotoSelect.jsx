import React from "react";

const OPTIONS = [
  ["road_damage", "1. 도로 파손 (얼굴 O)"],
  ["illegal_parking", "2. 불법 주정차 (얼굴 X)"],
  ["facility_damage", "3. 시설물 파손 (얼굴 O)"],
  ["flooding", "4. 침수·배수 (얼굴 X)"],
];

export default function PhotoSelect({ c }) {
  const p = c.pipeline;
  const hasImage = p.originalImage !== null;
  return (
    <div className="space-y-6">
      <div className="bg-yangju-50 border border-yangju-200 p-4 rounded-2xl">
        <h3 className="font-bold text-yangju-800 text-sm mb-1"><i className="fa-solid fa-camera mr-1"></i> 무엇이 위험한가요?</h3>
        <p className="text-yangju-700 text-xs leading-relaxed">사진을 올리면 AI가 신고 유형과 위험도를 먼저 정리해드립니다. 로컬 이미지 파일(JPG, PNG, WEBP)을 선택하거나 테스트 시나리오를 선택하세요.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600">테스트 시나리오 선택 (얼굴 검출 유무 분기 테스트)</label>
        <div className="grid grid-cols-2 gap-2">
          {OPTIONS.map(([key, label]) => (
            <button key={key} onClick={() => c.selectScenario(key)} className={`p-3 text-xs rounded-xl border ${p.selectedScenarioKey === key ? "bg-yangju-700 text-white border-yangju-700 font-bold" : "bg-white text-slate-700 border-slate-200"} transition`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">로컬 이미지 파일 직접 선택 (JPG, PNG, WEBP)</label>
        <div className="flex items-center space-x-2">
          <input type="file" accept="image/jpeg, image/png, image/webp" onChange={c.handleFileSelect} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-yangju-50 file:text-yangju-700 hover:file:bg-yangju-100 border border-slate-200 rounded-2xl p-2 cursor-pointer bg-slate-50" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-600 px-1">
          <span>선택된 원본 사진 미리보기 (originalImage)</span>
          <span className={`${hasImage ? "text-green-600 bg-green-50 border-green-200" : "text-amber-600 bg-amber-50 border-amber-200"} px-2 py-0.5 rounded border text-[10px]`}>
            {hasImage ? "✓ 이미지 로드됨" : "⚠ 이미지 미선택"}
          </span>
        </div>
        <div className={`border-2 ${hasImage ? "border-yangju-500" : "border-dashed border-slate-300"} rounded-3xl overflow-hidden bg-slate-50 text-center relative shadow-sm h-56 flex items-center justify-center`}>
          {hasImage ? (
            <>
              <img src={p.originalImage} alt="Original Upload Preview" className="w-full h-full object-cover" />
              <button onClick={c.clearImage} className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-red-700 transition">
                <i className="fa-solid fa-trash mr-1"></i> 다른 사진 선택
              </button>
            </>
          ) : (
            <div className="text-slate-400 p-6 space-y-2">
              <i className="fa-solid fa-image text-3xl"></i>
              <p className="text-xs">위에서 파일을 선택하거나 테스트 시나리오를 선택하세요.</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 bg-slate-50 p-4 rounded-3xl border border-slate-200">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700"><i className="fa-solid fa-location-dot text-yangju-600 mr-1"></i> 위치 입력</label>
          <input type="text" value={p.location} onChange={(e) => c.patchPipeline({ location: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-yangju-600" />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700"><i className="fa-solid fa-pen text-yangju-600 mr-1"></i> 간단한 설명 (선택사항)</label>
          <input type="text" value={p.description} onChange={(e) => c.patchPipeline({ description: e.target.value })} placeholder="예: 통행에 지장이 있어 조치가 필요합니다." className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-yangju-600" />
        </div>
      </div>

      <button onClick={c.proceedToPrivacy} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-4 rounded-2xl shadow-md transition text-base flex items-center justify-center space-x-2">
        <span>다음 (개인정보 보호 및 마스킹 처리)</span>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}