/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🦝 Todo: CREATE RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import cn from 'clsx'
import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormInvalid'
import { useFormContext } from 'react-hook-form'
// import { AnimatePresence, motion } from 'framer-motion'
// import { MdError } from 'react-icons/md'

export const Input = ({label, type, pattern, placeholder, maxlength, name, handleChange, value, validation}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)

  return (
      <div className="fieldset">
        {(label) &&
            <div className="label">
              <label
                htmlFor={name}
                {...(isInvalid ? { className: "isInvalid" } : undefined)}
              >{label}</label>

              {/* Display error message */}
              {isInvalid && (
                <InputError
                  message={inputError.error.message}
                  key={inputError.error.message}
                />
              )}
            </div>
        }
        <input
            {...(isInvalid ? { className: "isInvalid" } : undefined)}
            id={name}
            name={name}
            value={value}
            type={type}
            {...(type == "number") ? {inputMode: "numeric"} : undefined}
            pattern={pattern}

        placeholder={placeholder}
        {...(maxlength ? { maxLength: maxlength, size: maxlength } : {})}
        {...register(name, validation)}
        {...register(name, { onChange: (e) => { handleChange(e) }} )}
        />
 
      </div>
    )
}

const InputError = ({ message }) => {
  return <div className="inputError">{message}</div>
}
