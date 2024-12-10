import { Image, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Cairo Business District",
    category: "Professional",
    imageUrl: "https://source.unsplash.com/random/800x600/?cairo,business",
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "Alexandria Port",
    category: "Industrial",
    imageUrl: "https://source.unsplash.com/random/800x600/?alexandria,port",
    likes: 187,
    comments: 32,
  },
  {
    id: 3,
    title: "Tech Hub",
    category: "Technology",
    imageUrl: "https://source.unsplash.com/random/800x600/?office,tech",
    likes: 342,
    comments: 67,
  },
  {
    id: 4,
    title: "Creative Space",
    category: "Design",
    imageUrl: "https://source.unsplash.com/random/800x600/?creative,office",
    likes: 156,
    comments: 28,
  },
];

const PhotoGrid = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Photos</h2>
        <div className="space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{photo.title}</h3>
                    <p className="text-sm text-gray-500">{photo.category}</p>
                  </div>
                </div>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <div className="mt-4 flex items-center justify-between text-gray-500">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span>{photo.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>{photo.comments}</span>
                    </button>
                  </div>
                  <button className="hover:text-blue-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;