/**
 * components/admin/ImageUpload.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Componente de upload de imagem premium para o painel administrativo.
 * Permite selecionar um arquivo local e gera uma URL de preview (Mock).
 */

'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ label, value, onChange, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulando delay de upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Criando uma URL local para o arquivo selecionado
    const localUrl = URL.createObjectURL(file);
    
    onChange(localUrl);
    setIsUploading(false);
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-semibold text-white/60 block">{label}</label>
      
      <div 
        className={`relative group h-48 rounded-2xl border-2 border-dashed transition-all overflow-hidden flex items-center justify-center bg-white/5
          ${value ? 'border-emerald-500/30' : 'border-white/10 hover:border-[#008FC7]/50 hover:bg-white/[0.08] cursor-pointer'}`}
        onClick={() => !value && !isUploading && fileInputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <Loader2 className="animate-spin text-[#008FC7]" size={32} />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Enviando...</span>
            </motion.div>
          ) : value ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative w-full h-full"
            >
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Trocar imagem"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                  className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                  title="Remover imagem"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 text-white/20 group-hover:text-[#008FC7]/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Clique para fazer upload</p>
                <p className="text-[10px] uppercase tracking-wider">JPG, PNG ou SVG</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
