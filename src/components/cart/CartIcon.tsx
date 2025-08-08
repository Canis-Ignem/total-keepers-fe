"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [isClient, setIsClient] = useState(false);
  const itemCount = useSelector((state: RootState) => {
    if (!isClient) return 0; // Return 0 during SSR
    const items = state.cart?.items ?? [];
    return Array.isArray(items)
      ? items.reduce((sum, item) => sum + item.quantity, 0)
      : 0;
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="/checkout" className="relative flex items-center ml-4" aria-label="Go to checkout">
      <Image
        src="/cart.svg"
        alt="Cart"
        width={32}
        height={32}
        className="object-contain"
      />
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
        {itemCount}
      </span>
    </Link>
  );
}
