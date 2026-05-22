namespace ATT.Presentation.Models
{
    public class ExistingImageUpdateRequest
    {
        public int Id { get; set; }
        public bool IsInGallery { get; set; }
        public bool IsDeleted { get; set; } 
    }
}
