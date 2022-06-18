const arrData = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

function createStructTable() {
  const table = `
    <table class="table">
      <thead>
        <tr>
          <th class="thTable" data-sortParam="id">id</th>
          <th class="thTable" data-sortParam="title">title</th>
          <th class="thTable" data-sortParam="year">year</th>
          <th class="thTable" data-sortParam="imdb">imdb</th>
        </tr>
      </thead>

      <tbody>
      </tbody>
    </table>
  `;

  const section = document.querySelector('.tableSection');
  section.insertAdjacentHTML('afterbegin', table);
}

function addTr(obj) {
  const tbody = document.querySelector('.table tbody');
  const {
    id, title, year, imdb,
  } = obj;

  const trTable = `<tr data-id="${id}" data-title="${title}" data-year="${year}" data-imdb="${imdb}">
    <td class="tdTable">${id}</td>
    <td class="tdTable">${title}</td>
    <td class="tdTable">(${year})</td>
    <td class="tdTable">${imdb.toFixed(2)}</td>
    </tr>`;

  tbody.insertAdjacentHTML('beforeend', trTable);
}

function getSortDataUp(data, key) {
  return data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

function getSortDataDown(data, key) {
  return data.sort((a, b) => (a[key] > b[key] ? -1 : 1));
}

function start(data) {
  createStructTable();
  data.forEach((obj) => {
    addTr(obj);
  });
}

start(arrData);

// Добавляем обработчик события
const colTitle = Array.from(document.querySelectorAll('.table th'));
let clickC = false;

colTitle.forEach((cell) => {
  cell.addEventListener('click', () => {
    const key = cell.dataset.sortparam;
    const tbody = document.querySelector('.table tbody');
    let sortData;

    if (clickC) {
      sortData = getSortDataDown(arrData, key);
      clickC = false;
    } else {
      sortData = getSortDataUp(arrData, key);
      clickC = true;
    }

    tbody.innerHTML = '';
    sortData.forEach((obj) => {
      addTr(obj);
    });
  });
});
