import { ChangeEvent, type KeyboardEvent, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import { TextField } from '@mui/material'

type Props = {
  onCreateItem: (title: string) => void
}
export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
      <TextField
        label={'Enter a title'}
        variant={'outlined'}
        value={title}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />

      <IconButton onClick={createItemHandler} color={'primary'}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
