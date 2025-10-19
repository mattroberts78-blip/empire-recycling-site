"use client";

import { useEffect, useMemo, useState } from "react";
import type { MetalPrice, PricingStructure, User } from "./types";
import Link from "next/link";

const KEY = "empire-admin-demo-v1";

type Store = {
  metalPrices: MetalPrice[];
  pricingStructures: PricingStructure[];
  users: User[];
};

function loadStore(): Store {
  if (typeof window === "undefined") return { metalPrices: [], pricingStructures: [], users: [] };
  const raw = window.localStorage.getItem(KEY);
  if (!raw) {
    const seed: Store = {
      metalPrices: [
        { id: crypto.randomUUID(), name: "Gold", unit: "oz", price: 2350 },
        { id: crypto.randomUUID(), name: "Silver", unit: "oz", price: 28.2 },
        { id: crypto.randomUUID(), name: "Platinum", unit: "oz", price: 960 },
        { id: crypto.randomUUID(), name: "Palladium", unit: "oz", price: 1030 }
      ],
      pricingStructures: [
        { id: crypto.randomUUID(), name: "Standard", multiplier: 1.0, description: "Default pricing for general users." },
        { id: crypto.randomUUID(), name: "Preferred Supplier", multiplier: 1.03, description: "Slight uplift for preferred partners." },
        { id: crypto.randomUUID(), name: "Bulk Volume", multiplier: 1.05, description: "Higher payout for bulk shipments." }
      ],
      users: [
        { id: crypto.randomUUID(), name: "Jane Admin", email: "jane@example.com", isAdmin: true },
        { id: crypto.randomUUID(), name: "John Supplier", email: "john@example.com", isAdmin: false },
      ]
    };
    window.localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw) as Store;
  } catch {
    return { metalPrices: [], pricingStructures: [], users: [] };
  }
}

function saveStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={(props.className ?? "") + " inline-flex items-center justify-center rounded-md border border-transparent bg-brand-green px-4 py-2 text-white font-semibold shadow-soft hover:brightness-95 active:scale-[0.99] transition"}
    />
  );
}

function OutlineButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={(props.className ?? "") + " inline-flex items-center justify-center rounded-md border px-4 py-2 text-gray-700 font-semibold shadow-soft hover:bg-gray-50 active:scale-[0.99] transition"}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={(props.className ?? "") + " w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green/50"}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={(props.className ?? "") + " w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"}
    />
  );
}

