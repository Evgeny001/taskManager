import { ButtonHTMLAttributes, memo, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  disabled?: boolean
  children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
  const { children, ...otherProps } = props
  return <button {...otherProps}>{children}</button>
})
