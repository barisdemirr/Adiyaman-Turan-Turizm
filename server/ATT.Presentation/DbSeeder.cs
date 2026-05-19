using ATT.Core.Entities;
using ATT.Core.Entities.Sections;
using ATT.DataAccess.Concrete.EntityFramework.Context;

namespace ATT.Presentation
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(ATTDbContext context)
        {
            //    if (context.Tours.Any()) return;



            //            var tours = new List<Tour>
            //        {
            //            new Tour
            //            {
            //                Title = "Nemrut Gün Doğumu Turu",
            //                Slug = "nemrut-gun-dogumu-turu",
            //                ShortDescription = "Explore narrow stone streets, ancient monasteries, and Mesopotamian plains.",
            //                Description = "Experience the breathtaking sunrise over Mount Nemrut, a UNESCO World Heritage site, and explore the ancient Commagene Kingdom's rich history and culture. This unforgettable tour includes visits to the colossal stone heads, royal tombs, and stunning landscapes that define this unique destination.",
            //                Price = 1500,
            //                Duration = "12 Saat",
            //                Type = "daily",
            //                ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //                BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //                Images = [
            //                    new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" },
            //                    new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //                ],
            //                Dates = [
            //                    new TourDate { Date = new DateOnly(2026, 06, 15) }, 
            //                    new TourDate { Date = new DateOnly(2026, 07, 10) },
            //                    new TourDate { Date = new DateOnly(2026, 08, 05) }, 
            //                    new TourDate { Date = new DateOnly(2026, 09, 20) }
            //                ],
            //                Extras = [
            //                    new TourExtra
            //                    {
            //                        Title = "Profesyonel Rehberlik Hizmeti",
            //                        Description = "Yolculuk boyunca Nemrut Dağı ve Kommagene Krallığı tarihi hakkında uzman kokartlı rehberimizden detaylı bilgiler."
            //                    },
            //                    new TourExtra
            //                    {
            //                        Title = "Milli Park Giriş Biletleri",
            //                        Description = "Nemrut Dağı Ören Yeri ve Milli Parkı'na giriş için gerekli tüm bilet ve harçlar tur fiyatına dahildir."
            //                    },
            //                    new TourExtra
            //                    {
            //                        Title = "Geleneksel Yöresel Kahvaltı",
            //                        Description = "Zirvede gün doğumunu izledikten sonra, bölgenin en meşhur restoranında tamamen organik ürünlerden oluşan köy kahvaltısı."
            //                    },
            //                    new TourExtra
            //                    {
            //                        Title = "Otel Transferi",
            //                        Description = "Belirli merkezi noktalardan ve otellerden lüks, klimalı araçlarımızla ücretsiz alma ve bırakma hizmeti."
            //                    }
            //                ]
            //            },
            //            new Tour
            //{
            //    Title = "Kapadokya Rüyası ve Balon Turu",
            //    Slug = "kapadokya-ruyasi-ve-balon-turu",
            //    ShortDescription = "Discover fairy chimneys, underground cities, and hot air balloons.",
            //    Description = "Immerse yourself in the magical landscape of Cappadocia. Witness the iconic hot air balloons at sunrise, explore deep underground cities, and stay in authentic cave hotels.",
            //    Price = 7500,
            //    Duration = "3 Gece 4 Gün",
            //    Type = "overnight",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 06, 20) },
            //        new TourDate { Date = new DateOnly(2026, 07, 15) },
            //        new TourDate { Date = new DateOnly(2026, 08, 10) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Mağara Otel Konaklaması", Description = "Kapadokya'nın ikonik taş ve mağara mimarisine sahip lüks otellerinde 3 gece konaklama." },
            //        new TourExtra { Title = "Balon İzleme Safarisi", Description = "Gündoğumunda balonların kalkış anını en iyi açıdan yakalayan 4x4 araçlarla safari turu." },
            //        new TourExtra { Title = "Çömlek Atölyesi Girişi", Description = "Avanos'un asırlık çömlek atölyelerinde usta zanaatkarlardan uygulamalı çömlek yapımı eğitimi." }
            //    ]
            //},
            //new Tour
            //{
            //    Title = "Göbeklitepe ve Şanlıurfa Kültür Turu",
            //    Slug = "gobeklitepe-ve-sanliurfa-kultur-turu",
            //    ShortDescription = "Visit the zero point in history and the vibrant culture of Urfa.",
            //    Description = "Journey back 12,000 years to Göbeklitepe, the world's oldest known temple. Experience Balıklıgöl and savor the legendary local cuisine of Şanlıurfa.",
            //    Price = 1200,
            //    Duration = "10 Saat",
            //    Type = "daily",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 05, 25) },
            //        new TourDate { Date = new DateOnly(2026, 06, 12) },
            //        new TourDate { Date = new DateOnly(2026, 09, 18) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Sıra Gecesi Etkinliği", Description = "Şanlıurfa'nın tarihi konaklarında canlı müzik, halk oyunları ve ikramlar eşliğinde geleneksel sıra gecesi." },
            //        new TourExtra { Title = "Arkeoloji Müzesi Girişi", Description = "Türkiye'nin en büyük müze komplekslerinden biri olan Şanlıurfa Arkeoloji Müzesi'ne giriş bileti." },
            //        new TourExtra { Title = "Harran Konik Evleri Gezisi", Description = "Dünyada sadece birkaç yerde bulunan tarihi Harran Kümbet Evleri'nin içerisine rehberli ziyaret." }
            //    ]
            //},
            //new Tour
            //{
            //    Title = "Mardin Taş Evler ve Mezopotamya Turu",
            //    Slug = "mardin-tas-evler-ve-mezopotamya-turu",
            //    ShortDescription = "Explore narrow stone streets, ancient monasteries, and Mesopotamian plains.",
            //    Description = "Walk through the historic, narrow streets of old Mardin. Admire the unique stone architecture, visit ancient Syriac monasteries, and gaze across the endless Mesopotamian plains.",
            //    Price = 5200,
            //    Duration = "2 Gece 3 Gün",
            //    Type = "overnight",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 06, 05) },
            //        new TourDate { Date = new DateOnly(2026, 10, 02) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Tarihi Konak Konaklaması", Description = "Eski Mardin merkezinde, Mezopotamya ovasına bakan asırlık taş konaklarda konaklama deneyimi." },
            //        new TourExtra { Title = "Deyrulzafaran Manastırı Turu", Description = "Süryani kadim cemaatinin en önemli merkezlerinden biri olan manastıra özel rehberli gezi." },
            //        new TourExtra { Title = "Mardin Telkari Atölyesi", Description = "Geleneksel gümüş işleme sanatı olan telkarinin yapım aşamalarını izleme ve alışveriş indirimi." }
            //    ]
            //},
            //new Tour
            //{
            //    Title = "Karadeniz Yaylaları ve Fırtına Vadisi",
            //    Slug = "karadeniz-yaylalari-ve-firtina-vadisi",
            //    ShortDescription = "Experience lush green valleys, misty highlands, and rich culture.",
            //    Description = "Escape to the breathtaking highlands of the Black Sea region. Explore Ayder and Pokut plateaus, feel the rush of Fırtına River, and taste authentic local dishes.",
            //    Price = 8900,
            //    Duration = "3 Gece 4 Gün",
            //    Type = "overnight",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 07, 01) },
            //        new TourDate { Date = new DateOnly(2026, 07, 22) },
            //        new TourDate { Date = new DateOnly(2026, 08, 15) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Fırtına Deresi Zipline & Rafting", Description = "Fırtına Vadisi üzerinde heyecan dolu zipline aktivitesi ve profesyonel ekip eşliğinde rafting." },
            //        new TourExtra { Title = "Pokut Yaylası Bulut Denizi", Description = "Özel 4x4 transfer araçlarıyla Pokut Yaylası'na çıkış ve gün batımında bulut denizini izleme şansı." },
            //        new TourExtra { Title = "Yöresel Karadeniz Mutfağı", Description = "Muhlama, kara lahana sarması ve taze alabalık gibi lezzetlerin dahil olduğu vadi manzaralı akşam yemekleri." }
            //    ]
            //},
            //new Tour
            //{
            //    Title = "Efes Antik Kenti ve Şirince Turu",
            //    Slug = "efes-antik-kenti-ve-sirince-turu",
            //    ShortDescription = "Walk through ancient history and enjoy a charming historic village.",
            //    Description = "Step into the Roman Empire by exploring the magnificent ruins of Ephesus, including the Celsus Library. Conclude your day in the picturesque historic village of Şirince.",
            //    Price = 1800,
            //    Duration = "8 Saat",
            //    Type = "daily",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 05, 30) },
            //        new TourDate { Date = new DateOnly(2026, 06, 18) },
            //        new TourDate { Date = new DateOnly(2026, 07, 05) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Meryem Ana Evi Ziyareti", Description = "Bülbül Dağı'nda yer alan ve kutsal sayılan Meryem Ana Evi ören yerine giriş ve rehberli anlatım." },
            //        new TourExtra { Title = "Şirince Meyve Şarabı Tadımı", Description = "Eski Rum köyü Şirince'nin meşhur tarihi mahzenlerinde rehber eşliğinde ödüllü meyve şarapları tadımı." },
            //        new TourExtra { Title = "Müze Kart Avantajı", Description = "Efes Antik Kenti girişindeki uzun kuyrukları beklemeden hızlı geçiş sağlayan bilet organizasyonu." }
            //    ]
            //},
            //new Tour
            //{
            //    Title = "Pamukkale Travertenleri ve Hierapolis",
            //    Slug = "pamukkale-travertenleri-ve-hierapolis",
            //    ShortDescription = "See the breathtaking white terraces and ancient thermal springs.",
            //    Description = "Witness the natural wonder of Pamukkale's white calcium terraces. Swim in Cleopatra's ancient thermal pool and explore the vast ruins of Hierapolis.",
            //    Price = 1650,
            //    Duration = "9 Saat",
            //    Type = "daily",
            //    ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
            //    BannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
            //    Images = [
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg" }, 
            //        new Image { ImageUrl = "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png" }
            //    ],
            //    Dates = [
            //        new TourDate { Date = new DateOnly(2026, 06, 01) },
            //        new TourDate { Date = new DateOnly(2026, 07, 11) },
            //        new TourDate { Date = new DateOnly(2026, 08, 25) }
            //    ],
            //    Extras = [
            //        new TourExtra { Title = "Antik Kleopatra Havuzu Girişi", Description = "Tarihi sütunların arasında, şifalı termal sularda yüzme deneyimi sunan antik havuza giriş hakkı." },
            //        new TourExtra { Title = "Hierapolis Tiyatrosu Gezisi", Description = "Akdeniz havzasının en iyi korunmuş Roma dönemi antik tiyatrolarından birine kapsamlı rehberli tur." },
            //        new TourExtra { Title = "Termal Çamur Banyosu", Description = "Bölgedeki özel tesislerde cilde faydalı doğal mineralli termal çamur banyosu seansı." }
            //    ]
            //}
            //        };

            //            context.Tours.AddRange(tours);


            //        if (!context.Services.Any())
            //        {
            //            var services = new List<Service>
            //        {
            //            new Service
            //            {
            //                Icon = "🚌",
            //                Title = "Günübirlik Turlar",
            //                Description = "Şehrin ve çevresinin en önemli tarihi yerlerini keşfedeceğiniz, zamanı kısıtlı olanlar için kısa ve dopdolu geziler."
            //            },
            //            new Service
            //            {
            //                Icon = "🤠",
            //                Title = "Profesyonel Rehberlik",
            //                Description = "Alanında uzman, yerel kültüre ve tarihe hakim lisanslı rehberlerimizle her anı bilgilendirici ve eğlenceli bir seyahat deneyimi."
            //            },
            //            new Service
            //            {
            //                Icon = "🚐",
            //Title = "Konforlu Ulaşım",
            //Description = "Havalimanı transferlerinden şehir içi turlara kadar son model, klimalı ve lüks araçlarımızla güvenli ve konforlu seyahat ayrıcalığı."
            //            },
            //            new Service
            //            {
            //                Icon = "🏛️",
            //Title = "Kültür ve Tarih Gezileri",
            //Description = "Medeniyetlerin izini sürerek kadim şehirlerin saklı kalmış hikayelerini ve ikonik yapılarını derinlemesine keşfetme fırsatı."
            //            },
            //            new Service
            //            {
            //                Icon = "💎",
            //Title = "Kişiye Özel Butik Turlar",
            //Description = "Sadece size ve sevdiklerinize özel; rotasını, duraklarını ve zamanını tamamen sizin belirleyeceğiniz esnek gezi planları."
            //            }
            //         };

            //            context.Services.AddRange(services);
            //        }


            if (!context.AboutItems.Any())
            {
                var aboutitems = new List<AboutItem>
{
    new AboutItem
    {
        Title = "TÜRSAB Onaylı Güven",
        Description = "A Grubu seyahat acentesi belgemizle, tüm turlarımızı yasal mevzuata ve yüksek güvenlik standartlarına tam uygun şekilde düzenliyoruz."
    },
    new AboutItem
    {
        Title = "Bölgesel Uzmanlık",
        Description = "Kadim Mezopotamya topraklarının tarihine, saklı rotalarına ve yerel kültürüne en ince detayına kadar hakimiz."
    },
    new AboutItem
    {
        Title = "7/24 Kesintisiz Destek",
        Description = "Rezervasyon öncesinden tur sonrasına kadar ihtiyacınız olan her an, profesyonel operasyon ekibimizle bir telefon uzağınızdayız."
    },
    new AboutItem
    {
        Title = "Esnek Rezervasyon",
        Description = "Planlarınız değişirse endişe etmeyin; turlarımızda sunduğumuz kolay iptal ve tarih değişikliği imkanlarıyla bütçenizi güvenceye alıyoruz."
    },
    new AboutItem
    {
        Title = "Özgün Lezzet Deneyimleri",
        Description = "Sadece turistik mekanları değil, bölgenin en meşhur ve orijinal yöresel lezzetlerini sunan gerçek lezzet duraklarını keşfediyoruz."
    },
    new AboutItem
    {
        Title = "Şeffaf Fiyat Politikası",
        Description = "Sürpriz ödemelere yer yok! Müze girişleri, rehberlik ve transferler gibi dahil olan tüm hizmetleri tur başında net olarak belirtiyoruz."
    },
    new AboutItem
    {
        Title = "Butik ve Konforlu Gruplar",
        Description = "Kalabalıklar arasında kaybolmamanız için tur kontenjanlarımızı sınırlı tutuyor, lüks araçlarımızla ayrıcalıklı bir seyahat sunuyoruz."
    }
};

                context.AboutItems.AddRange(aboutitems);
            }
            

            await context.SaveChangesAsync(); 
        }
    }
}
