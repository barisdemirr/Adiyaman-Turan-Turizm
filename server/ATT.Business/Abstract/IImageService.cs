using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IImageService
    {
        Task<string> ScaleAndUploadImageAsync(Stream fileStream, string fileName, string folderName, int targetHeight);
    }
}
