import ImageLogo from "@/components/shared/ImageLogo";
import RightSide from "./RightSide";
import { Separator } from "@/components/ui/separator";
import MidSide from "./MidSide";
import MobileNav from "./MobileNav";
import { getCartLength } from "@/services/cart";

const Navbar = async () => {
  const cartLength = await getCartLength();

  return (
    <>
      <MobileNav />
      <header>
        <nav className="pt-2  relative z-20">
          <div className="fl-center justify-between  xl:gap-12 lg:gap-10 md:gap-8 sm:gap-6 gap-4 px-6 ">
            <ImageLogo />
            <MidSide />
            <RightSide cartLength={cartLength!} />
          </div>
          <Separator className="mt-4" />
        </nav>
      </header>
    </>
  );
};

export default Navbar;
