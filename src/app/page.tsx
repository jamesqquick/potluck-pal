import Hero from '@/components/Hero';
import GetStarted from '@/components/GetStarted';
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="py-40">
        <GetStarted />
      </div>
    </main>
  );
}
