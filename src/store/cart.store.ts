import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CartItem = {
    id: number;
    image: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    price_after_discount?: number;
};

interface CartStore {
    cartItems: CartItem[];
    addItemToCart: (item: CartItem) => void;
    plusQuantity: (id: number) => void;
    removeItemFromCart: (id: number) => void;
    MinusQunatity: (id: number) => void;
    removeCartItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist<CartStore>(
            (set) => ({
                cartItems: [],
                addItemToCart: (item) =>
                    set((state) => {
                        const existingItem = state.cartItems.find((i) => i.id === item.id);
                        if (existingItem) {
                            const newCart = state.cartItems.map((i) => {
                                if (i.id === existingItem.id) {
                                    return { ...i, quantity: i.quantity + 1 };
                                } else {
                                    return { ...i };
                                }
                            });
                            return { cartItems: newCart };
                        } else {
                            state.cartItems = [...state.cartItems, { ...item, quantity: 1 }];
                            return {};
                        }
                    }),
                plusQuantity: (id: number) => {
                    set((state) => {
                        const existingItem = state.cartItems.find((i) => i.id === id);
                        if (existingItem) {
                            const newCart = state.cartItems.map((i) => {
                                if (i.id === existingItem.id) {
                                    return { ...i, quantity: i.quantity + 1 };
                                } else {
                                    return { ...i };
                                }
                            });
                            return { cartItems: newCart };
                        } else return {};
                    });
                },
                removeItemFromCart: (id: number) =>
                    set((state) => {
                        const item = state.cartItems.find((item) => item.id === id);
                        if (item) {
                            if (item.quantity === 1) {
                                state.cartItems = state.cartItems.filter(
                                    (item) => item.id !== id
                                );
                                return {};
                            } else {
                                state.cartItems = state.cartItems.map((i) => {
                                    if (i.id === item.id) {
                                        return { ...i, quantity: i.quantity - 1 };
                                    } else {
                                        return { ...i };
                                    }
                                });
                                return {};
                            }
                        } else {
                            return {};
                        }
                    }),
                MinusQunatity: (id: number) => {
                    set((state) => {
                        const existingItem = state.cartItems.find((item) => item.id === id);
                        if (existingItem) {
                            if (existingItem.quantity === 1) {
                                state.cartItems = state.cartItems.filter(
                                    (item) => item.id !== id
                                );
                                return {};
                            } else {
                                state.cartItems = state.cartItems.map((i) => {
                                    if (i.id === existingItem.id) {
                                        return { ...i, quantity: i.quantity - 1 };
                                    } else {
                                        return { ...i };
                                    }
                                });
                                return {};
                            }
                        } else return {};
                    });
                },
                removeCartItem: (id: number) =>
                    set((state) => {
                        state.cartItems = state.cartItems = state.cartItems.filter(
                            (item) => item.id !== id
                        );
                        return {};
                    }),
                clearCart: () =>
                    set((state) => {
                        state.cartItems = [];
                        return {};
                    }),
            }),
            {
                name: "Cart-Storage",
            }
        )
    )
);
