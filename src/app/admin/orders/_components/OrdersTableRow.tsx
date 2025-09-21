"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "@/components/link/Link";
import { ArrowRightCircleIcon } from "lucide-react";
import { fromatCurrency } from "@/lib/formatters";
import UpdateOrder from "./UpdateOrder";
import ReorderButton from "./ReorderButton";

interface Props {
    order: any;
    token: string;
    role: string;
}

const OrdersTableRow = ({ order, token, role }: Props) => {


    return (
        <div className={`table-row  overflow-hidden `} key={order.id}>
            <div className="table-cell p-4 rounded-bl-lg border-t font-semibold">
                {order.id}
            </div>
            {role === "admin" ? (
                <div className="table-cell text-slate-700 p-4 border-t font-semibold w-fit">
                    <div className="flex items-center gap-3 w-fit">
                        <div>{order.user.email}</div>
                        <div>
                            <Link href={`/admin/users/${order.user.id}`} className={``}>
                                <ArrowRightCircleIcon size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                {order.cart_items.length}
            </div>
            <div className="table-cell  p-4 border-t font-semibold">
                {order.is_paid ? (
                    <div className="text-green-600">True</div>
                ) : (
                    <div className="text-destructive">False</div>
                )}
            </div>
            <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                {order.payment_method_type}
            </div>
            <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                {new Date(order.created_at).toDateString()}
            </div>
            <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                {fromatCurrency(order.total_order_price)}
            </div>
            <div className="table-cell p-4 rounded-br-lg border-t font-semibold">
                {role === "user" ? (
                    <ReorderButton token={token} order={order} />
                ) : order.is_paid ? (
                    <div className={`text-green-600`}>Updated</div>
                ) : (
                    <UpdateOrder token={token} order={order} />
                )}
            </div>
        </div>
    );
};

export default OrdersTableRow;
