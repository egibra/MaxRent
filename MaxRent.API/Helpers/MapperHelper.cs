using System.Collections.Generic;
using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Helpers
{
    public static class MapperHelper
    {
        public static OrderForUserViewDto GetOrderForUserViewFromOrder(Order order) 
        {
            OrderForUserViewDto orderForUser = new OrderForUserViewDto();
            orderForUser.CustomerAddress = order.CustomerAddress;
            orderForUser.CustomerName = order.CustomerName;
            orderForUser.CustomerNumber = order.CustomerNumber;
            orderForUser.OrderState = order.OrderState;
            orderForUser.OrderCode = order.OrderCode;
            orderForUser.OrderItems = new List<OrderItemForUserViewDto>();
            orderForUser.DateCreated = order.DateCreated;
            foreach(var orderItem in order.OrderItems)
            {
                var orderItemForUserView = new OrderItemForUserViewDto();
                orderItemForUserView.AssetsCount = orderItem.OrderItemAssets.Count;
                orderItemForUserView.DateFrom = orderItem.DateFrom;
                orderItemForUserView.DateTo = orderItem.DateTo;
                orderItemForUserView.ProductName = orderItem.OrderItemAssets[0].Asset.AssignedProduct.Name;
                orderItemForUserView.TotalPrice = orderItem.TotalPrice;
                orderForUser.OrderItems.Add(orderItemForUserView);
            }
            return orderForUser;
        }
    }
}