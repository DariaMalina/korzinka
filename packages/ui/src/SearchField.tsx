import { useId, type ChangeEventHandler } from 'react';

export type SearchFieldProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  placeholder?: string;
  value: string;
};

export function SearchField({
  label,
  onChange,
  onClear,
  placeholder = 'Найти продукты',
  value,
}: SearchFieldProps) {
  const inputId = useId();

  return (
    <div className="ui-search-field">
      <label className="ui-visually-hidden" htmlFor={inputId}>
        {label}
      </label>
      <span aria-hidden="true" className="ui-search-field__icon">
        <svg viewBox="0 0 24 24">
          <circle cx="10.75" cy="10.75" r="6.25" />
          <path d="m15.5 15.5 4 4" />
        </svg>
      </span>
      <input
        id={inputId}
        onChange={onChange}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      {value && onClear ? (
        <button aria-label="Очистить поиск" onClick={onClear} type="button">
          ×
        </button>
      ) : null}
    </div>
  );
}
