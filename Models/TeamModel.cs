using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EffortSheet.Models
{
    [Table("TeamList")]
    public class TeamModel
    {
        [Key]
        public int TeamId { get; set; }

        public string ForwardedTeam { get; set; }
    }
}