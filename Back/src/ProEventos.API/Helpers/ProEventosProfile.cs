using AutoMapper;
using ProEventos.API.DTOs;
using ProEventos.Domain;

namespace ProEventos.API.Helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile()
        {
            CreateMap<Evento, EventoDto>();
        }
    }
}