import { ChangeEvent, type KeyboardEvent, useState } from 'react'
import { Button } from '../../shared/ui/Button/Button.tsx'

type Props = {
  onCreateItem: (title: string) => void
}
export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button onClick={createItemHandler}>+</Button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  )
}
