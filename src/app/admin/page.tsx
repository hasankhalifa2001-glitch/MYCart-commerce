import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import OrderStatsDashboard from './_components/OrderStatsDashboard'
import { ChartLineDotsCustom } from './_components/ChartLineDotsCustom'
import { Fade } from 'react-awesome-reveal'

const AdminPage = async () => {

    const token = (await cookies()).get('jwtToken')?.value
    if (!token) {
        redirect('/')
    }

    return (
        <Fade cascade direction="up" damping={0.15} triggerOnce>
            <div className='grid grid-cols-2 gap-5 my-5'>
                <OrderStatsDashboard token={token} />
                <ChartLineDotsCustom token={token} />
            </div>
        </Fade>
    )
}

export default AdminPage