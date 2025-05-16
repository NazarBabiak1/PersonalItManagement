using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PersonalItManagement.Data.Models;
using PersonalItManagement.Models;

namespace PersonalITManagement.Data.Context
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        // Конструктор із параметрами для передачі конфігурації
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Відображення таблиць
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Work> Works { get; set; }
        public DbSet<KanbanBoard> KanbanBoards { get; set; }
        public DbSet<OrderComment> OrderComments { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<ProfitDistribution> ProfitDistributions { get; set; }

        // Налаштування моделі
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Employee
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
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

            modelBuilder.Entity<Order>()
                .HasOne(o => o.KanbanBoard)
                .WithMany(b => b.Orders)
                .HasForeignKey(o => o.BoardId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderComment>()
                .HasOne(oc => oc.Order)
                .WithMany(o => o.OrderComments)  
                .HasForeignKey(oc => oc.OrderId);

            modelBuilder.Entity<Material>()
                .Property(m => m.Price)
                .HasPrecision(18, 2);  // Точність 18, масштаб 2

            modelBuilder.Entity<ProfitDistribution>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Work>()
                .Property(w => w.Cost)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Equipment>()
                .Property(e => e.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.Discount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.PaidAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<IdentityRole>().HasData(
               new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
               new IdentityRole { Id = "2", Name = "Manager", NormalizedName = "MANAGER" },
               new IdentityRole { Id = "3", Name = "Mounter", NormalizedName = "MOUNTER" }
           );
        }
    }
}
