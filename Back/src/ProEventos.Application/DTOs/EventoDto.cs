using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.DTOs
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        StringLength(250, MinimumLength = 3, ErrorMessage = "O campo {0} deve ter entre 3 e 250 caracteres.")]
        public string Local { get; set; }


        [Display(Name = "Data do Evento"),
        Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
            StringLength(250, MinimumLength = 3, ErrorMessage = "O campo {0} deve ter entre 3 e 250 caracteres.")
        ]
        public string Tema { get; set; }

        [Display(Name = "Qtd de Pessoas"),
        Range(1, 120000, ErrorMessage = "A {0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }


        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
        ErrorMessage = "Não é uma imagem válida. São permitidas apenas gif, jpg, jpeg, bmp ou png")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O {0} é obrigatório"),
        Phone(ErrorMessage = "O {0} informado é inválido")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Display(Name = "e-mail"),
        EmailAddress(ErrorMessage = "O {0} deve ser um e-mail válido")]
        public string Email { get; set; }

        //Chave estrangeira
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}