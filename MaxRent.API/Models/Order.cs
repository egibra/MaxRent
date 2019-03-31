using System.Collections.Generic;

namespace MaxRent.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderCode { get; set; }
        public OrderStateEnum OrderState { get; set; }
        public string CustomerName { get; set; }
        public string CustomerNumber { get; set; }
        public string CustomerAddress { get; set; }
        public int UserId { get; set; }
        public User Customer { get; set; }
        public List<OrderItem> OrderItems { get; set; }

    }
}