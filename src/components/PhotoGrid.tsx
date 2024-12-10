import { Image } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Cairo Business District",
    category: "Professional",
    imageUrl: "https://source.unsplash.com/random/800x600/?cairo,business",
  },
  {
    id: 2,
    title: "Alexandria Port",
    category: "Industrial",
    imageUrl: "https://source.unsplash.com/random/800x600/?alexandria,port",
  },
  {
    id: 3,
    title: "Tech Hub",
    category: "Technology",
    imageUrl: "https://source.unsplash.com/random/800x600/?office,tech",
  },
  {
    id: 4,
    title: "Creative Space",
    category: "Design",
    imageUrl: "https://source.unsplash.com/random/800x600/?creative,office",
  },
];

const PhotoGrid = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-qudpro-primary mb-8">Featured Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-qudpro-primary">{photo.title}</h3>
                <p className="text-sm text-gray-600">{photo.category}</p>
              </div>
              <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full">
                <Image className="w-4 h-4 text-qudpro-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;