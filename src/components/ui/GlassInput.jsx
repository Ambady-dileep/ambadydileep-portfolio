export function GlassInput({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  rows,
  compact = false,
}) {
  const shared =
    'glass-input w-full rounded-xl text-[var(--text)] font-light tracking-[-0.01em] placeholder:text-[var(--text-subtle)] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-50 focus:placeholder:-translate-y-0.5 transition-all duration-300';
  const sizing = compact
    ? 'px-3 py-2 text-[12px] sm:text-[13px]'
    : 'px-3.5 py-2.5 text-[13px]';

  if (rows) {
    return (
      <textarea
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`${shared} ${sizing} resize-none`}
      />
    );
  }

  return (
    <input
      id={id}
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${shared} ${sizing}`}
    />
  );
}
