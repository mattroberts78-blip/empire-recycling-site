"use client";

import { useEffect, useMemo, useState } from "react";
import type { PricingStructure, MetalPrice, User } from "../admin/types";

type Store = {
  metalPrices: MetalPrice[];
  pricingStructures: PricingStructure[];
  users: User[];
};

const KEY = "empire-admin-demo-v1";
const CURRENT_USER_KEY = "empire-current-user-id";

function loadStore(): Store {
  if (typeof window === "undefined") return { metalPrices: [], pricingStructures: [], users: [] };
  const raw = window.localStorage.getItem(KEY);
  try { return raw ? (JSON.parse(raw) as Store) : { metalPrices: [], pricingStructures: [], users: [] }; }
  catch { return { metalPrices: [], pricingStructures: [], users: [] }; }
}

function saveStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
}

function saveCurrentUserId(id?: string) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(CURRENT_USER_KEY, id);
  else window.localStorage.removeItem(CURRENT_USER_KEY);
}

function loadCurrentUserId(): string | undefined {
  if (typeof window === "undefined") return;
  return window.localStorage.getItem(CURRENT_USER_KEY) ?? undefined;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur border border-gray-200 shadow-soft p-5">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function UserUI() {
  const [store, setStore] = useState<Store>({ metalPrices: [], pricingStructures: [], users: [] });
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const s = loadStore();
    setStore(s);
    setCurrentUserId(loadCurrentUserId() || s.users.find(u => !u.isAdmin)?.id);
  }, []);

  useEffect(() => { saveStore(store); }, [store]);
  useEffect(() => { saveCurrentUserId(currentUserId); }, [currentUserId]);

  const currentUser = useMemo(
    () => store.users.find(u => u.id === currentUserId),
    [store.users, currentUserId]
  );

  const currentStructure = useMemo(
    () => store.pricingStructures.find(p => p.id === currentUser?.pricingStructureId),
    [store.pricingStructures, currentUser?.pricingStructureId]
  );

  const multiplier = currentStructure?.multiplier ?? 1.0;

  const adjustedPrices = useMemo(() => {
    return store.metalPrices.map(m => ({
      ...m,
      adjusted: Number((m.price * multiplier).toFixed(2)),
    }));
  }, [store.metalPrices, multiplier]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <div className="text-sm text-gray-600">
          {currentStructure
            ? <>Pricing: <span className="font-medium">{currentStructure.name}</span> (×{currentStructure.multiplier})</>
            : <>Pricing: <span className="font-medium">Standard</span> (×1.00)</>}
        </div>
      </div>

      {/* Switch user (demo only, remove when real auth is added) */}
      <Card title="Select User (demo)">
        <select
          value={currentUserId ?? ""}
          onChange={e => setCurrentUserId(e.target.value || undefined)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
        >
          {store.users.filter(u => !u.isAdmin).map(u => (
            <option key={u.id} value={u.id}>{u.name || u.email || u.id.slice(0,8)}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-2">This selector is temporary until login/auth is wired up.</p>
      </Card>

      {/* Adjusted prices */}
      <Card title="Your Prices (adjusted)">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Metal</th>
                <th className="py-2 pr-4">Base Price</th>
                <th className="py-2 pr-4">Your Price</th>
                <th className="py-2 pr-4">Unit</th>
              </tr>
            </thead>
            <tbody>
              {adjustedPrices.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="py-2 pr-4">{m.name}</td>
                  <td className="py-2 pr-4">${m.price.toLocaleString()}</td>
                  <td className="py-2 pr-4 font-semibold">${m.adjusted.toLocaleString()}</td>
                  <td className="py-2 pr-4">{m.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Profile editor */}
      <Card title="Profile">
        {currentUser ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                value={currentUser.name}
                onChange={e => setStore(s => ({
                  ...s,
                  users: s.users.map(u => u.id === currentUser.id ? { ...u, name: e.target.value } : u)
                }))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                value={currentUser.email}
                onChange={e => setStore(s => ({
                  ...s,
                  users: s.users.map(u => u.id === currentUser.id ? { ...u, email: e.target.value } : u)
                }))}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Select a user above.</p>
        )}
      </Card>
    </div>
  );
}
