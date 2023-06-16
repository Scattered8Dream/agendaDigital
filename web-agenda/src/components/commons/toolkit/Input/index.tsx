import React, { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <fieldset className="flex flex-col mb-4">
        <label>
          <p className="text-slate-900 text-lg font-medium mb-2">{label}</p>
          <input
            type="text"
            className="w-full border border-neutral-900 p-2 rounded"
            ref={ref}
            {...rest}
          />
        </label>
      </fieldset>
    )
  }
)
