/**
 * app/admin/estrutura/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerenciamento de Instalações/Estrutura da Escola.
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Edit2, Save, X, Layout, Loader2, 
  School, Coffee, BookOpen, Music, Play, Heart, Star, 
  Camera, Zap, MapPin, Search
} from 'lucide-react';
import { buscarInstalacoes, salvarInstalacao, excluirInstalacao, type Instalacao } from '@/services/supabaseService';
import ImageUpload from '@/components/admin/ImageUpload';

export const dynamic = 'force-dynamic';

// Lista de ícones disponíveis para escolha
const ICON_LIST = [
  { name: 'Escola', value: 'School', icon: <School size={16} /> },
  { name: 'Refeitório', value: 'Coffee', icon: <Coffee size={16} /> },
  { name: 'Biblioteca', value: 'BookOpen', icon: <BookOpen size={16} /> },
  { name: 'Música', value: 'Music', icon: <Music size={16} /> },
  { name: 'Playground', value: 'Play', icon: <Play size={16} /> },
  { name: 'Saúde', value: 'Heart', icon: <Heart size={16} /> },
  { name: 'Destaque', value: 'Star', icon: <Star size={16} /> },
  { name: 'Fotos', value: 'Camera', icon: <Camera size={16} /> },
  { name: 'Energia', value: 'Zap', icon: <Zap size={16} /> },
  { name: 'Local', value: 'MapPin', icon: <MapPin size={16} /> },
];

export default function EstruturaAdmin() {
  const [itens, setItens] = useState<Instalacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Instalacao | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const data = await buscarInstalacoes();
      setItens(data);
    } catch (error) {
      console.error('Erro ao buscar instalações:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (item?: Instalacao) => {
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem({
        id: null as any,
        titulo: '',
        descricao: '',
        icone: 'School',
        imagem_url: '',
        categoria: 'Geral',
        ordem: itens.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const ok = await salvarInstalacao(editingItem);
      if (ok) {
        setIsModalOpen(false);
        carregarDados();
      } else {
        alert('Erro ao salvar no banco de dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const ok = await excluirInstalacao(itemToDelete);
      if (ok) {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        carregarDados();
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Nossas Instalações</h2>
          <p className="text-white/50">Gerencie os ambientes e espaços da escola.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#008FC7] hover:bg-[#1C75BC] text-white font-bold transition-all shadow-lg shadow-[#008FC7]/20"
        >
          <Plus size={20} />
          Novo Ambiente
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#008FC7]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itens.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-md"
            >
              <div className="aspect-video relative overflow-hidden bg-white/5">
                {item.imagem_url ? (
                  <Image 
                    src={item.imagem_url} 
                    alt={item.titulo} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <Layout size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                  <button 
                    onClick={() => handleOpenModal(item)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                  {item.categoria}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#008FC7]/10 flex items-center justify-center text-[#008FC7]">
                    {ICON_LIST.find(i => i.value === item.icone)?.icon || <School size={16} />}
                  </div>
                  <h4 className="font-bold text-xl">{item.titulo}</h4>
                </div>
                <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{item.descricao}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30 uppercase tracking-tighter">
                  <span>Ordem: {item.ordem}</span>
                  <span>ID: {item.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Modal de Edição ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#16162A] border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">{editingItem?.id ? 'Editar Ambiente' : 'Novo Ambiente'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60">Título do Ambiente</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.titulo || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, titulo: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                        placeholder="Ex: Berçário Estimulante"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60">Categoria</label>
                      <input
                        type="text"
                        value={editingItem?.categoria || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, categoria: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                        placeholder="Ex: Infraestrutura, Esportes..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60">Ícone Representativo</label>
                      <div className="grid grid-cols-5 gap-2">
                        {ICON_LIST.map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => setEditingItem(prev => prev ? { ...prev, icone: item.value } : null)}
                            className={`flex items-center justify-center p-3 rounded-xl border transition-all ${editingItem?.icone === item.value ? 'bg-[#008FC7] border-[#008FC7] text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                            title={item.name}
                          >
                            {item.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <ImageUpload 
                      label="Foto do Ambiente"
                      value={editingItem?.imagem_url || ''}
                      onChange={(url) => setEditingItem(prev => prev ? { ...prev, imagem_url: url } : null)}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60">Ordem de Exibição</label>
                      <input
                        type="number"
                        value={editingItem?.ordem || 0}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, ordem: Number(e.target.value) } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60">Descrição Detalhada</label>
                  <textarea
                    rows={3}
                    value={editingItem?.descricao || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, descricao: e.target.value } : null)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors resize-none"
                    placeholder="Fale um pouco sobre este espaço..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#008FC7] to-[#1C75BC] hover:shadow-xl hover:shadow-[#008FC7]/30 font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Salvar Ambiente
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal de Confirmação de Exclusão ── */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#16162A] border border-white/10 rounded-[32px] p-8 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Excluir Ambiente?</h3>
              <p className="text-white/60 mb-8">Esta ação removerá este espaço da seção de infraestrutura do site.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 rounded-2xl bg-red-500 hover:bg-red-600 font-bold transition-all"
                >
                  Confirmar Exclusão
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
