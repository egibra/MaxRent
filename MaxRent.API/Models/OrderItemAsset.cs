namespace MaxRent.API.Models
{
    public class OrderItemAsset
    {
        public int OrderItemId { get; set; }
        public OrderItem OrderItem { get; set; }
        public int AssetId { get; set; }
        public Asset Asset { get; set; }
    }
}