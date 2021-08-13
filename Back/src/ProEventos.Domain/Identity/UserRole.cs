using Microsoft.AspNetCore.Identity;

namespace ProEventos.Domain.Identity
{
    public class UserRole : IdentityUserRole
    {
        public User User { get; set; }
        public Role Roles { get; set; }
    }
}
