interface RegistrationSectionProps {
  limitedOffer: string;
  title: string;
  subtitle: string;
  whatsIncluded: string;
  includedItems: string[];
  originalPrice: string;
  earlyBirdPrice: string;
  earlyBirdLabel: string;
  saveAmount: string;
  paymentPlans: string;
  guarantee: string;
  ctaButton: string;
  contactInfo: string;
  ctaHref?: string;
  bgColor?: string;
  id?: string;
}

export default function RegistrationSection({
  limitedOffer,
  title,
  subtitle,
  whatsIncluded,
  includedItems,
  originalPrice,
  earlyBirdPrice,
  earlyBirdLabel,
  saveAmount,
  paymentPlans,
  guarantee,
  ctaButton,
  contactInfo,
  ctaHref = "mailto:info@totalkeepers.com?subject=Campus Registration",
  bgColor = "bg-gradient-to-r from-blue-600 to-blue-800",
  id = "registration"
}: RegistrationSectionProps) {
  return (
    <section id={id} className={`py-24 ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-semibold mb-6">
            ⚠️ {limitedOffer}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="text-left">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">{whatsIncluded}</h3>
              <ul className="space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-left">
              <div className="bg-yellow-50 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="text-gray-500 line-through text-lg">{originalPrice}</div>
                  <div className="text-4xl font-black text-blue-900">{earlyBirdPrice}</div>
                  <div className="text-sm text-gray-600">{earlyBirdLabel}</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  💰 {saveAmount}<br/>
                  💳 {paymentPlans}<br/>
                  🔒 {guarantee}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href={ctaHref}
              className="inline-flex items-center px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xl rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              🎯 {ctaButton}
            </a>
            <p className="text-sm text-gray-500">
              {contactInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
