namespace ATT.Presentation.Models
{
    public class CreateTourRequest
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Duration { get; set; }
        public string Category { get; set; }
        public IFormFile BannerFile { get; set; }
        public IFormFile MainFile { get; set; }
        public List<TourImageUploadRequest> Images { get; set; } = new();
    }
}
