using System.Threading.Tasks;
using ProEventos.Application.DTOs;

namespace ProEventos.Application.Interfaces
{
    public interface ILoteService
    {
        /// <summary>
        /// Método que irá salvar os lotes
        /// </summary>
        /// <param name="eventoId">Id do Evento</param>
        /// <param name="models">Os lotes que irão ser salvos</param>
        /// <returns>Os Lotes salvos</returns>
        Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models);

        /// <summary>
        /// Realiza a exlusão de um ou mais lotes por id do evento
        /// </summary>
        /// <param name="eventoId"></param>
        /// <param name="loteId"></param>
        /// <returns>Retorna true ou false para a deleção do lote.</returns>
        Task<bool> DeleteLote(int eventoId, int loteId);

        /// <summary>
        /// Retorna uma lista de Lotes por id do Evento
        /// </summary>
        /// <param name="eventoId"></param>
        /// <returns>Retorna uma lista de Lotes por id do Evento</returns>
        Task<LoteDto[]> GetLotesByEventoIdsAsync(int eventoId);

        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}