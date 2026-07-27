import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ images, title, subtitle }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Gallery Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Caption */}
                <div className="p-4 bg-white">
                  <p className="text-gray-800 font-medium text-center">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-6xl max-h-screen w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex].src}
              alt={images[selectedImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium bg-black bg-opacity-50 inline-block px-6 py-2 rounded-lg">
                {images[selectedImageIndex].caption}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;