function SectionCard({ title, children, action }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur border border-gray-200 shadow-soft p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

type TabKey = "prices" | "users" | "structures" | "admins";

export default function AdminUI() {
  const [active, setActive] = useState<TabKey>("prices");
  const [store, setStore] = useState<Store>({ metalPrices: [], pricingStructures: [], users: [] });

  useEffect(() => {
    setStore(loadStore());
  }, []);

  useEffect(() => {
    saveStore(store);
  }, [store]);

  function addMetal() {
    const id = crypto.randomUUID();
    setStore(s => ({ ...s, metalPrices: [...s.metalPrices, { id, name: "New Metal", unit: "oz", price: 0 }] }));
  }
  function updateMetal(id: string, data: Partial<MetalPrice>) {
    setStore(s => ({ ...s, metalPrices: s.metalPrices.map(m => m.id === id ? { ...m, ...data } : m) }));
  }
  function deleteMetal(id: string) {
    setStore(s => ({ ...s, metalPrices: s.metalPrices.filter(m => m.id !== id) }));
  }

  function addStructure() {
    const id = crypto.randomUUID();
    setStore(s => ({ ...s, pricingStructures: [...s.pricingStructures, { id, name: "New Structure", multiplier: 1.0, description: "" }] }));
  }
  function updateStructure(id: string, data: Partial<PricingStructure>) {
    setStore(s => ({ ...s, pricingStructures: s.pricingStructures.map(p => p.id === id ? { ...p, ...data } : p) }));
  }
  function deleteStructure(id: string) {
    setStore(s => ({
      ...s,
      pricingStructures: s.pricingStructures.filter(p => p.id !== id),
      users: s.users.map(u => u.pricingStructureId === id ? { ...u, pricingStructureId: undefined } : u)
    }));
  }

  function addUser() {
    const id = crypto.randomUUID();
    setStore(s => ({ ...s, users: [...s.users, { id, name: "New User", email: "", isAdmin: false }] }));
  }
  function updateUser(id: string, data: Partial<User>) {
    setStore(s => ({ ...s, users: s.users.map(u => u.id === id ? { ...u, ...data } : u) }));
  }
  function deleteUser(id: string) {
    setStore(s => ({ ...s, users: s.users.filter(u => u.id !== id) }));
  }

  const adminCount = useMemo(() => store.users.filter(u => u.isAdmin).length, [store.users]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">Admins: <span className="font-medium">{adminCount}</span></div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {([
          ["prices", "Precious Metal Prices"],
          ["users", "Users"],
          ["structures", "Pricing Structures"],
          ["admins", "Admin Management"]
        ] as [TabKey, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${active === key ? "bg-brand-green text-white border-transparent" : "bg-white/70 border-gray-300 hover:bg-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {active === "prices" && (
        <SectionCard title="Precious Metal Prices" action={<Button onClick={addMetal}>Add Metal</Button>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 pr-4">Metal</th>
                  <th className="py-2 pr-4">Unit</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {store.metalPrices.map(m => (
                  <tr key={m.id} className="border-t">
                    <td className="py-2 pr-4">
                      <Input value={m.name} onChange={e => updateMetal(m.id, { name: e.target.value })} />
                    </td>
                    <td className="py-2 pr-4">
                      <Select value={m.unit} onChange={e => updateMetal(m.id, { unit: e.target.value as "oz" | "g" })}>
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                      </Select>
                    </td>
                    <td className="py-2 pr-4">
                      <Input type="number" step="0.01" value={m.price} onChange={e => updateMetal(m.id, { price: parseFloat(e.target.value) })} />
                    </td>
                    <td className="py-2 pr-4">
                      <OutlineButton onClick={() => deleteMetal(m.id)}>Delete</OutlineButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === "structures" && (
        <SectionCard title="Pricing Structures" action={<Button onClick={addStructure}>Add Structure</Button>}>
          <div className="space-y-4">
            {store.pricingStructures.map(p => (
              <div key={p.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 border rounded-xl p-3 bg-white/60">
                <Input value={p.name} onChange={e => updateStructure(p.id, { name: e.target.value })} />
                <Input placeholder="Description" value={p.description ?? ""} onChange={e => updateStructure(p.id, { description: e.target.value })} />
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Multiplier</span>
                  <Input type="number" step="0.01" value={p.multiplier} onChange={e => updateStructure(p.id, { multiplier: parseFloat(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center justify-end">
                  <OutlineButton onClick={() => deleteStructure(p.id)}>Delete</OutlineButton>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {active === "users" && (
        <SectionCard title="Users" action={<Button onClick={addUser}>Add User</Button>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Pricing Structure</th>
                  <th className="py-2 pr-4">Admin</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {store.users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="py-2 pr-4"><Input value={u.name} onChange={e => updateUser(u.id, { name: e.target.value })} /></td>
                    <td className="py-2 pr-4"><Input type="email" value={u.email} onChange={e => updateUser(u.id, { email: e.target.value })} /></td>
                    <td className="py-2 pr-4">
                      <Select value={u.pricingStructureId ?? ""} onChange={e => updateUser(u.id, { pricingStructureId: e.target.value || undefined })}>
                        <option value="">—</option>
                        {store.pricingStructures.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </Select>
                    </td>
                    <td className="py-2 pr-4">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={u.isAdmin}
                          onChange={e => updateUser(u.id, { isAdmin: e.target.checked })}
                        />
                        <span>Admin</span>
                      </label>
                    </td>
                    <td className="py-2 pr-4">
                      <OutlineButton onClick={() => deleteUser(u.id)}>Delete</OutlineButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === "admins" && (
        <SectionCard title="Admin Management">
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Toggle <strong>Admin</strong> on users in the <em>Users</em> tab to add or remove administrators.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {store.users.filter(u => u.isAdmin).map(u => (
                    <tr key={u.id} className="border-t">
                      <td className="py-2 pr-4">{u.name || "—"}</td>
                      <td className="py-2 pr-4">{u.email || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
