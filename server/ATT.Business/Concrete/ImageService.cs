using ATT.Business.Abstract;
using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Concrete
{
    public class ImageService : IImageService
    {
        public async Task<string> ScaleAndUploadImageAsync(Stream fileStream, string fileName, string folderName, int targetHeight)
        {
            if (fileStream == null || fileStream.Length == 0)
                throw new ArgumentException("Gelen dosya akışı boş.");

            var fileExtension = Path.GetExtension(fileName).ToLower();
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            var relativePath = Path.Combine("uploads", folderName, uniqueFileName);
            var physicalPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", relativePath);

            var directoryPath = Path.GetDirectoryName(physicalPath);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            using (var originalBitmap = SKBitmap.Decode(fileStream))
            {
                if (originalBitmap == null)
                    throw new Exception("Resim formatı çözülemedi.");

                float ratio = (float)originalBitmap.Height / targetHeight;
                int newWidth = (int)(originalBitmap.Width / ratio);

                var imageInfo = new SKImageInfo(newWidth, targetHeight);
                using (var resizedBitmap = originalBitmap.Resize(imageInfo, SKSamplingOptions.Default))
                {
                    if (resizedBitmap == null)
                        throw new Exception("Resim boyutlandırılırken bir sorun çıktı.");

                    var format = fileExtension == ".png" ? SKEncodedImageFormat.Png : SKEncodedImageFormat.Jpeg;

                    using (var image = SKImage.FromBitmap(resizedBitmap))
                    using (var data = image.Encode(format, 85))
                    using (var outputStream = new FileStream(physicalPath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true))
                    {
                        using (var dataStream = data.AsStream())
                        {
                            await dataStream.CopyToAsync(outputStream);
                        }
                    }
                }
            }

            return $"/{relativePath.Replace("\\", "/")}";
        }
    }
}
