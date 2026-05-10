/**
 * app/admin/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Página principal do Dashboard Admin.
 * Exibe métricas rápidas e status do sistema.
 */

'use client';

import { motion } from 'framer-motion';
import { Users, Image, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <header className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Bem-vindo, Administrador</h2>
        <p className="text-white/50">Gerencie o conteúdo da sua landing page de forma simples e rápida.</p>
      </header>

      {/* ── Grid de Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<Users className="text-blue-400" />} 
          label="Visitas Hoje" 
          value="124" 
          trend="+12%" 
        />
        <StatCard 
          icon={<Image className="text-purple-400" />} 
          label="Fotos na Galeria" 
          value="12" 
          trend="0" 
        />
        <StatCard 
          icon={<MessageSquare className="text-emerald-400" />} 
          label="Novos Contatos" 
          value="3" 
          trend="+1" 
        />
        <StatCard 
          icon={<ArrowUpRight className="text-amber-400" />} 
          label="Taxa de Conversão" 
          value="4.2%" 
          trend="+0.5%" 
        />
      </div>

      {/* ── Recent Activity Placeholder ── */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
        <h3 className="text-xl font-bold mb-6">Atividade Recente</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Image size={18} className="text-white/40" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nova imagem adicionada à Galeria</p>
                <p className="text-xs text-white/40">Há 2 horas</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Sistema
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
          {trend}
        </span>
      </div>
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
    </motion.div>
  );
}
