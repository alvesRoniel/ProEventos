using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProEventos.Domain
{
    [Table("Eventos")]
    public class Evento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Local { get; set; }

        [Required]
        public DateTime? DataEvento { get; set; }
        
        [Required]
        [MaxLength(250)]
        public string Tema { get; set; }

        [Required]
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }

        [Required]
        public string Telefone { get; set; }

        [Required]
        [MaxLength(150)]
        public string Email { get; set; }

        //Chave estrangeira
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}