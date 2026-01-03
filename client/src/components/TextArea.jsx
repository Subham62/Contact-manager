import React from 'react';
import { cn } from '../lib/utils';

const Textarea = React.forwardRef(({ 
  label, 
  error, 
  className,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'input-field resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
