namespace MaxRent.API.Models
{
    public enum OrderStateEnum : int
    {
        Received = 1, 
        Accepted = 2,
        Completed = 3,
        Rejected = 0
    }
}