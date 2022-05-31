using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EffortSheet.Models
{
    [Table("PriorityList")]
    public class PriorityModel
    {
        [Key]
        public int PriorityId { get; set; }

        public string Priority { get; set; }
    }
}