import React, { useRef, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, Heading1, Heading2, AlignLeft, AlignCenter, Quote, Code, Minus } from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    if (onChange) {
      setTimeout(() => onChange(editorRef.current?.innerHTML || ''), 0);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (onChange) onChange(editorRef.current?.innerHTML || '');
  }, [onChange]);

  const insertLink = () => {
    const url = prompt('Digite a URL:');
    if (url) execCommand('createLink', url);
  };

  const insertImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        execCommand('insertHTML', `<img src="${data.url}" alt="Imagem" style="max-width:100%;border-radius:8px;margin:1rem 0;" />`);
      }
    } catch (err) {
      console.error('Erro no upload:', err);
    }
    e.target.value = '';
  };

  const tools = [
    { icon: Heading1, action: () => execCommand('formatBlock', 'h2'), title: 'Título' },
    { icon: Heading2, action: () => execCommand('formatBlock', 'h3'), title: 'Subtítulo' },
    { type: 'divider' },
    { icon: Bold, action: () => execCommand('bold'), title: 'Negrito' },
    { icon: Italic, action: () => execCommand('italic'), title: 'Itálico' },
    { icon: Underline, action: () => execCommand('underline'), title: 'Sublinhado' },
    { type: 'divider' },
    { icon: AlignLeft, action: () => execCommand('justifyLeft'), title: 'Alinhar esquerda' },
    { icon: AlignCenter, action: () => execCommand('justifyCenter'), title: 'Centralizar' },
    { type: 'divider' },
    { icon: List, action: () => execCommand('insertUnorderedList'), title: 'Lista' },
    { icon: ListOrdered, action: () => execCommand('insertOrderedList'), title: 'Lista numerada' },
    { icon: Quote, action: () => execCommand('formatBlock', 'blockquote'), title: 'Citação' },
    { icon: Minus, action: () => execCommand('insertHorizontalRule'), title: 'Linha horizontal' },
    { type: 'divider' },
    { icon: Link, action: insertLink, title: 'Link' },
    { icon: Image, action: () => fileInputRef.current?.click(), title: 'Inserir imagem' },
  ];

  return (
    <div className="rich-editor">
      <div className="editor-toolbar">
        {tools.map((tool, i) => {
          if (tool.type === 'divider') return <div key={i} className="toolbar-divider" />;
          const Icon = tool.icon;
          return (
            <button key={i} type="button" className="toolbar-btn" onClick={tool.action} title={tool.title}>
              <Icon size={16} />
            </button>
          );
        })}
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={insertImage} />
      </div>
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        data-placeholder={placeholder || 'Comece a escrever...'}
      />
    </div>
  );
};

export default RichTextEditor;
