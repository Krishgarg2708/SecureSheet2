import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { CustomCellEditorProps } from 'ag-grid-react';

export interface GenericEditorParams extends CustomCellEditorProps {
  cellType: 'text' | 'number' | 'select' | 'date' | 'textarea';
  options?: string[];
}

const GenericCellEditor = forwardRef((props: GenericEditorParams, ref) => {
  const [value, setValue] = useState(props.value ?? '');
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    getValue() {
      return props.cellType === 'number' ? Number(value) : value;
    },
    isCancelBeforeStart() {
      return false;
    },
    isCancelAfterEnd() {
      return false;
    },
  }));

  const baseClass = 'w-full h-full px-2.5 text-sm bg-white dark:bg-ledger-800 text-ledger-900 dark:text-ledger-50 outline-none border-2 border-gold-500 rounded-md';

  if (props.cellType === 'select') {
    return (
      <select autoFocus className={baseClass} value={value} onChange={(e) => setValue(e.target.value)}>
        {(props.options || []).map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  if (props.cellType === 'textarea') {
    return (
      <textarea
        autoFocus
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        className={`${baseClass} resize-none py-1.5`}
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <input
      autoFocus
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={props.cellType === 'number' ? 'number' : props.cellType === 'date' ? 'date' : 'text'}
      className={baseClass}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

GenericCellEditor.displayName = 'GenericCellEditor';
export default GenericCellEditor;
