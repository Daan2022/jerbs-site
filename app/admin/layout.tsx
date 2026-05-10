/**
 * app/admin/layout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout base para o painel administrativo.
 * Inclui Sidebar responsiva (Hambúrguer no mobile) e navegação.
 */

'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Home, 
  Layout, 
  Menu, 
  X 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#0F0F1A] text-white">
      
      {/* ── Botão Hambúrguer Mobile ── */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-[100] p-3 rounded-2xl bg-[#16162A] border border-white/10 text-white shadow-xl"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ── Overlay Mobile ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-72 bg-[#16162A] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/images/icon-logo-jerbs.png" 
                alt="Logo Escola JERBS" 
                fill 
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Admin JERBS</h1>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Painel de Gestão</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem 
              href="/admin" 
              icon={<LayoutDashboard size={22} />} 
              label="Dashboard" 
              active={pathname === '/admin'}
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem 
              href="/admin/hero" 
              icon={<Layout size={22} />} 
              label="Banner Hero" 
              active={pathname === '/admin/hero'}
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem 
              href="/admin/galeria" 
              icon={<ImageIcon size={22} />} 
              label="Galeria" 
              active={pathname === '/admin/galeria'}
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem 
              href="/admin/configuracoes" 
              icon={<Settings size={22} />} 
              label="Configurações" 
              active={pathname === '/admin/configuracoes'}
              onClick={() => setIsSidebarOpen(false)}
            />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/10 space-y-3">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <Home size={20} />
            Ver Site
          </Link>
          <button className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full">
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* ── Conteúdo Principal ── */}
      <main className="flex-1 w-full lg:max-w-[calc(100vw-18rem)] overflow-x-hidden">
        <div className="min-h-screen pt-20 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

// ─── Sub-componente: Item de Navegação ────────────────────────────────────
function NavItem({ 
  href, 
  icon, 
  label, 
  active,
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group
        ${active 
          ? 'bg-[#008FC7] text-white shadow-lg shadow-[#008FC7]/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'}
      `}
    >
      <span className={`${active ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-colors`}>
        {icon}
      </span>
      <span className="font-bold tracking-tight">{label}</span>
      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
        />
      )}
    </Link>
  );
}
