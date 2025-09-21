"use client"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { domain } from '@/constant/postman'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/LoadingComponent'

interface Props {
    reviewId: number
    token: string
}

const DeleteReview = ({ reviewId, token }: Props) => {

    const [state, setState] = useState({
        pending: false,
        message: '',
        status: 0
    })

    const router = useRouter()

    const DeleteUser = async () => {
        setState((prev) => ({ ...prev, pending: true }))
        try {
            await axios.delete(`${domain}/review/${reviewId}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })

            setState((prev) => ({ ...prev, message: 'Review deleted successfull', status: 200 }))
        } catch (error) {
            console.log(error)
        } finally {
            setState((prev) => ({ ...prev, pending: false }))
        }
    }

    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            router.refresh()
            toast(state.message, {
                className: state.status === 200 ? '!text-green-400' : '!text-destructive',
                position: 'top-center'
            })
        }
    }, [state.pending, state.message, state.status, router])


    return (
        <Button variant={'destructive'} size={'icon'} onClick={DeleteUser} className='cursor-pointer !size-8' disabled={state.pending} >
            {state.pending ? <LoadingComponent /> : <Trash2 />}
        </Button>
    )
}

export default DeleteReview