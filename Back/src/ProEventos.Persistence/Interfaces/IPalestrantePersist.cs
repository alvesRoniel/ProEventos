using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface IPalestrantePersist
    {
         Task<Palestrante[]>GetAllPalestrantesByNomeAsync(string nome, bool includeEvento);
         Task<Palestrante[]>GetAllPalestrantesAsync(bool includeEvento);
         Task<Palestrante>GetPalestrantesByIdAsync(int palestranteId, bool includeEvento);
    }
}