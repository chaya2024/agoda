namespace Backend.Models
{
    public class OtpCode
    {
        public int Id { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsUsed { get; set; } = false;
    }
}
