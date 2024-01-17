import React from "react";
import { List, Star, Heart, Store, HelpCircle, QrCode } from "lucide-react";
import { FaRegAngry } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type MenuItem = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    icon: <List />,
    text: "Daftar Transaksi",
    href: "/transactions",
  },
  {
    icon: <Star />,
    text: "Ulasan",
    href: "/reviews",
  },
  {
    icon: <Heart />,
    text: "Wishlist",
    href: "/wishlist",
  },
  {
    icon: <Store />,
    text: "Toko yang di-follow",
    href: "/followed-stores",
  },
];

const additionalItems: MenuItem[] = [
  {
    icon: <FaRegAngry size={24} />,
    text: "Pesanan Dikomplain",
    href: "", // Tautan kosong
  },
  {
    icon: <HelpCircle />,
    text: "Bantuan",
    href: "",
  },
  {
    icon: <QrCode />,
    text: "Scan Kode QR",
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
