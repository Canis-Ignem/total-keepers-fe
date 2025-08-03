import Header from "./Header";
import CartIcon from "./CartIcon";

export default function HeaderWithCart({ locale }: { locale: string }) {
  return (
    <div className="flex flex-row items-center py-4 border-b border-gray-200 w-full max-w-7xl mx-auto px-4">
      <Header locale={locale} />
      <div className="ml-4">
        <CartIcon />
      </div>
    </div>
  );
}
