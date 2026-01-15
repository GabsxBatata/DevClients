import { forwardRef, InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, type = 'text', ...rest }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()

        const form = e.currentTarget.form
        if (form) {
          const index = Array.from(form.elements).indexOf(e.currentTarget)
          const nextElement = form.elements[index + 1] as HTMLElement

          if (nextElement) {
            nextElement.focus()
          }
        }
      }

      rest.onKeyDown?.(e)
    }

    return (
      <div className="flex flex-col gap-1 group">
        <label
          htmlFor={rest.name}
          className="text-base w-fit cursor-pointer transition-colors group-focus-within:text-blue-400"
        >
          {label}
          {rest.required && <span className="text-red-400">*</span>}
        </label>
        <input
          ref={ref}
          onKeyDown={handleKeyDown}
          className={`${rest.className ? rest.className : ''} w-full h-9 rounded text-black px-2 border-transparent border-2 focus:border-blue-500 focus:border-solid focus:border-2 outline-none`}
          id={rest.name}
          name={rest.name}
          type={type}
          {...rest}
        />
        <span className="text-red-400 h-2 text-xs font-semibold">{error}</span>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
