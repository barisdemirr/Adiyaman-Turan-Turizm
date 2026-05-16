using ATT.Core.Entities;
using ATT.Core.Entities.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;

namespace ATT.Presentation
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(ATTDbContext context)
        {
            if (context.Tours.Any()) return;

            // 1. Hero Section
            context.HeroSections.Add(new HeroSection
            {
                Title = "Tarihin Başladığı Toprakları Keşfedin",
                Description = "Adıyaman ve ötesinde unutulmaz yolculuklara çıkın. Miras, misafirperverlik ve uzman rehberler sizi bekliyor.",
                Tag = "2026 Sezonu Açıldı",
                BackgroundImageUrl = "https://images.unsplash.com/photo-nemrut-example.jpg"
            });

            // 2. Birkaç Tur
        //    var tours = new List<Tour>
        //{
        //    new Tour
        //    {
        //        Title = "Nemrut Gün Doğumu Turu",
        //        Slug = "nemrut-gun-dogumu-turu",
        //        Description = "Gece yolculuğu ile dev heykellerin arasında unutulmaz bir deneyim.",
        //        Price = 1500,
        //        Duration = "12 Saat",
        //        Type = "Kültür Turu",
        //        ImageUrl = "/images/nemrut.jpg",
        //        BannerImgUrl = "/images/nemrut-banner.jpg"
        //    },
        //    new Tour
        //    {
        //        Title = "Cendere Köprüsü & Arsemia Gezisi",
        //        Slug = "cendere-kprüsü-arsemia",
        //        Description = "Roma tarihini Adıyaman'ın kalbinde hissedin.",
        //        Price = 850,
        //        Duration = "6 Saat",
        //        Type = "Günübirlik",
        //        ImageUrl = "/images/cendere.jpg",
        //        BannerImgUrl = "/images/cendere-banner.jpg"
        //    }
        //};

            //context.Tours.AddRange(tours);

            // 3. İletişim Bilgisi
            context.ContactInfos.Add(new ContactInfo
            {
                Email = "info@adiyamanturan.com",
                Phone = "04163161122",
                WhatsappPhone = "05451231124",
                InstagramUsername = "adiyamanturanturizm"
            });

            context.AboutSections.Add(new AboutSection
            {
                Title = "Neden Bizi Tercih Etmelisiniz?",
                Description = "1988'den beri misafirlerimize en kaliteli ve güvenilir seyahat deneyimini sunmak için çalışıyoruz.",
            });

            context.ContactSections.Add(new ContactSection
            {
                Title = "Bizimle İletişime Geçin",
                Description = "Sorularınız ve rezervasyon talepleriniz için bize her zaman ulaşabilirsiniz. Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.",
            });

            context.FavoritesSections.Add(new FavoritesSection
            {
                Title = "Favori Turlarınız",
                Description = "Hızlı erişim için beğendiğiniz turları buraya ekleyebilirsiniz.",
            });

            context.GallerySections.Add(new GallerySection
            {
                Title = "Turlarımızdan Kareler",
                Description = "Misafirlerimizin objektifinden unutulmaz anlar ve Anadolu'nun eşsiz güzellikleri.",
            });

            context.ServicesSections.Add(new ServicesSection
            {
                Title = "Uzman Rehberler Eşliğinde Unutulmaz Yolculuklar",
                Description = "Nemrut Dağı'nın zirvelerinden antik kentlerin tarihi sokaklarına kadar, konforunuz için özel olarak tasarlanmış kapsamlı seyahat hizmetleri sunuyoruz.",
            });

            context.ToursSections.Add(new ToursSection
            {
                Title = "Turlarımızı Keşfedin",
                Description = "Bölgenin en iyi yönlerini sergilemek için hazırlanmış özel programlar.",
            });



        //    var aboutitems = new List<AboutItem>
        //{
        //    new AboutItem
        //    {
        //        Icon = "fa-solid fa-archway",
        //        Title = "35 Yıllık Deneyim",
        //        Description = "Roma tarihini Adıyaman'ın kalbinde hissedin."
        //    },
        //    new AboutItem
        //    {
        //        Icon = "fa-solid fa-archway",
        //        Title = "Cendere Köprüsü & Arsemia Gezisi",
        //        Description = "Roma tarihini Adıyaman'ın kalbinde hissedin."
        //    },
        //    new AboutItem
        //    {
        //        Icon = "fa-solid fa-archway",
        //        Title = "Cendere Köprüsü & Arsemia Gezisi",
        //        Description = "Roma tarihini Adıyaman'ın kalbinde hissedin."
        //    },
        //    new AboutItem
        //    {
        //        Icon = "fa-solid fa-archway",
        //        Title = "Cendere Köprüsü & Arsemia Gezisi",
        //        Description = "Roma tarihini Adıyaman'ın kalbinde hissedin."
        //    },
        //};

            //context.AboutItems.AddRange(aboutitems);

            await context.SaveChangesAsync(); 
        }
    }
}
