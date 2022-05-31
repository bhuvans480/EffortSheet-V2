using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EffortSheet.Models
{
    [Table("ActivityList")]
    public class ActivityModel
    {
        [Key]
        public int ActivityId { get; set; }

        public string Activity { get; set; }
    }

}

