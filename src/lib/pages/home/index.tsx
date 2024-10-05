import CallToAction from '@/lib/components/cta';
import FeaturesSection from '@/lib/components/features';
import HeroSection from '@/lib/components/hero';
import HowItWorks from '@/lib/components/how';

const Home = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
    </div>
  );
};

export default Home;
