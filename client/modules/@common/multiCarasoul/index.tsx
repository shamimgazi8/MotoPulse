import { useState } from 'react';

const MultiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      src: 'https://b2cfurniture.com.au/pub/media/catalog/product/cache/3fb871f48f7af5e44260f2d9fd3932a9/p/a/paris-5pce-hardwood-home-starter-package-rustic-walnut-grey-fabric_1__1.jpg',
      detail: 'Detail for Item 1',
    },
    {
      src: 'https://d2kz53n3bzvihv.cloudfront.net/resized/790_395_0_255_255_255/media/gbu0/categoryxxl/image/DesktopHeader-P393_LLA005_LLA008_LLA010_A.jpg.jpeg',
      detail: 'Detail for Item 2',
    },
    {
      src: 'https://hemmingandwills.co.uk/cdn/shop/articles/featured_image_-_living_room_furniture_layout_1600x@2x.jpg?v=1692692232',
      detail: 'Detail for Item 3',
    },
    {
      src: 'https://www.alankaram.in/wp-content/uploads/2022/12/A7402720-2048x1365-1.jpg',
      detail: 'Detail for Item 4',
    },
    { src: 'https://via.placeholder.com/300', detail: 'Detail for Item 5' },
    { src: 'https://via.placeholder.com/300', detail: 'Detail for Item 6' },
    { src: 'https://via.placeholder.com/300', detail: 'Detail for Item 7' },
    { src: 'https://via.placeholder.com/300', detail: 'Detail for Item 8' },
  ];

  const itemsPerView = 4;

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? Math.max(0, items.length - itemsPerView) : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex + itemsPerView >= items.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-1/4 flex-none p-2">
            <div className="group relative">
              <img
                src={item.src}
                alt={`Item ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center text-white p-4">
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white hover:bg-gray-600 transition-all"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white hover:bg-gray-600 transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default MultiCarousel;
