import Hero from "@/components/Hero";
import PhotoGrid from "@/components/PhotoGrid";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>
          <div className="lg:col-span-3">
            <PhotoGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;