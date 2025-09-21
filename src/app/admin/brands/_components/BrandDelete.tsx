"use client"

import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { deleteBrand } from '../_action/Brand'

interface Props {
    token: string
    id: number
}

const BrandDelete = ({ token, id }: Props) => {

    const router = useRouter()

    const [state, setState] = useState({
        pending: false,
        message: '',
        status: 0
    })

    async function handleDelete() {

        setState((prev) => ({ ...prev, pending: true }))

        try {
            await deleteBrand(id, token)
            setState((prev) => ({ ...prev, message: 'Brand deleted successfull', status: 200 }))
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
        <div>
            <Button onClick={handleDelete} variant={"primary_two"} size={"icon"} disabled={state.pending}>
                {state.pending ? <LoadingComponent /> : <Trash2 />}
            </Button>
        </div>
    )
}

export default BrandDelete