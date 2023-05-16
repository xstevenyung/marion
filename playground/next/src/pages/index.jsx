import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Marion Playground</title>
            </Head>

            <main>
                <button
                    type="button"
                    onClick={async () => {
                        await axios.get('/api/toasts/error')
                    }}>
                    Toast error
                </button>
            </main>
        </>
    )
}
