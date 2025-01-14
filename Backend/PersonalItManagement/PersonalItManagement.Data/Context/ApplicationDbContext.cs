using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data.Models;
using PersonalItManagement.Models;

namespace PersonalITManagement.Data.Context
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        // Конструктор із параметрами для передачі конфігурації
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Відображення таблиць
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Work> Works { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<ProfitDistribution> ProfitDistributions { get; set; }

        // Налаштування моделі
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Employee
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.AppUser)
                .WithMany()
                .HasForeignKey(e => e.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Status)
                .WithMany()
                .HasForeignKey(o => o.OrderStatusId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Employees)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Equipments)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Materials)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Works)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            // ProfitDistribution
            modelBuilder.Entity<ProfitDistribution>()
                .HasOne(p => p.Order)
                .WithMany()
                .HasForeignKey(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
