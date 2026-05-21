import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import sitesData from "@/data/park-sites.json";

type Site = { id: number; name: string; row: number; status: string; lat: number; lon: number };
const sites = sitesData as Site[];

const ROWS = [100, 200, 300, 400, 500, 600, 700] as const;

export default function ParkMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const layerRef = useRef<unknown>(null);
  const LRef = useRef<unknown>(null);

  const [active, setActive] = useState<Set<number>>(() => new Set(ROWS));
  const [mapLoaded, setMapLoaded] = useState(false);

  const counts = useMemo(() => {
    const c: Record<number, number> = {};
    for (const s of sites) c[s.row] = (c[s.row] ?? 0) + 1;
    return c;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const lats = sites.map((s) => s.lat);
      const lons = sites.map((s) => s.lon);
      const bounds: [[number, number], [number, number]] = [
        [Math.min(...lats), Math.min(...lons)],
        [Math.max(...lats), Math.max(...lons)],
      ];

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).fitBounds(bounds, { padding: [30, 30] });
      mapRef.current = map;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 21, attribution: "Tiles Â© Esri" }
      ).addTo(map);

      layerRef.current = L.layerGroup().addTo(map);
      setMapLoaded(true);
    })();

    return () => {
      cancelled = true;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && typeof m.remove === "function") m.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Re-render markers when active rows change or map finishes loading
  useEffect(() => {
    if (!mapLoaded) return;
    const L = LRef.current as typeof import("leaflet") | null;
    const layer = layerRef.current as { clearLayers: () => void; addLayer: (l: unknown) => void } | null;
    if (!L || !layer) return;
    layer.clearLayers();

    sites
      .filter((s) => active.has(s.row))
      .forEach((s) => {
        const label = s.name.replace(/^#/, "");
        const icon = L.divIcon({
          className: "pt-site-marker",
          html: `<div class="pt-pin pt-row-${s.row}"><span>${label}</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const m = L.marker([s.lat, s.lon], { icon }).bindPopup(`<strong>Site ${label}</strong>`);
        layer.addLayer(m);
      });
  }, [active]);

  const toggle = (row: number) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(row)) next.delete(row);
      else next.add(row);
      return next;
    });
  };
  const allOn = active.size === ROWS.length;
  const setAll = () => setActive(allOn ? new Set() : new Set(ROWS));

  return (
    <div className="relative h-[600px] w-full md:h-[700px] bg-[#0A0A0B] overflow-hidden rounded-xl">
      <style>{`
        .pt-site-marker { background: transparent; border: none; }
        .pt-pin {
          width: 26px; height: 26px; border-radius: 50%;
          color: #fff; display: flex; align-items: center; justify-content: center;
          font: 700 11px/1 ui-sans-serif, system-ui, sans-serif;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.6);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pt-pin:hover {
          transform: scale(1.2) translateY(-2px);
          z-index: 1000 !important;
        }
        .pt-pin::before {
          content: ''; position: absolute; inset: -4px; border-radius: 50%;
          border: 1.5px solid inherit; opacity: 0.5;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pt-row-100 { background: linear-gradient(135deg, #ef4444, #b91c1c); box-shadow: 0 0 12px #ef4444; border-color: #ef4444; }
        .pt-row-200 { background: linear-gradient(135deg, #f97316, #c2410c); box-shadow: 0 0 12px #f97316; border-color: #f97316; }
        .pt-row-300 { background: linear-gradient(135deg, #eab308, #a16207); box-shadow: 0 0 12px #eab308; border-color: #eab308; }
        .pt-row-400 { background: linear-gradient(135deg, #22c55e, #15803d); box-shadow: 0 0 12px #22c55e; border-color: #22c55e; }
        .pt-row-500 { background: linear-gradient(135deg, #14b8a6, #0f766e); box-shadow: 0 0 12px #14b8a6; border-color: #14b8a6; }
        .pt-row-600 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); box-shadow: 0 0 12px #3b82f6; border-color: #3b82f6; }
        .pt-row-700 { background: linear-gradient(135deg, #a855f7, #7e22ce); box-shadow: 0 0 12px #a855f7; border-color: #a855f7; }
        /* Map specific overrides */
        .leaflet-popup-content-wrapper { background: rgba(10,10,11,0.9); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; }
        .leaflet-popup-tip { background: rgba(10,10,11,0.9); }
      `}</style>

      {/* Floating Glassmorphism Filters */}
      <div className="absolute top-4 left-1/2 z-[400] flex w-[95%] max-w-3xl -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-md">
        <button
          onClick={setAll}
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            allOn ? "scale-105 bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          All
        </button>
        {ROWS.map((row) => {
          const on = active.has(row);
          return (
            <button
              key={row}
              onClick={() => toggle(row)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                on ? "scale-105 bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-pressed={on}
            >
              {row}s <span className="ml-1 font-normal opacity-70">({counts[row] ?? 0})</span>
            </button>
          );
        })}
      </div>

      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}

