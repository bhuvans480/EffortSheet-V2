﻿using EffortSheet.Models;
using System.Data.Entity;

namespace EffortSheet.App_Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<EffortModel> EffortTracker { get; set; }
        public DbSet<NameModel> NameList { get; set; }
        public DbSet<ActivityModel> ActivityList { get; set; }
        public DbSet<TeamModel> TeamList { get; set; }
        public DbSet<PriorityModel> PriorityList { get; set; }
        public DbSet<FilterModel> FilterData { get; set; }
    }
}