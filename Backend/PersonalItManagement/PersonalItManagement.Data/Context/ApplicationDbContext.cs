using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Models;

namespace PersonalITManagement.Data.Context
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        // Конструктор із параметрами для передачі конфігурації
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Відображення таблиць
        public DbSet<Order> Orders { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }

        // Налаштування моделі
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Налаштування зв'язків і таблиць

            // Зв'язок 1:1 між Employee і User
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.AppUser)
                .WithOne()
                .HasForeignKey<Employee>(e => e.AppUserId);

            // Зв'язок 1:N між Order і Employee
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Employees)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            // Зв'язок 1:N між Order і Equipment
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Equipments)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            // Зв'язок 1:N між Order і OrderStatus
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Status)
                .WithMany()
                .HasForeignKey(o => o.OrderStatusId);
        }
    }
}
