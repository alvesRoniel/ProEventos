using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface IEventoPersist
    {
        /// <summary>
        /// Retorna um evento pelo tema informado
        /// </summary>
        /// <param name="tema">Tema</param>
        /// <param name="includePalestrante"></param>
        /// <returns>Uma lista de Eventos</returns>
         Task<Evento[]>GetAllEventosByTemaAsync(string tema, bool includePalestrante = false);

        /// <summary>
        /// Retorna todos os eventos cadastrados
        /// </summary>
        /// <param name="includePalestrante"></param>
        /// <returns>Uma lista de Eventos</returns>
         Task<Evento[]>GetAllEventosAsync(bool includePalestrante = false);

        /// <summary>
        /// Retorno um evento pelo id informado.
        /// </summary>
        /// <param name="eventoId">Id do evento</param>
        /// <param name="includePalestrante"></param>
        /// <returns>1 Evento</returns>
         Task<Evento>GetEventoByIdAsync(int eventoId, bool includePalestrante = false);
    }
}