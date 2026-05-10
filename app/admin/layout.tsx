/**
 * app/admin/layout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout do Painel Administrativo.
 * Inclui a barra lateral de navegação e o container principal.
 */

import React from 'react';
import { LayoutDashboard, Image as ImageIcon, Settings, LogOut, Home, Layout } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0F0F1A] text-white">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-[#16162A] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/images/icon-logo-jerbs.png" 
                alt="Logo Escola JERBS" 
                fill 
                sizes="32px"
                className="object-contain"
              />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Admin JERBS</h1>
          </div>

          <nav className="space-y-1">
            <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem href="/admin/hero" icon={<Layout size={20} />} label="Banner Hero" />
            <NavItem href="/admin/galeria" icon={<ImageIcon size={20} />} label="Galeria" />
            <NavItem href="/admin/configuracoes" icon={<Settings size={20} />} label="Configurações" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <Home size={18} />
            Ver Site
          </Link>
          <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0F0F1A] to-[#16162A]">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
    >
      <span className="text-white/40 group-hover:text-[#008FC7] transition-colors">
        {icon}
      </span>
      <span className="font-medium text-sm text-white/70 group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}
