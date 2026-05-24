'use client';

import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const initialData = [
  { district: 'Indore', disease: 'Dengue', cases: 156, riskPercent: 78, level: 'HIGH', updated: '2 hours ago' },
  { district: 'Bhopal', disease: 'Malaria', cases: 89, riskPercent: 62, level: 'MEDIUM', updated: '4 hours ago' },
  { district: 'Jabalpur', disease: 'Typhoid', cases: 34, riskPercent: 45, level: 'MEDIUM', updated: '1 hour ago' },
  { district: 'Gwalior', disease: 'Dengue', cases: 123, riskPercent: 71, level: 'HIGH', updated: '3 hours ago' },
  { district: 'Ujjain', disease: 'Chikungunya', cases: 12, riskPercent: 28, level: 'LOW', updated: '6 hours ago' },
  { district: 'Sagar', disease: 'Malaria', cases: 67, riskPercent: 52, level: 'MEDIUM', updated: '5 hours ago' },
  { district: 'Ratlam', disease: 'Dengue', cases: 45, riskPercent: 38, level: 'MEDIUM', updated: '2 hours ago' },
  { district: 'Khandwa', disease: 'Typhoid', cases: 21, riskPercent: 32, level: 'LOW', updated: '8 hours ago' },
];

export function DistrictRiskTable() {
  const [sortConfig, setSortConfig] = useState({ key: 'riskPercent', direction: 'desc' });
  const [data, setData] = useState(initialData);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ArrowUpDown size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="text-cyan-400" />
    ) : (
      <ArrowDown size={14} className="text-cyan-400" />
    );
  };

  const getRiskLevelColor = (level) => {
    if (level === 'HIGH') return 'bg-red-500/20 border-red-500/30 text-red-400';
    if (level === 'MEDIUM') return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
    return 'bg-green-500/20 border-green-500/30 text-green-400';
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">District Risk Assessment</h3>
        <p className="text-sm text-muted-foreground">Click column headers to sort</p>
      </div>

      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent pointer-events-none" />

        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {[
                  { key: 'district', label: 'District' },
                  { key: 'disease', label: 'Disease' },
                  { key: 'cases', label: 'Cases' },
                  { key: 'riskPercent', label: 'Risk %' },
                  { key: 'level', label: 'Level' },
                  { key: 'updated', label: 'Updated' },
                ].map(({ key, label }) => (
                  <th key={key} className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort(key)}
                      className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-wide"
                    >
                      {label}
                      <SortIcon column={key} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                >
                  <td className="px-6 py-4 text-foreground font-medium">{row.district}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.disease}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-foreground text-sm font-semibold">
                      {row.cases}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-cyan-400 font-bold">{row.riskPercent}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getRiskLevelColor(row.level)}`}>
                      {row.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">Last synced with IDSP database • Real-time updates every 4 hours</p>
    </div>
  );
}
