import { useState, useEffect } from 'react'
import * as Toast from '@radix-ui/react-toast'
import axios from '@/lib/axios'

export const FlashContextProvider = ({ children }) => {
    const [flashMessages, setFlashMessages] = useState([])

    useEffect(() => {
        axios.interceptors.response.use(response => {
            if (response.data?.flash) {
                console.log(response.data.flash)
                setFlashMessages(response.data.flash)
            }
            return response
        })
    }, [])

    return (
        <Toast.Provider swipeDirection="right">
            {children}

            {flashMessages.map((flashMessage, index) => {
                if (flashMessage.name === 'error') {
                    return <ToastError key={index} {...flashMessage} />
                }

                if (flashMessage.name === 'success') {
                    return <ToastSuccess key={index} {...flashMessage} />
                }

                return null
            })}
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    )
}

function ToastSuccess({ name, value }) {
    return (
        <Toast.Root className="bg-green-100 text-green-900 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                <div className="flex gap-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>

                    {value}
                </div>
            </Toast.Title>

            {/* <Toast.Description asChild>
                    <time
                        className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                        dateTime={eventDateRef.current.toISOString()}>
                        {prettyDate(eventDateRef.current)}
                    </time>
                </Toast.Description>
                <Toast.Action
                    className="[grid-area:_action]"
                    asChild
                    altText="Goto schedule to undo">
                    <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                        Undo
                    </button>
                </Toast.Action> */}
        </Toast.Root>
    )
}

function ToastError({ name, value }) {
    return (
        <Toast.Root className="bg-red-100 text-red-900 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                <div className="flex gap-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>

                    {value}
                </div>
            </Toast.Title>

            {/* <Toast.Description asChild>
                    <time
                        className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                        dateTime={eventDateRef.current.toISOString()}>
                        {prettyDate(eventDateRef.current)}
                    </time>
                </Toast.Description>
                <Toast.Action
                    className="[grid-area:_action]"
                    asChild
                    altText="Goto schedule to undo">
                    <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                        Undo
                    </button>
                </Toast.Action> */}
        </Toast.Root>
    )
}
