/**
 * app/admin/hero/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerenciamento dos Slides do Banner Principal (Hero).
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Layout, Loader2 } from 'lucide-react';
import { buscarSlidesHero, salvarSlideHero, SlideHero } from '@/services/supabaseService';
import ImageUpload from '@/components/admin/ImageUpload';

export default function HeroAdmin() {
  const [slides, setSlides] = useState<SlideHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<SlideHero | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const data = await buscarSlidesHero();
      setSlides(data);
    } catch (error) {
      console.error('Erro ao buscar slides:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (slide?: SlideHero) => {
    if (slide) {
      setEditingSlide(slide);
    } else {
      setEditingSlide({
        id: slides.length + 1,
        titulo_principal: '',
        subtitulo: '',
        texto_botao_primario: 'Saiba Mais',
        link_botao_primario: '#',
        texto_botao_secundario: 'Contato',
        link_botao_secundario: '#',
        imagem_url_fundo: '',
        imagem_url_destaque: '',
        badge_texto: 'Novo Slide',
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    try {
      await salvarSlideHero(editingSlide);
      setIsModalOpen(false);
      carregarDados();
    } catch (error) {
      alert('Erro ao salvar slide');
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">Banner Principal (Hero)</h2>
          <p className="text-white/50">Gerencie os slides e chamadas principais do topo da página.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#008FC7] hover:bg-[#1C75BC] text-white font-bold transition-all shadow-lg shadow-[#008FC7]/20"
        >
          <Plus size={20} />
          Adicionar Slide
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#008FC7]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {slides.map((slide) => (
            <motion.div
              layout
              key={slide.id}
              className="group bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-48 aspect-video relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img src={slide.imagem_url_destaque} alt={slide.titulo_principal} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-xs font-bold text-[#008FC7] uppercase tracking-widest">{slide.badge_texto}</span>
                <h4 className="font-bold text-xl mb-2" dangerouslySetInnerHTML={{ __html: slide.titulo_principal }} />
                <p className="text-sm text-white/50 line-clamp-2">{slide.subtitulo}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(slide)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <Edit2 size={20} />
                </button>
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
              className="relative w-full max-w-4xl bg-[#16162A] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Editar Slide Hero</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Título Principal (HTML permitido)</label>
                    <input
                      required
                      type="text"
                      value={editingSlide?.titulo_principal || ''}
                      onChange={(e) => setEditingSlide(prev => prev ? { ...prev, titulo_principal: e.target.value } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60">Badge de Topo</label>
                    <input
                      type="text"
                      value={editingSlide?.badge_texto || ''}
                      onChange={(e) => setEditingSlide(prev => prev ? { ...prev, badge_texto: e.target.value } : null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60">Subtítulo / Descrição</label>
                  <textarea
                    rows={2}
                    value={editingSlide?.subtitulo || ''}
                    onChange={(e) => setEditingSlide(prev => prev ? { ...prev, subtitulo: e.target.value } : null)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload 
                    label="Imagem de Fundo (Background)"
                    value={editingSlide?.imagem_url_fundo || ''}
                    onChange={(url) => setEditingSlide(prev => prev ? { ...prev, imagem_url_fundo: url } : null)}
                  />
                  <ImageUpload 
                    label="Imagem de Destaque (Frente)"
                    value={editingSlide?.imagem_url_destaque || ''}
                    onChange={(url) => setEditingSlide(prev => prev ? { ...prev, imagem_url_destaque: url } : null)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div className="space-y-4">
                    <h5 className="font-bold text-white/40 uppercase text-xs tracking-widest">Botão Primário</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Texto"
                        value={editingSlide?.texto_botao_primario || ''}
                        onChange={(e) => setEditingSlide(prev => prev ? { ...prev, texto_botao_primario: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#008FC7]"
                      />
                      <input
                        placeholder="Link"
                        value={editingSlide?.link_botao_primario || ''}
                        onChange={(e) => setEditingSlide(prev => prev ? { ...prev, link_botao_primario: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#008FC7]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-bold text-white/40 uppercase text-xs tracking-widest">Botão Secundário</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Texto"
                        value={editingSlide?.texto_botao_secundario || ''}
                        onChange={(e) => setEditingSlide(prev => prev ? { ...prev, texto_botao_secundario: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#008FC7]"
                      />
                      <input
                        placeholder="Link"
                        value={editingSlide?.link_botao_secundario || ''}
                        onChange={(e) => setEditingSlide(prev => prev ? { ...prev, link_botao_secundario: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#008FC7]"
                      />
                    </div>
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
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#008FC7] to-[#1C75BC] font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Salvar Slide
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
