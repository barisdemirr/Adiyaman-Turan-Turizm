import React from 'react';
import Image from 'next/image';

const AdditionalImagerySection = ({ photos }) => {
  // const images = [
  //   {
  //     alt: "Ancient city of Mardin",
  //     src: "https://img.freepik.com/free-photo/panoramic-shot-beautiful-lake-ponte-de-sor-portugal_181624-11063.jpg?semt=ais_hybrid&w=740&q=80",
  //   },
  //   {
  //     alt: "Karakuş Tumulus",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmo-LbgX-KcYqbfzm8yDxkwfwgKkZMZTv1Q&s",
  //   },
  //   {
  //     alt: "Traditional Breakfast",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq3eh5sfHpL6odWuO93cMk-HuwDTTEmn20E4_KeAFZqE-PSrzVVpC_GTrae3oGvDjoqfhvX_kfjtFRT1-4h2WmyqkaNeaEl7XbIZZDXC8r5BEi6_UWucc69-L4lkSMu1dSb4-98v2f73pCUy9OGl5xmpi1d_JL6UnLI0c3jWGREK6CuOx6Ogk_pNsByrMdeUB5gd-Wcn3L8AjMNmOwftMKWCN6cefNr-NsuAyNZlH03T3yXNs15NHwjhBJqLqji8hEvFB3Cz7-vPmL",
  //   },
  //   {
  //     alt: "Luxury Van",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWwFZxnHnyuPU2nb48czhci5-kmSMCFPQvQ&s",
  //   },
  //   {
  //     alt: "Guide Silhouette",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmqhM4MavG2MBeaNoeiiV74cLHTpF0N2nPD4KDnaY-TqxutXOUmIyZAeElokjSxMAk9amZxE5gkLA5u4UXMmgKpuZal2Pbg_XxylNWx4Sqjc9l6VNxRj3m_iHqZvugrzNsegiNsVdH3kJeiP_fDijI2OMGV0Iy4jQfT7W7EpQMVXdyeu8o2Bj6QoP4YCRahDiTjn_yfnji0X05rkn7-7mDKNL5QPG_bE6mcg_wKaQ9RCg4pTYrqix_iM6U49FFWrSVg6NLpsT2hhKv",
  //   },
  //   {
  //     alt: "Ancient city of Mardin",
  //     src: "https://img.freepik.com/free-photo/panoramic-shot-beautiful-lake-ponte-de-sor-portugal_181624-11063.jpg?semt=ais_hybrid&w=740&q=80",
  //   },
  //   {
  //     alt: "Karakuş Tumulus",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmo-LbgX-KcYqbfzm8yDxkwfwgKkZMZTv1Q&s",
  //   },
  //   {
  //     alt: "Traditional Breakfast",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq3eh5sfHpL6odWuO93cMk-HuwDTTEmn20E4_KeAFZqE-PSrzVVpC_GTrae3oGvDjoqfhvX_kfjtFRT1-4h2WmyqkaNeaEl7XbIZZDXC8r5BEi6_UWucc69-L4lkSMu1dSb4-98v2f73pCUy9OGl5xmpi1d_JL6UnLI0c3jWGREK6CuOx6Ogk_pNsByrMdeUB5gd-Wcn3L8AjMNmOwftMKWCN6cefNr-NsuAyNZlH03T3yXNs15NHwjhBJqLqji8hEvFB3Cz7-vPmL",
  //   },
  //   {
  //     alt: "Luxury Van",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWwFZxnHnyuPU2nb48czhci5-kmSMCFPQvQ&s",
  //   },
  //   {
  //     alt: "Guide Silhouette",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmqhM4MavG2MBeaNoeiiV74cLHTpF0N2nPD4KDnaY-TqxutXOUmIyZAeElokjSxMAk9amZxE5gkLA5u4UXMmgKpuZal2Pbg_XxylNWx4Sqjc9l6VNxRj3m_iHqZvugrzNsegiNsVdH3kJeiP_fDijI2OMGV0Iy4jQfT7W7EpQMVXdyeu8o2Bj6QoP4YCRahDiTjn_yfnji0X05rkn7-7mDKNL5QPG_bE6mcg_wKaQ9RCg4pTYrqix_iM6U49FFWrSVg6NLpsT2hhKv",
  //   },{
  //     alt: "Ancient city of Mardin",
  //     src: "https://img.freepik.com/free-photo/panoramic-shot-beautiful-lake-ponte-de-sor-portugal_181624-11063.jpg?semt=ais_hybrid&w=740&q=80",
  //   },
  //   {
  //     alt: "Karakuş Tumulus",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmo-LbgX-KcYqbfzm8yDxkwfwgKkZMZTv1Q&s",
  //   },
  //   {
  //     alt: "Traditional Breakfast",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq3eh5sfHpL6odWuO93cMk-HuwDTTEmn20E4_KeAFZqE-PSrzVVpC_GTrae3oGvDjoqfhvX_kfjtFRT1-4h2WmyqkaNeaEl7XbIZZDXC8r5BEi6_UWucc69-L4lkSMu1dSb4-98v2f73pCUy9OGl5xmpi1d_JL6UnLI0c3jWGREK6CuOx6Ogk_pNsByrMdeUB5gd-Wcn3L8AjMNmOwftMKWCN6cefNr-NsuAyNZlH03T3yXNs15NHwjhBJqLqji8hEvFB3Cz7-vPmL",
  //   },
  //   {
  //     alt: "Luxury Van",
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWwFZxnHnyuPU2nb48czhci5-kmSMCFPQvQ&s",
  //   },
  //   {
  //     alt: "Guide Silhouette",
  //     src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmqhM4MavG2MBeaNoeiiV74cLHTpF0N2nPD4KDnaY-TqxutXOUmIyZAeElokjSxMAk9amZxE5gkLA5u4UXMmgKpuZal2Pbg_XxylNWx4Sqjc9l6VNxRj3m_iHqZvugrzNsegiNsVdH3kJeiP_fDijI2OMGV0Iy4jQfT7W7EpQMVXdyeu8o2Bj6QoP4YCRahDiTjn_yfnji0X05rkn7-7mDKNL5QPG_bE6mcg_wKaQ9RCg4pTYrqix_iM6U49FFWrSVg6NLpsT2hhKv",
  //   },
  // ];

  return (
    <section className="max-w-container-max mx-auto px-4 md:px-6 mt-12 md:mt-24">
      <h2 className="font-h3 text-xl md:text-h3 mb-6 md:mb-8">Tour Gallery</h2>

      {/* Puzzle/Masonry Container */}
      <div className="columns-2  md:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {photos.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <Image
              className="w-full h-auto rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-zoom-in"
              alt={`Tour Image ${image.id + 1}`}
              src={image.imageUrl}
              width={0}
              height={0}
              sizes='(max-width: 768px) 100vw, 800px'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdditionalImagerySection;