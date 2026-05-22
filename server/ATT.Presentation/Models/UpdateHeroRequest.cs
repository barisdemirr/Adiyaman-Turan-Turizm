namespace ATT.Presentation.Models
{
    public class UpdateHeroRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Tag { get; set; }
        public IFormFile? ImageFile { get; set; } 
    }
}
