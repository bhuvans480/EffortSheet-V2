using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EffortSheet.Models
{
    [Table("NameList")]
    public class NameModel
    {
        [Key]
        public int NameId { get; set; }

        public string Name { get; set; }

        public string NetworkID { get; set; }
    }
}