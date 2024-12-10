import Hero from "@/components/Hero";
import PhotoGrid from "@/components/PhotoGrid";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <ProfileCard />
              <div className="text-xs text-center text-gray-500">
                Powered by QudSystem
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <PhotoGrid />
          </div>
          <div className="lg:col-span-1">
            {/* Right sidebar - can be implemented later */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;