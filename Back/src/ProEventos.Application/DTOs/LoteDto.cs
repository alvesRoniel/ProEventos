using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.DTOs
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório"),
        StringLength(250, MinimumLength = 4, ErrorMessage = "O campo {0} deve ter entre 4 e 250 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório")]
        public decimal Preco { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório")]
        public string DataInicio { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório")]
        public string DataFim { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório")]
        public int Quantidade { get; set; }

        // Chave estrangeira
        public int EventoId { get; set; }
        public EventoDto Evento { get; set; }
    }
}