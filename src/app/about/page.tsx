import MainHeading from "@/components/MainHeading";
import { Slide } from "react-awesome-reveal";

// app/about/page.tsx
export default function AboutPage() {
    return (
        <Slide direction="up" triggerOnce>
            <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
                <div className="text-center mb-5">
                    <MainHeading subTitle={"Our story"} title={"About us"} />
                </div>

                <p>
                    🌿{" "}
                    <strong>
                        Welcome to My Smart Cart Platform – Where Trust Meets Smart Shopping
                    </strong>
                </p>

                <p>
                    At My Smart Cart Platform, we don’t just sell products — we build real
                    trust through every dish you bring to the table. Our platform is
                    designed to deliver unmatched quality, transparency, and peace of mind.
                </p>

                <h2 className="text-2xl font-semibold mt-6">
                    ✅ Why My Smart Cart Platform?
                </h2>

                <p>
                    <strong>🌟 Trusted Quality:</strong>
                    <br />
                    Every item on our store is carefully selected and curated. We prioritize
                    safety, source transparency, and nutritional integrity — so you can shop
                    with complete confidence.
                </p>

                <p>
                    <strong>🤖 Smart Allergy Detection:</strong>
                    <br />
                    Our built-in AI goes beyond ingredients. It intelligently detects
                    potential allergens in dishes and alerts you before checkout — keeping
                    you and your loved ones safe.
                </p>

                <p>
                    <strong>🛒 User-Centric Experience:</strong>
                    <br />
                    My Smart Cart Platform is fast, easy to use, and designed around your
                    needs — from smooth browsing to instant product details.
                </p>

                <p>
                    <strong>🍽️ Food That Cares:</strong>
                    <br />
                    We believe every plate tells a story. Whether it’s for a memory, a
                    craving, or a health goal — My Smart Cart Platform supports you with
                    clear ingredient labels, allergy notices, and personalized suggestions.
                </p>

                <p>
                    <strong>🔒 Built on Trust:</strong>
                    <br />
                    With My Smart Cart Platform, you&apos;re not just shopping — you&apos;re
                    making informed, healthy, and safe choices for yourself and your family.
                </p>

                <p>
                    📦{" "}
                    <strong>
                        Join today and experience smart grocery shopping like never before.
                    </strong>
                </p>
            </main>
        </Slide>
    );
}
