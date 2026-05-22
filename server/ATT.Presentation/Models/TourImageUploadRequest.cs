namespace ATT.Presentation.Models
{
    public class TourImageUploadRequest
    {
        public IFormFile File { get; set; }
        public bool IsInGallery { get; set; }
    }
}
