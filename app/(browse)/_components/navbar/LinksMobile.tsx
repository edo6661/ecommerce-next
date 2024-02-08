import React from "react";
import { List, Star, Heart, Store, HelpCircle, QrCode } from "lucide-react";
import { FaRegAngry } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GiTargetDummy } from "react-icons/gi";

type MenuItem = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    icon: <GiTargetDummy />,
    text: "All Dummy",
    href: "",
  },
  {
    icon: <List />,
    text: "Transaction List",
    href: "",
  },
  {
    icon: <Star />,
    text: "Reviews",
    href: "",
  },
  {
    icon: <Heart />,
    text: "Wishlist",
    href: "",
  },
  {
    icon: <Store />,
    text: "Followed Stores",
    href: "",
  },
];

const additionalItems: MenuItem[] = [
  {
    icon: <FaRegAngry size={24} />,
    text: "Complained Orders",
    href: "",
  },
  {
    icon: <HelpCircle />,
    text: "Help",
    href: "",
  },
  {
    icon: <QrCode />,
    text: "Scan QR Code",
    href: "",
  },
];

const LinksMobile = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <div key={index} className="fl-center gap-2">
            <Link
              href={item.href}
              className="fl-center gap-2 hover:bg-accent hover:text-accent-foreground w-full p-2 text-lg rounded-sm"
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {additionalItems.map((item, index) => (
          <div key={index} className="fl-center gap-2">
            <Link
              href={item.href}
              className="fl-center gap-2 hover:bg-accent hover:text-accent-foreground w-full p-2 text-lg rounded-sm"
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default LinksMobile;
