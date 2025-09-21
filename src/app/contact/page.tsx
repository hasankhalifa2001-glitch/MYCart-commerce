import MainHeading from "@/components/MainHeading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import { Slide } from "react-awesome-reveal";

const ContactPage = () => {
    return (
        <Slide direction="up" triggerOnce>
            <section className='my-8 md:my-16' id='about'>
                <MaxWidthWrapper>
                    <div className='text-center mb-5'>
                        <MainHeading subTitle={"Don't hesitate"} title={'Contact us'} />
                    </div>
                    <div className='text-slate-900 text-4xl text-center max-w-md mx-auto mt-4 '>
                        +963997931652
                    </div>
                </MaxWidthWrapper>
            </section>
        </Slide>
    );
};

export default ContactPage;
