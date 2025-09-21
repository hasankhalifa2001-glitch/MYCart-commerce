import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getAllOrdersByAdmin } from './_action/Orders';
import OrdersTable from './_components/OrdersTable';
import { token } from '@/app/product/page';
import { Fade } from 'react-awesome-reveal';

const OrdersPage = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;
    const decoded = jwt.decode(token) as token;
    const role = decoded.role

    const orders = await getAllOrdersByAdmin(token)

    // console.log(orders)

    return (
        <Fade cascade direction="up" damping={0.15} triggerOnce>
            <div className='text-2xl font-semibold my-5'>Orders List</div>
            <OrdersTable orders={orders} token={token} role={role} />
        </Fade>
    )
}

export default OrdersPage