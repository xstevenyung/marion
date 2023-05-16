import 'tailwindcss/tailwind.css'
import { FlashContextProvider } from '@/components/FlashContext'

const App = ({ Component, pageProps }) => {
    return <FlashContextProvider>
        <Component {...pageProps} />
    </FlashContextProvider>
}

export default App
