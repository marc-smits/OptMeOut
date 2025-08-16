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

export const Input = ({label, type, id, placeholder, maxlength, validation}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputError = findInputError(errors, label)
  const isInvalid = isFormInvalid(inputError)

  return (
      <div>
        <label
          htmlFor={id}
          {...(isInvalid ? { className: "isInvalid" } : undefined)}
        >{label}</label>

        {/* Display error message */}
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}

        <input
            {...(isInvalid ? { className: "isInvalid" } : undefined)}
            id={id}
            name={label}
            placeholder={placeholder}
            {...(maxlength ? { maxLength: maxlength, size: maxlength } : {})}
            {...register(label, {
              required: {
              value: true,
              message: 'required',
             },
           })}
        />
      </div>
)}

const InputError = ({ message }) => {
  return <div className="inputError">{message}</div>
  // console.log("Input Error" );
}
