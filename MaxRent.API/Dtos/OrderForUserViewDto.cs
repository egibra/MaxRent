using System;
using System.Collections.Generic;
using MaxRent.API.Models;

namespace MaxRent.API.Dtos
{
    public class OrderForUserViewDto
    {
        public string CustomerName { get; set; }
        public string CustomerNumber { get; set; }
        public string CustomerAddress { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public OrderStateEnum OrderState { get; set; }
        public string OrderCode { get; set; }
        public ICollection<OrderItemForUserViewDto> OrderItems { get; set; }           
    }
}