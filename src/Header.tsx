import {useDarkMode} from './useDarkMode.ts'

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <header>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Dark' : 'Light'}
        </button>
      </header>
    </>
  )
}

export default Header
