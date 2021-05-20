using System.Threading.Tasks;
using ProEventos.Application.DTOs;

namespace ProEventos.Application.Interfaces
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEventos(int eventoId, EventoDto model);
        Task<bool> DeleteEventos(int eventoId);
        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrante = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrante = false);
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrante = false);
    }
}