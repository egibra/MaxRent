using System;
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
            switch (order.OrderState)
            {
                case(OrderStateEnum.Accepted):
                     orderForUser.OrderState = "Patvirtinta.";
                break;
                case(OrderStateEnum.Completed): 
                     orderForUser.OrderState = "Pabaigta.";
                break;
                case(OrderStateEnum.Received): 
                     orderForUser.OrderState = "Priimta.";
                break;
                case(OrderStateEnum.Rejected): 
                     orderForUser.OrderState = "Atmesta.";
                break;
            }
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
                orderForUser.TotalOrderSum += orderItemForUserView.TotalPrice;
            }
            return orderForUser;
        }
        public static AssetForAdminListViewDto GetAssetForAdminListViewDtoFromAsset(Asset asset)
        {
            AssetForAdminListViewDto dto = new AssetForAdminListViewDto();
            dto.AssetId= asset.Id;
            dto.AssetCode = asset.AssetCode;
            dto.ProductName = asset.AssignedProduct?.Name;
            dto.PhotoUrl = asset.AssignedProduct.Photos[0]?.Url;

            return dto;
        }

        internal static OrderForAssetDetailDto getAssetOrderFromOrderItem(OrderItem orderItem)
        {
            var order = new OrderForAssetDetailDto();
            order.DateFrom = orderItem.DateFrom;
            order.DateTo = orderItem.DateTo;
            order.OrderCode = orderItem.Order.OrderCode;
            switch (orderItem.Order.OrderState)
            {
                case(OrderStateEnum.Accepted):
                     order.OrderState = "Patvirtinta.";
                break;
                case(OrderStateEnum.Completed): 
                     order.OrderState = "Pabaigta.";
                break;
                case(OrderStateEnum.Received): 
                     order.OrderState = "Priimta.";
                break;
                case(OrderStateEnum.Rejected): 
                     order.OrderState = "Atmesta.";
                break;
            }
            order.TotalSum = orderItem.TotalPrice / orderItem.OrderItemAssets.Count;
            order.UserName = orderItem.Order.Customer.Username;
            
            return order;
        }
    }
}