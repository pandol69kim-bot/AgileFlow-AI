const VARIANTS = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  secondary: 'border border-surface-border text-slate-300 hover:bg-surface-overlay',
  ghost: 'text-slate-400 hover:text-slate-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};
const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export function Button({ variant = 'primary', size = 'md', disabled, isLoading, children, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {isLoading ? <span className="animate-spin">⟳</span> : null}
      {children}
    </button>
  );
}
