import React, { useRef, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, Heading1, Heading2, AlignLeft, AlignCenter, Quote, Code, Minus, X } from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const isInternalChange = useRef(false);

  React.useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const updateValue = useCallback(() => {
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  const execCommand = useCallback((command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    isInternalChange.current = true;
    updateValue();
  }, [updateValue]);

  const handleInput = useCallback(() => {
    isInternalChange.current = true;
    updateValue();
  }, [updateValue]);

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
        // Use a wrapper div/p if needed to prevent RTL jumping or issues
        const imgHtml = `<p><img src="${data.url}" alt="Imagem" style="max-width:100%;border-radius:8px;margin:1rem 0;" /></p>`;
        execCommand('insertHTML', imgHtml);
      }
    } catch (err) {
      console.error('Erro no upload:', err);
    }
    e.target.value = '';
  };

  const handleEditorClick = (e) => {
    if (e.target.tagName === 'IMG') {
      // Clear previous selections
      const imgs = editorRef.current.querySelectorAll('img');
      imgs.forEach(img => img.classList.remove('selected'));
      // Select this one
      e.target.classList.toggle('selected');
    } else {
      const imgs = editorRef.current.querySelectorAll('img');
      imgs.forEach(img => img.classList.remove('selected'));
    }
  };

  const deleteSelected = () => {
    const selected = editorRef.current.querySelector('img.selected');
    if (selected) {
      selected.remove();
      updateValue();
    } else {
      execCommand('delete');
    }
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
    { icon: X, action: deleteSelected, title: 'Remover Selecionado', danger: true },
  ];

  return (
    <div className="rich-editor">
      <div className="editor-toolbar">
        {tools.map((tool, i) => {
          if (tool.type === 'divider') return <div key={i} className="toolbar-divider" />;
          const Icon = tool.icon;
          return (
            <button 
              key={i} 
              type="button" 
              className={`toolbar-btn ${tool.danger ? 'text-danger' : ''}`} 
              onClick={tool.action} 
              title={tool.title}
            >
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
        dir="ltr"
        suppressContentEditableWarning
        onInput={handleInput}
        onClick={handleEditorClick}
        data-placeholder={placeholder || 'Comece a escrever...'}
      />
    </div>
  );
};

export default RichTextEditor;
