/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OrdersTableRow from "./OrdersTableRow";

interface Props {
    orders: any;
    token: string;
    role: string;
}

const OrdersTable = ({ orders, token, role }: Props) => {

    console.log(orders)

    const head =
        role === "admin"
            ? [
                "id",
                "Email",
                "Items Number",
                "Paid",
                "Payment Type",
                "Created At",
                "Total Price",
                "Action",
            ]
            : [
                "id",
                "Items Number",
                "Paid",
                "Payment Type",
                "Created At",
                "Total Price",
                "Action",
            ];

    return orders ? (
        <div>
            {orders.length > 0 ? (
                <div className="w-full table shadow my-5 rounded-lg border mb-20">
                    <div className="table-header-group">
                        <div className="table-row font-bold">
                            {head.map((item, index) => (
                                <div className="table-cell bg-gray-100" key={index}>
                                    <div
                                        className={`m-4 ml-0  ${index === 0 ? `` : `border-l border-l-slate-300`
                                            } pl-4`}
                                    >
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="table-row-group text-[15px]">
                        {orders.map((order: any) => {
                            return (
                                <OrdersTableRow
                                    key={order.id}
                                    order={order}
                                    token={token}
                                    role={role}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center text-2xl font-semibold">
                    No Orders
                </div>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default OrdersTable;
