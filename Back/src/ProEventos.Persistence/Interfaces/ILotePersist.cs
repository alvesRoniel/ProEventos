using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface ILotePersist
    {
        /// <summary>
        /// Retorna um lote pelo id do evento e pele id do lote
        /// </summary>
        /// <param name="eventoId">Id do Evento</param>
        /// <param name="loteId">Id do Lote</param>
        /// <returns>Apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId);

        /// <summary>
        /// Retorna os lotes pelos ids dos Eventos
        /// </summary>
        /// <param name="eventoId">Id do evento </param>
        /// <returns>Lista de Lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
    }
}