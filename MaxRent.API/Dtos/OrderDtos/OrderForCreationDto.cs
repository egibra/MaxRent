using System.Collections.Generic;

namespace MaxRent.API.Dtos
{
    public class OrderForCreationDto
    {
        public string CustomerName { get; set; }
        public string CustomerNumber { get; set; }
        public string CustomerAddress { get; set; }
        public int UserId { get; set; }
        public ICollection<OrderItemForCreationDto> OrderItems { get; set; }   
    }
}