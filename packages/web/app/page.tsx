import CTASection from '@components/CTASection';
import AnalyticsSection from '@components/AnalyticsSection';
import FeaturesSection from '@components/FeaturesSection';
import Footer from '@components/Footer';
import Header from '@components/Header';
import HeroSection from '@components/HeroSection';
import IntegrationsSection from '@components/IntegrationsSection';
import PricingSection from '@components/PricingSection';
import TemplatesSection from '@components/TemplatesSection';
import TestimonialsSection from '@components/TestimonialsSection';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jinoshare-api-59028d83893a.herokuapp.com";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <IntegrationsSection />
        <TemplatesSection />
        <AnalyticsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
