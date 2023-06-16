import React, { ButtonHTMLAttributes } from 'react'

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
      className="w-full flex items-center justify-center bg-blue-700 text-neutral-100 font-medium text-lg hover:brightness-110 rounded transition-all p-4"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="animate-spin h-7 w-7">
          <svg
            version="1.1"
            id="L10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            ></path>
          </svg>
        </div>
      ) : (
        label
      )}
    </button>
  )
}
