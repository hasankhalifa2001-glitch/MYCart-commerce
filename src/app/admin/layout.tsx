import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AdminTabs from "./_components/AdminTabs";

const layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="height-auth ">
        <AdminTabs />
        <div className="">
            <MaxWidthWrapper className="max-w-screen-2xl">
                {children}
            </MaxWidthWrapper>
        </div>
    </div>;
};

export default layout;
