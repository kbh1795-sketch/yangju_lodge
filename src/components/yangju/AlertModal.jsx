import React from "react";

export default function AlertModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 bg-yangju-100 text-yangju-700 rounded-full flex items-center justify-center mx-auto text-xl">
          <i className="fa-solid fa-circle-info"></i>
        </div>
        <p className="text-sm font-semibold text-slate-800 whitespace-pre-line leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-yangju-600 hover:bg-yangju-700 text-white font-semibold py-3 rounded-xl transition text-sm">확인</button>
      </div>
    </div>
  );
}