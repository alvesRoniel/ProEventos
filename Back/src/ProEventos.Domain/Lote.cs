using System;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Domain
{
    public class Lote
    {
        [Key]
        public int Id { get; set; }

        [Required,
        MaxLength(250)]
        public string Nome { get; set; }

        [Required]
        public decimal Preco { get; set; }

        [Required]
        public DateTime DataInicio { get; set; }

        [Required]
        public DateTime DataFim { get; set; }

        [Required]
        public int Quantidade { get; set; }

        // Chave estrangeira
        public int EventoId { get; set; }
        public Evento Evento { get; set; }

    }
}