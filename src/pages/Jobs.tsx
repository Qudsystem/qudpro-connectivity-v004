import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock } from "lucide-react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Photographer",
      company: "Cairo Creative Studio",
      location: "Cairo, Egypt",
      type: "Full-time",
      posted: "2 days ago",
      logo: "https://source.unsplash.com/random/40x40/?logo"
    },
    {
      id: 2,
      title: "Commercial Photographer",
      company: "Alexandria Media",
      location: "Alexandria, Egypt",
      type: "Contract",
      posted: "1 day ago",
      logo: "https://source.unsplash.com/random/40x40/?company"
    },
    {
      id: 3,
      title: "Photography Director",
      company: "Egyptian Arts",
      location: "Giza, Egypt",
      type: "Full-time",
      posted: "3 days ago",
      logo: "https://source.unsplash.com/random/40x40/?brand"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Search Filters */}
          <Card className="p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Search Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <select className="w-full border-gray-300 rounded-md shadow-sm">
                  <option>All Egypt</option>
                  <option>Cairo</option>
                  <option>Alexandria</option>
                  <option>Giza</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Type
                </label>
                <select className="w-full border-gray-300 rounded-md shadow-sm">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </div>
          </Card>

          {/* Job Listings */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Recent Job Postings</h2>
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">{job.title}</h4>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          Posted {job.posted}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <Button>Apply Now</Button>
                        <Button variant="outline">Save Job</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;