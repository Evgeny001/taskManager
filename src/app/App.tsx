import './App.css'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/app-slice.ts'
import { getTheme } from '@/common/theme'
import { Header } from '@/common/components/Header/Header.tsx'
import { Main } from '@/app/Main.tsx'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
