import { ChangeEvent, useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
  console.log(value)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  return (
    <>
      {isEditMode ? (
        <input value={title} autoFocus onBlur={turnOffEditMode} onChange={changeTitle} />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
