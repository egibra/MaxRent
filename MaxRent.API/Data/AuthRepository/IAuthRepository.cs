using System.Threading.Tasks;
using MaxRent.API.Models;

namespace MaxRent.API.Data.AuthRepository
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login (string username, string password);
         Task<bool> UserExists(string username);
    }    
}