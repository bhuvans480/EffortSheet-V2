using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EffortSheet.Models
{
    [Table("FilterData")]
    public class FilterModel
    {
        [Key]
        public int Id { get; set; }

        public string startDate { get; set; }

        public string endDate { get; set; }

        public string Name { get; set; }
    }
}