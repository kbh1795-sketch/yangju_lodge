import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { getStatusLabel, getRiskLabel, needsAttention } from "@/lib/yangjuData";

const STATUS_COLORS = { RECEIVED: "#64748b", ASSIGNED: "#2563eb", PROCESSING: "#f59e0b", COMPLETED: "#10b981" };
const RISK_COLORS = { HIGH: "#dc2626", MEDIUM: "#d97706", LOW: "#059669" };
const CAT_COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#6366f1"];

const StatCard = ({ icon, label, value, sub, tone }) => (
  <div className={`rounded-2xl p-4 border ${tone} shadow-sm`}>
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold text-slate-500">{label}</span>
      <i className={`fa-solid ${icon} text-slate-400`}></i>
    </div>
    <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
    {sub && <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>}
  </div>
);

export default function AdminDashboard({ reports }) {
  const stats = useMemo(() => {
    const total = reports.length;
    const byStatus = {}, byRisk = {}, byCat = {};
    let attn = 0, unassigned = 0, completed = 0;
    reports.forEach((r) => {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      byRisk[r.riskLevel] = (byRisk[r.riskLevel] || 0) + 1;
      byCat[r.category] = (byCat[r.category] || 0) + 1;
      if (needsAttention(r)) attn += 1;
      if (r.currentDepartment === "미지정") unassigned += 1;
      if (r.status === "COMPLETED") completed += 1;
    });
    const statusData = Object.entries(byStatus).map(([k, v]) => ({ name: getStatusLabel(k), value: v, key: k }));
    const riskData = ["HIGH", "MEDIUM", "LOW"].filter((k) => byRisk[k]).map((k) => ({ name: getRiskLabel(k), value: byRisk[k], key: k }));
    const catData = Object.entries(byCat).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    return { total, attn, unassigned, completed, completionRate, statusData, riskData, catData };
  }, [reports]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="fa-inbox" label="전체 민원" value={stats.total} tone="bg-white border-slate-200" />
        <StatCard icon="fa-triangle-exclamation" label="확인 필요" value={stats.attn} sub="핑퐁/기한 초과" tone="bg-red-50 border-red-200" />
        <StatCard icon="fa-hourglass-half" label="미배정" value={stats.unassigned} sub="부서 지정 대기" tone="bg-amber-50 border-amber-200" />
        <StatCard icon="fa-circle-check" label="완료율" value={`${stats.completionRate}%`} sub={`${stats.completed}건 완료`} tone="bg-yangju-50 border-yangju-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm mb-3"><i className="fa-solid fa-chart-pie text-yangju-600 mr-1.5"></i> 처리 상태 분포</h4>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {stats.statusData.map((d) => <Cell key={d.key} fill={STATUS_COLORS[d.key]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm mb-3"><i className="fa-solid fa-gauge-high text-red-600 mr-1.5"></i> 위험도 분포</h4>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.riskData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={50} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                  {stats.riskData.map((d) => <Cell key={d.key} fill={RISK_COLORS[d.key]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm mb-3"><i className="fa-solid fa-chart-column text-indigo-600 mr-1.5"></i> 유형별 민원 현황</h4>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.catData} margin={{ left: 0, right: 10, top: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={36}>
                {stats.catData.map((_, i) => <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}