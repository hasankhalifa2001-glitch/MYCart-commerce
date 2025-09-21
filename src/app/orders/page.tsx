import React from 'react'
import { cookies } from 'next/headers';
import OrdersTable from '@/app/admin/orders/_components/OrdersTable';
import { getAllOrdersByUser } from '../admin/orders/_action/Orders';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import jwt from 'jsonwebtoken';
import { token } from '../product/page';


const OrderPage = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;
    const decoded = jwt.decode(token) as token;
    const role = decoded.role

    const orders = await getAllOrdersByUser(token)
    return (
        <div className='my-10'>
            <MaxWidthWrapper>
                <div className='font-bold text-3xl my-4'>My Order</div>
                <OrdersTable orders={orders} token={token} role={role} />
            </MaxWidthWrapper>
        </div>
    )
}

export default OrderPage