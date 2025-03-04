import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialService} from '../../../services/materials-controller.service';
import {Material} from '../../../Models/Material';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  providers: [MaterialService], // Додаємо сервіс як провайдер
  templateUrl: './materials-table.component.html',
  styleUrls: ['./materials-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit {
  data: Material[] = []; // Ініціалізуємо порожнім масивом
  isLoading: boolean = true; // Індикатор завантаження
  error: string | null = null; // Для обробки помилок

  constructor(private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getMaterials().subscribe({
      next: (materials) => {
        // Мапимо дані, додаючи поле expanded
        this.data = materials.map(material => ({
          ...material,
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

  toggleDetails(item: Material) {
    item.expanded = !item.expanded;
  }
}

