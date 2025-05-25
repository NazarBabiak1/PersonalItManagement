import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentService} from '../../../services/equipment.service';
import {Equipment} from '../../../Models/Equipment';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  providers: [EquipmentService], // Додаємо сервіс як провайдер
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit {
  data: Equipment[] = []; // Ініціалізуємо порожнім масивом
  isLoading: boolean = true; // Індикатор завантаження
  error: string | null = null; // Для обробки помилок

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.loadEquipmensts();
  }

  loadEquipmensts(): void {
    this.equipmentService.getEquipments().subscribe({
      next: (equipments) => {
        // Мапимо дані, додаючи поле expanded
        this.data = equipments.map(equipment => ({
          ...equipment,
          expanded: false
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Не вдалося завантажити дані. Спробуйте пізніше.';
        this.isLoading = false;
        console.error('Помилка завантаження:', err);
      }
    });
  }

  toggleDetails(item: Equipment) {
    item.expanded = !item.expanded;
  }
}



