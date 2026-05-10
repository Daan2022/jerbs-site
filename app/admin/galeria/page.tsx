/**
 * app/admin/galeria/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerenciamento da Galeria de Fotos.
 * Permite adicionar, editar e excluir itens da galeria.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { buscarGaleria, salvarItemGaleria, excluirItemGaleria, ItemGaleria } from '@/services/supabaseService';
import ImageUpload from '@/components/admin/ImageUpload';

export default function GaleriaAdmin() {
  const [itens, setItens] = useState<ItemGaleria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ItemGaleria | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const data = await buscarGaleria();
      setItens(data);
    } catch (error) {
      console.error('Erro ao buscar galeria:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (item?: ItemGaleria) => {
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem({
        id: Math.random().toString(36).substr(2, 9),
        titulo: '',
        descricao: '',
        icone_slug: 'camera',
        cor_inicio: '#008FC7',
        cor_fim: '#1C75BC',
        col_span: 1,
        row_span: 1,
        imagem_url: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await salvarItemGaleria(editingItem);
      setIsModalOpen(false);
      carregarDados();
    } catch (error) {
      alert('Erro ao salvar item');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta imagem?')) {
      try {
        await excluirItemGaleria(id);
        carregarDados();
      } catch (error) {
        alert('Erro ao excluir item');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">Galeria de Fotos</h2>
          <p className="text-white/50">Gerencie as imagens exibidas na seção de "Momentos Inesquecíveis".</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#008FC7] hover:bg-[#1C75BC] text-white font-bold transition-all shadow-lg shadow-[#008FC7]/20"
        >
          <Plus size={20} />
          Adicionar Foto
        </button>
      </div>

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
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
            >
              <div className="aspect-video relative overflow-hidden bg-white/5">
                {item.imagem_url ? (
                  <img src={item.imagem_url} alt={item.titulo} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
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
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg mb-1">{item.titulo}</h4>
                <p className="text-sm text-white/50 line-clamp-2">{item.descricao}</p>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#16162A] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">{editingItem?.id ? 'Editar Foto' : 'Nova Foto'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Título</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.titulo || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, titulo: e.target.value } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                      placeholder="Ex: Festa da Família"
                    />
                  </div>
                  <div className="space-y-2">
                    {/* Componente de Upload de Imagem */}
                    <ImageUpload 
                      label="Foto da Galeria"
                      value={editingItem?.imagem_url || ''}
                      onChange={(url) => setEditingItem(prev => prev ? { ...prev, imagem_url: url } : null)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60">Descrição</label>
                  <textarea
                    rows={3}
                    value={editingItem?.descricao || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, descricao: e.target.value } : null)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors resize-none"
                    placeholder="Breve descrição do evento..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Col Span (Grid)</label>
                    <select
                      value={editingItem?.col_span || 1}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, col_span: Number(e.target.value) } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                    >
                      <option value={1} className="bg-[#16162A]">Normal (1)</option>
                      <option value={2} className="bg-[#16162A]">Largo (2)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Row Span (Grid)</label>
                    <select
                      value={editingItem?.row_span || 1}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, row_span: Number(e.target.value) } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                    >
                      <option value={1} className="bg-[#16162A]">Normal (1)</option>
                      <option value={2} className="bg-[#16162A]">Alto (2)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Ícone (Slug)</label>
                    <input
                      type="text"
                      value={editingItem?.icone_slug || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, icone_slug: e.target.value } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                      placeholder="ex: star, heart..."
                    />
                  </div>
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
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
