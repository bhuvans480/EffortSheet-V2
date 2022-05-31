using EffortSheet.App_Data;
using EffortSheet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace EffortSheet.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    IEnumerable<NameModel> names = _db.NameList.ToList();
                    ViewBag.nameList = names;
                    IEnumerable<ActivityModel> activities = _db.ActivityList.ToList();
                    ViewBag.activityList = activities;
                    IEnumerable<TeamModel> teams = _db.TeamList.ToList();
                    ViewBag.teamList = teams;
                    IEnumerable<PriorityModel> priorities = _db.PriorityList.ToList();
                    ViewBag.priorityList = priorities;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return View();
        }

        public JsonResult GetData()
        {
            IEnumerable<EffortModel> lst = null;
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    lst = _db.EffortTracker.ToList().OrderBy(n => n.Name).ThenBy(d => d.DateOfActivity);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult Add(EffortModel obj)
        {
            EffortModel response = null;
            try
            {
                if (ModelState.IsValid)
                {
                    using (ApplicationDbContext _db = new ApplicationDbContext())
                    {
                        response = _db.EffortTracker.Add(obj);
                        _db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult Save(EffortModel obj)
        {
            EffortModel Effort = null;
            try
            {
                if (ModelState.IsValid)
                {
                    using (ApplicationDbContext _db = new ApplicationDbContext())
                    {
                        Effort = _db.EffortTracker.Find(obj.Id);
                        Effort.DateOfActivity = obj.DateOfActivity;
                        Effort.Name = obj.Name;
                        Effort.Activity = obj.Activity;
                        Effort.Description = obj.Description;
                        Effort.Reference = obj.Reference;
                        Effort.Priority = obj.Priority;
                        Effort.Hours = obj.Hours;
                        Effort.ForwardedTeam = obj.ForwardedTeam;

                        _db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return Json(Effort, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult Clone(int Id)
        {
            EffortModel response = null;
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    var oldObject = _db.EffortTracker.Find(Id);
                    EffortModel cloneObject = new EffortModel();
                    cloneObject.DateOfActivity = oldObject.DateOfActivity;
                    cloneObject.Name = oldObject.Name;
                    cloneObject.Tower = oldObject.Tower;
                    cloneObject.Activity = oldObject.Activity;
                    cloneObject.Description = oldObject.Description;
                    cloneObject.Reference = oldObject.Reference;
                    cloneObject.Priority = oldObject.Priority;
                    cloneObject.Hours = oldObject.Hours;
                    cloneObject.ForwardedTeam = oldObject.ForwardedTeam;

                    response = _db.EffortTracker.Add(cloneObject);
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult Delete(int Id)
        {
            EffortModel response = null;
            try
            {
                int? id = Id;
                if (id == 0 || id == null)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    var removeObject = _db.EffortTracker.Find(Id);

                    response = _db.EffortTracker.Remove(removeObject);
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Download()
        {
            IEnumerable<EffortModel> lst = null;
            var builder = new StringBuilder();
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    lst = _db.EffortTracker.ToList().OrderBy(n => n.Name).ThenBy(d => d.DateOfActivity);
                }

                builder.AppendLine("Year,Month,Date,Name,Tower,Activity,Description,Reference,Priority,Hours Spent,Forwarded Team");
                foreach (var item in lst)
                {
                    builder.AppendLine($"{item.DateOfActivity.Year},{item.DateOfActivity.ToString("MMMM")},{item.DateOfActivity.Day}," +
                                        $"{item.Name},{item.Tower},{item.Activity}," +
                                            $"{item.Description},{item.Reference},{item.Priority},{item.Hours},{item.ForwardedTeam}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv", "EffortTracker_" + DateTime.Now.ToString("MMM") + ".csv");
        }

        [HttpPost]
        public JsonResult PostFilter(FilterModel obj)
        {
            FilterModel Filter = null;
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    Filter = _db.FilterData.Find(obj.Id);

                    Filter.startDate = obj.startDate;
                    Filter.endDate = obj.endDate;
                    Filter.Name = obj.Name;

                    //_db.FilterData.Update(Filter);
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return Json(Filter, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFilteredData()
        {
            IEnumerable<EffortModel> lst = null;
            try
            {
                using (ApplicationDbContext _db = new ApplicationDbContext())
                {
                    var Filter = _db.FilterData.Find(1);

                    DateTime startDate = new DateTime();
                    DateTime endDate = new DateTime();

                    DateTime.TryParse(Filter.startDate, out startDate);
                    DateTime.TryParse(Filter.endDate, out endDate);

                    if (Filter.startDate != null && Filter.endDate != null)
                    {
                        if (Filter.Name == null)
                        {
                            lst = _db.EffortTracker.Where(o => o.DateOfActivity >= startDate && o.DateOfActivity <= endDate).ToList();
                        }
                        else
                        {
                            lst = _db.EffortTracker.Where(o => o.DateOfActivity >= startDate && o.DateOfActivity <= endDate && o.Name == Filter.Name).ToList();
                        }
                    }
                    else
                    {
                        if (Filter.Name == null)
                        {
                            return Json(lst, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            lst = _db.EffortTracker.Where(o => o.Name == Filter.Name).ToList();
                        }
                    }
                }
                lst = lst.OrderBy(x => x.Name).ThenBy(d => d.DateOfActivity);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult FilterDownload()
        {
            IEnumerable<EffortModel> lst = null;
            StringBuilder builder = new StringBuilder();

            try
            {
                using(ApplicationDbContext _db = new ApplicationDbContext())
                {
                    var Filter = _db.FilterData.Find(1);

                    DateTime startDate = new DateTime();
                    DateTime endDate = new DateTime();

                    DateTime.TryParse(Filter.startDate, out startDate);
                    DateTime.TryParse(Filter.endDate, out endDate);

                    if (Filter.startDate != null && Filter.endDate != null)
                    {
                        if (Filter.Name == null)
                        {
                            lst = _db.EffortTracker.Where(o => o.DateOfActivity >= startDate && o.DateOfActivity <= endDate).ToList();
                        }
                        else
                        {
                            lst = _db.EffortTracker.Where(o => o.DateOfActivity >= startDate && o.DateOfActivity <= endDate && o.Name == Filter.Name).ToList();
                        }
                    }
                    else
                    {
                        if (Filter.Name != null)
                        {
                            lst = _db.EffortTracker.Where(o => o.Name == Filter.Name).ToList();
                        }
                    }
                }
                lst = lst.OrderBy(x => x.Name).ThenBy(d => d.DateOfActivity);
                builder.AppendLine("Year,Month,Date,Name,Tower,Activity,Description,Reference,Priority,Hours Spent,Forwarded Team");
                foreach (var item in lst)
                {
                    builder.AppendLine($"{item.DateOfActivity.Year},{item.DateOfActivity.ToString("MMMM")},{item.DateOfActivity.Day}," +
                                        $"{item.Name},{item.Tower},{item.Activity}," +
                                            $"{item.Description},{item.Reference},{item.Priority},{item.Hours},{item.ForwardedTeam}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }

            return File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv", "EffortTracker_Filtered_" + DateTime.Now.ToString("MMM") + ".csv");
        }

    }
}