// app/api/allergens/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await axios.post(
            "https://allergen-status-of-food-products.onrender.com/predict",
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error calling external API:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from external API" },
            { status: 500 }
        );
    }
}
