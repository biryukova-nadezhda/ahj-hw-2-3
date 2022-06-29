import Table from './Table';

export default class Action {
  constructor(data) {
    this.data = data;
    this.table = new Table(this.data);
    this.click = false;
  }

  // Метод сортировки данных по возрастанию
  getSortDataUp(key, data = this.data) {
    return data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  // Метод сортировки данных по убыванию
  getSortDataDown(key, data = this.data) {
    return data.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  }

  // Метод добаления слушателя события клик по ячейке заголовка
  addListener() {
    const colTitle = Array.from(document.querySelectorAll('.table th'));

    colTitle.forEach((cell) => {
      cell.addEventListener('click', () => {
        this.handler(cell);
      });
    });
  }

  // Метод обработки события клик
  handler(cell) {
    const key = cell.dataset.sortparam;
    const tbody = document.querySelector('.table tbody');
    let sortData;

    if (this.click) {
      sortData = this.getSortDataDown(key);
      this.click = false;
    } else {
      sortData = this.getSortDataUp(key);
      this.click = true;
    }

    tbody.innerHTML = '';

    this.addTrSort(sortData);
    return sortData;
  }

  addTrSort(data) {
    data.forEach((el) => {
      this.table.addTr(el);
    });
  }

  // Метод запуска работы класса
  start() {
    this.table.start();
    this.addListener();
  }
}
