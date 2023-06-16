import React, { ButtonHTMLAttributes } from 'react'

import { AnimatedLoadingIcon } from '../../../../assets/loadingIcon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className="w-full bg-blue-700 text-neutral-100 font-medium text-lg hover:brightness-110 rounded transition-all p-4"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AnimatedLoadingIcon />
        </div>
      ) : (
        label
      )}
    </button>
  )
}
