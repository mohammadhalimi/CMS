import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Statistics from '@/components/Statistics';
import CTA from '@/components/CTA';
import MainCard from '@/components/MainCard';
import Navigation from '@/components/navigation';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <MainCard>
      <Navigation />
      <Hero />
      <Features />
      <Statistics />
      <CTA />
      <Footer />
    </MainCard>
  );
}