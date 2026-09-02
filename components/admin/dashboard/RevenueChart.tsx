"use client";

import { useMemo, useState } from "react";

interface RevenuePoint {
  date: string;
  label: string;
  revenue: number;
}

export default function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const [range, setRange] = useState<7 | 30>(30);

  const points = useMemo(() => data.slice(-range), [data, range]);

  const width = 700;
  const height = 260;
  const padding = { top: 20, right: 16, bottom: 30, left: 56 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxRevenue = Math.max(...points.map((p) => p.revenue), 1);
  // round up to a nice number for the top gridline
  const niceMax = Math.ceil(maxRevenue / 1000) * 1000 || 1000;
  const gridSteps = 4;

  const xFor = (i: number) =>
    points.length <= 1
      ? padding.left
      : padding.left + (i / (points.length - 1)) * chartWidth;

  const yFor = (val: number) =>
    padding.top + chartHeight - (val / niceMax) * chartHeight;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.revenue)}`)
    .join(" ");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${xFor(points.length - 1)} ${
          padding.top + chartHeight
        } L ${xFor(0)} ${padding.top + chartHeight} Z`
      : "";

  const labelEvery = Math.max(1, Math.ceil(points.length / 7));

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">
            Revenue Overview
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Daily revenue for the period
          </p>
        </div>

        <div className="flex overflow-hidden rounded-lg border border-neutral-200 text-xs font-medium">
          <button
            onClick={() => setRange(7)}
            className={`px-3 py-1.5 ${
              range === 7
                ? "bg-amber-700 text-white"
                : "bg-white text-neutral-600"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setRange(30)}
            className={`px-3 py-1.5 ${
              range === 30
                ? "bg-amber-700 text-white"
                : "bg-white text-neutral-600"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ minWidth: 500 }}
        >
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gridlines + Y labels */}
          {Array.from({ length: gridSteps + 1 }).map((_, i) => {
            const val = (niceMax / gridSteps) * i;
            const y = yFor(val);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#E5E1D8"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#8A8579"
                >
                  Rs.{val >= 1000 ? `${val / 1000}k` : val}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {points.map((p, i) =>
            i % labelEvery === 0 || i === points.length - 1 ? (
              <text
                key={p.date}
                x={xFor(i)}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#8A8579"
              >
                {p.label}
              </text>
            ) : null
          )}

          {areaPath && <path d={areaPath} fill="url(#revenueFill)" />}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#B45309"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {points.map((p, i) => (
            <circle
              key={p.date}
              cx={xFor(i)}
              cy={yFor(p.revenue)}
              r={3}
              fill="#B45309"
            >
              <title>
                {p.label}: Rs. {p.revenue.toLocaleString()}
              </title>
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}