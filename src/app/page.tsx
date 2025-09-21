import Link from "@/components/link/Link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { getCategories } from "./admin/categories/_action/Category";
import { Category } from "./admin/categories/page";
import Products from "@/components/products/Products";
import { get3NewestProductByUser, topSellingProductByUser } from "./admin/products/_action/Product";
import { Fade, Slide, Reveal } from "react-awesome-reveal";

export default async function Home() {
  const token = (await cookies()).get("jwtToken")?.value as string;

  const categories = await getCategories(token);

  const newestProduct = await get3NewestProductByUser()

  const topSelling = await topSellingProductByUser()

  const categoraies = [
    {
      title: "Organic Milk",
      discount: "Up To 25% OFF >",
      image: "/offer-img/offer-img-04.jpg",
    },
    {
      title: "Fresh Vagetables",
      discount: "Up To 35% OFF >",
      image: "/offer-img/offer-img-05.jpg",
    },
    {
      title: "Fresh Fruits",
      discount: "Up To 25% OFF >",
      image: "/offer-img/offer-img-02.jpg",
    },
    {
      title: "Orange Juice",
      discount: "Up To 25% OFF >",
      image: "/offer-img/offer-img-01.jpg",
    },
    // {
    //   title: "Breakfast & Dairy",
    //   discount: "Up To 25% OFF >",
    //   image: '/offer-img/offer-img-03.jpg'
    // },
  ];

  return (
    <div className="">

      <div className="border-b border-border shadow-md bg-gray-50">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between flex-col lg:flex-row pb-10 lg:p-1 lg:pb-10 xl:p-4">
            <Fade direction="up" cascade delay={1000} damping={0.15} triggerOnce>
              <div className="my-20  ">
                <div className="text-[32px] sm:text-5xl text-center lg:text-4xl xl:text-5xl font-bold lg:leading-[70px] xl:leading-[80px]">
                  Buy the best food <span className="text-primary">here</span>,{" "}
                  <br />
                  via the <span className="text-primary">My Cart Platform</span>.
                </div>
                <div className="text-base text-center xl:text-lg text-muted-foreground font-semibold my-8 lg:leading-[37px]">
                  Welcome to{" "}
                  <span className="text-primary">My Cart Platform</span>, We
                  provide all types <br />
                  of cooked and fresh food using latest advanced methods.
                </div>
                <div className="flex flex-col justify-center sm:flex-row gap-5 mt-6 flex-wrap">
                  <div className="relative w-fit mx-auto sm:m-0">
                    <Link
                      href={"/menu"}
                      className={`${buttonVariants({
                        variant: "primary_two",
                        size: "lg",
                      })} font-semibold mx-auto sm:mx-0`}
                    >
                      Browser Trending
                    </Link>
                    <div className="bg-primary text-white absolute top-1/4 -right-[10px] rounded-full size-[18px] flex justify-center items-center">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="mx-auto sm:mx-0"
                  >
                    <Link href={'/about'}>Our quality promise &rarr;</Link>
                  </Button>
                  <div className="allergy-detect-btn duration-300 shadow hover:shadow-md w-fit mx-auto sm:mx-0">
                    <Link href={'/ai'}>
                      Allergens Detection 🔎
                    </Link>
                  </div>

                </div>
              </div>
            </Fade>
            <Slide direction="right" triggerOnce>
              <div className="hidden lg:block relative">
                <Image
                  src={"/supermarket basket.png"}
                  className="relative z-10"
                  width={370}
                  height={400}
                  alt="image"
                />
              </div>
            </Slide>
          </div>
        </MaxWidthWrapper>
      </div>


      {/* our product */}
      <Reveal triggerOnce>
        <section className="py-20">
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="relative xl:w-3/5">
                <Image
                  src={`/slider-02__71477.jpg`}
                  alt="image"
                  width={800}
                  height={300}
                  className="size-full object-cover rounded-lg"
                />
                <div className="absolute flex flex-col gap-3 sm:gap-4 min-2xl:gap-5 top-1/2 -translate-y-1/2 left-1/18 ">
                  <div className="font-semibold sm:text-2xl min-[60rem]:text-3xl  min-2xl:text-3xl">
                    ALWAY FRESH & JUICY
                  </div>
                  <div className="font-bold text-2xl sm:text-4xl min-[60rem]:text-5xl  min-2xl:text-5xl">
                    Vegetables Sauce
                  </div>
                  <div className="relative w-fit">
                    <Link
                      href={"/categories"}
                      className={`${buttonVariants({
                        variant: "primary_two",
                        size: "default",
                      })} font-semibold mx-auto sm:mx-0`}
                    >
                      Shop Now
                    </Link>
                    <div className="bg-primary text-white rounded-full size-5 flex justify-center items-center absolute top-1/4 -right-2 ">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

              </div>
              <div className="xl:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative m-auto">
                  <Image
                    src={`/top-banner-01.jpg`}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/16 flex flex-col items-center">
                    <div className="font-semibold text-lg">Season Sale</div>
                    <div className="font-bold text-2xl">Daily Eating</div>
                  </div>
                </div>
                <div className="relative m-auto">
                  <Image
                    src={`/top-banner-02.jpg`}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="absolute left-1/12 top-1/12 mr-8">
                    <div className="text-lg font-semibold">New Arrivals</div>

                    <div className="text-2xl font-bold">Fresh Vegetables</div>

                    <div className="relative w-fit my-5 flex items-center gap-4">
                      <div className="font-bold ">shop now</div>
                      <div className="bg-primary-two text-white rounded-full size-[18px] flex justify-center items-center top-[1px] relative">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative m-auto">
                  <Image
                    src={`/top-banner-03.jpg`}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="absolute left-1/12 top-1/12 mr-20">
                    <div className="text-lg font-semibold">100% Organics</div>

                    <div className="text-2xl font-bold">Healthy Fruits</div>

                    <div className="relative w-fit my-5 flex items-center gap-4">
                      <div className="font-bold ">New Stock</div>
                      <div className="bg-primary-two text-white rounded-full size-[18px] flex justify-center items-center top-[1px] relative">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative m-auto">
                  <Image
                    src={`/top-banner-04.jpg`}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/16 flex flex-col items-center space-y-1.5">
                    <div className="font-semibold font-lg">Big Saving</div>
                    <div className="font-bold text-xl">Save 35% OFF</div>
                    <div className="relative w-fit">
                      <div
                        className={` font-semibold mx-auto sm:mx-0 py-1.5 px-3`}
                      >
                        Save 20%
                      </div>
                      <div className="bg-primary-two text-white rounded-full size-[18px] flex justify-center items-center absolute top-1/4 -right-[10px] ">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      </Reveal>

      {/* our categories */}
      <Fade direction="up" cascade damping={0.15} triggerOnce>
        <section className="bg-gray-100 px-5 md:px-0 py-20">
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {categoraies ? categoraies.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white flex items-center p-5 rounded shadow"
                  >
                    <div>
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={100}
                        height={100}
                      />
                    </div>
                    <Separator orientation="vertical" className="ml-1 mr-[1px]" />
                    <Separator orientation="vertical" className="mr-1 ml-[1px]" />
                    <div className="space-y-2 mx-auto">
                      <div className="text-destructive font-semibold text-sm">
                        Big Range Of
                      </div>
                      <div className="font-bold text-xl">{category.title}</div>
                      <div className="text-primary font-semibold text-sm">
                        {category.discount}
                      </div>
                    </div>
                  </div>
                );
              }) : <div>No Information</div>}
            </div>
          </MaxWidthWrapper>
        </section>
      </Fade>

      {/* Shop Categories */}
      <Fade direction="up" cascade damping={0.15} triggerOnce>
        <section className="py-20">
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="text-2xl mb-5 font-bold">Shop Categories</div>
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {categories ? categories?.date.map((category: Category, index: number) => {
                  return (
                    index <= 2 && <div
                      key={index}
                      className="border relative rounded shadow grid grid-cols-2 hover:-translate-y-2 hover:shadow-md duration-500"
                    >

                      <div className="relative">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={220}
                          height={220}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-lg font-bold flex flex-col justify-evenly items-center">
                        <div className="text-center">
                          {category.name}
                        </div>
                        <div className="relative ">
                          <Link
                            href={`/categories/${category.id}`}
                            className={`${buttonVariants({
                              variant: "primary_two",
                              // size: "lg",
                            })} font-semibold mx-auto sm:mx-0`}
                          >
                            Products
                          </Link>
                          <div className="bg-primary text-white absolute top-1/4 -right-[10px] rounded-full size-[18px] flex justify-center items-center">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }) : <div>Categories</div>}
              </div>
              <div className="relative w-fit mx-auto sm:m-0 hover-wiggle">
                <Link
                  href={"/categories"}
                  className={`${buttonVariants({
                    variant: "primary_two",
                    size: "lg",
                  })} font-semibold mx-auto sm:mx-0`}
                >
                  See More
                </Link>
                <div className="bg-primary text-white absolute top-1/4 -right-[10px] rounded-full size-[18px] flex justify-center items-center">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      </Fade>

      {/* Best Sellers */}
      <Fade direction="up" cascade damping={0.15} triggerOnce>
        <section className="bg-gray-100 py-20">
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="text-2xl mb-5 font-bold">Best Sellers</div>
            <div className="my-10">
              <Products
                products={topSelling} token={token} all
              />
            </div>
          </MaxWidthWrapper>
        </section>
      </Fade>

      {/* Newest Products */}
      <Fade direction="up" cascade damping={0.15} triggerOnce>
        <section className="py-20">
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="text-2xl mb-5 font-bold">Newset Product</div>
            <div className="my-10">
              <Products
                products={newestProduct} token={token} all
              />
            </div>
          </MaxWidthWrapper>

        </section>
      </Fade>
    </div>
  );
}
