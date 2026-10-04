const STATUSES = ['pending', 'preparing', 'shipped', 'delivered', 'cancelled'];
const LOW_STOCK = 10;

const I18N = {
  ko: {
    title: 'Iris Commerce 관리자',
    'lang.label': '언어',
    'nav.label': '메인 메뉴',
    'nav.dashboard': '대시보드',
    'nav.orders': '주문 관리',
    'nav.products': '상품 관리',
    'health.checking': '확인 중…',
    'health.ok': '정상 운영 중',
    'health.degraded': 'DB 확인 필요',
    'health.down': '서버 응답 없음',
    'db.connected': 'PostgreSQL',
    'db.memory': 'in-memory',
    'db.unavailable': '연결 실패',
    'kpi.today': '오늘 매출',
    'kpi.month': '최근 30일 매출',
    'kpi.average': '평균 주문액',
    'kpi.last30': '최근 30일',
    'kpi.toShip': '미발송 주문',
    'kpi.toShipNote': '입금 대기 + 발송 준비 중',
    'chart.title': '일별 매출',
    'chart.note': '최근 14일 · 취소 제외 · JST',
    'chart.sales': '매출',
    'panel.status': '주문 상태',
    'panel.top': '매출 Top 5',
    'panel.lowStock': '재고 경고',
    'panel.lowStockNote': '10개 미만',
    'panel.noAlerts': '경고가 없습니다',
    'orders.search': '주문번호·고객명 검색',
    'orders.filter': '상태별 필터',
    'orders.all': '전체',
    'orders.empty': '해당하는 주문이 없습니다',
    'col.orderNo': '주문번호',
    'col.orderedAt': '주문 일시',
    'col.customer': '고객',
    'col.prefecture': '배송지',
    'col.product': '상품',
    'col.quantity': '수량',
    'col.total': '금액',
    'col.payment': '결제 수단',
    'col.status': '상태',
    'col.productName': '상품명',
    'col.category': '카테고리',
    'col.price': '가격(세금 포함)',
    'col.stock': '재고',
    'col.stockState': '판매 상태',
    'products.add': '상품 등록',
    'products.edit': '상품 수정',
    'col.actions': '관리',
    'form.cancel': '취소',
    'form.save': '저장',
    'action.edit': '수정',
    'action.delete': '삭제',
    'stock.out': '품절',
    'stock.low': '재고 부족',
    'stock.ok': '판매 중',
    'status.pending': '입금 대기',
    'status.preparing': '발송 준비 중',
    'status.shipped': '발송 완료',
    'status.delivered': '배송 완료',
    'status.cancelled': '취소',
    'errors.invalid_status': '올바르지 않은 상태입니다.',
    'errors.order_not_found': '주문을 찾을 수 없습니다.',
    'errors.invalid_product': '입력값을 확인하세요. (상품명 1~80자, 가격·재고는 0 이상의 정수)',
    'errors.product_not_found': '상품을 찾을 수 없습니다.',
    'errors.bad_request': '잘못된 요청입니다.',
    'errors.server_error': '서버 오류가 발생했습니다.',
    count: (n) => `${n}건`,
    updated: (time) => `갱신 ${time}`,
    tenThousand: '만',
    stockLeft: (n) => `잔여 ${n}`,
    statusAria: (orderNo) => `${orderNo} 상태`,
    statusChanged: (orderNo, label) => `${orderNo} 상태를 '${label}'(으)로 변경했습니다`,
    productCount: (n) => `${n}개`,
    productCreated: (name) => `'${name}' 상품을 등록했습니다`,
    productUpdated: (name) => `'${name}' 상품을 수정했습니다`,
    productDeleted: (name) => `'${name}' 상품을 삭제했습니다`,
    confirmDelete: (name) => `'${name}' 상품을 삭제할까요?\n주문 이력은 유지됩니다.`,
    networkError: (status) => `통신 오류 (${status})`,
  },
  ja: {
    title: 'Iris Commerce 管理画面',
    'lang.label': '言語',
    'nav.label': 'メインメニュー',
    'nav.dashboard': 'ダッシュボード',
    'nav.orders': '注文管理',
    'nav.products': '商品管理',
    'health.checking': '確認中…',
    'health.ok': '稼働中',
    'health.degraded': 'DB要確認',
    'health.down': 'サーバー応答なし',
    'db.connected': 'PostgreSQL',
    'db.memory': 'in-memory',
    'db.unavailable': '接続失敗',
    'kpi.today': '本日の売上',
    'kpi.month': '直近30日の売上',
    'kpi.average': '平均注文額',
    'kpi.last30': '直近30日',
    'kpi.toShip': '未発送の注文',
    'kpi.toShipNote': '入金待ち＋発送準備中',
    'chart.title': '日別売上',
    'chart.note': '直近14日・キャンセル除く・JST',
    'chart.sales': '売上',
    'panel.status': '注文ステータス',
    'panel.top': '売上トップ5',
    'panel.lowStock': '在庫アラート',
    'panel.lowStockNote': '10個未満',
    'panel.noAlerts': 'アラートはありません',
    'orders.search': '注文番号・顧客名で検索',
    'orders.filter': 'ステータスで絞り込み',
    'orders.all': 'すべて',
    'orders.empty': '該当する注文はありません',
    'col.orderNo': '注文番号',
    'col.orderedAt': '注文日時',
    'col.customer': '顧客',
    'col.prefecture': '配送先',
    'col.product': '商品',
    'col.quantity': '数量',
    'col.total': '金額',
    'col.payment': '支払方法',
    'col.status': 'ステータス',
    'col.productName': '商品名',
    'col.category': 'カテゴリ',
    'col.price': '価格（税込）',
    'col.stock': '在庫',
    'col.stockState': '状態',
    'products.add': '商品登録',
    'products.edit': '商品編集',
    'col.actions': '操作',
    'form.cancel': 'キャンセル',
    'form.save': '保存',
    'action.edit': '編集',
    'action.delete': '削除',
    'stock.out': '在庫切れ',
    'stock.low': '在庫少',
    'stock.ok': '販売中',
    'status.pending': '入金待ち',
    'status.preparing': '発送準備中',
    'status.shipped': '発送済み',
    'status.delivered': '配達完了',
    'status.cancelled': 'キャンセル',
    'errors.invalid_status': '不正なステータスです。',
    'errors.order_not_found': '注文が見つかりません。',
    'errors.invalid_product': '入力内容を確認してください。（商品名 1〜80文字、価格・在庫は 0 以上の整数）',
    'errors.product_not_found': '商品が見つかりません。',
    'errors.bad_request': '不正なリクエストです。',
    'errors.server_error': 'サーバーエラーが発生しました。',
    count: (n) => `${n}件`,
    updated: (time) => `更新 ${time}`,
    tenThousand: '万',
    stockLeft: (n) => `残り${n}`,
    statusAria: (orderNo) => `${orderNo} のステータス`,
    statusChanged: (orderNo, label) => `${orderNo} を「${label}」に変更しました`,
    productCount: (n) => `${n}件`,
    productCreated: (name) => `「${name}」を登録しました`,
    productUpdated: (name) => `「${name}」を更新しました`,
    productDeleted: (name) => `「${name}」を削除しました`,
    confirmDelete: (name) => `「${name}」を削除しますか？\n注文履歴は保持されます。`,
    networkError: (status) => `通信エラー (${status})`,
  },
};

function readStoredLang() {
  try {
    return localStorage.getItem('lang');
  } catch {
    return null;
  }
}

let lang = I18N[readStoredLang()] ? readStoredLang() : 'ko';

function t(key, ...args) {
  const value = I18N[lang][key] ?? key;
  return typeof value === 'function' ? value(...args) : value;
}

// prices stay in JPY notation regardless of UI language
const yen = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
const formatDateTime = (value) =>
  new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'ko-KR', {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const $ = (selector) => document.querySelector(selector);
const state = { orders: [], filter: 'all', query: '' };

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function statusBadge(status) {
  return el('span', { className: `badge badge-${status}`, textContent: t(`status.${status}`) });
}

let toastTimer;
// request: { method, url } shows which API call produced the message
function toast(message, { error = false, request } = {}) {
  const node = $('#toast');
  node.replaceChildren(
    ...(request ? [el('code', { className: `method method-${request.method}`, textContent: request.method }), el('code', { className: 'path', textContent: request.url })] : []),
    el('span', { textContent: message }),
  );
  node.classList.toggle('is-error', error);
  node.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { node.hidden = true; }, 2500);
}

async function api(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error ? t(`errors.${data.error}`) : t('networkError', response.status));
  }
  return data;
}

function send(method, url, body) {
  return api(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ---------- language ----------

function applyStaticText() {
  document.documentElement.lang = lang;
  document.title = t('title');
  $('#lang').value = lang;
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = t(node.dataset.i18n);
  for (const node of document.querySelectorAll('[data-i18n-placeholder]')) node.placeholder = t(node.dataset.i18nPlaceholder);
  for (const node of document.querySelectorAll('[data-i18n-aria]')) node.setAttribute('aria-label', t(node.dataset.i18nAria));
}

$('#lang').addEventListener('change', (event) => {
  lang = event.target.value;
  try {
    localStorage.setItem('lang', lang);
  } catch {
    // storage blocked: choice lasts for this page only
  }
  applyStaticText();
  route();
  loadHealth();
});

// ---------- health ----------

async function loadHealth() {
  try {
    const response = await fetch('/health');
    const health = await response.json();
    $('#host').textContent = health.host;
    $('#db').textContent = t(`db.${health.database}`);
    $('#status').dataset.state = health.status === 'ok' ? 'ok' : 'warn';
    $('#status-text').textContent = t(health.status === 'ok' ? 'health.ok' : 'health.degraded');
  } catch {
    $('#status').dataset.state = 'error';
    $('#status-text').textContent = t('health.down');
  }
}

// ---------- dashboard ----------

function niceMax(value) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((candidate) => candidate * magnitude >= value);
  return step * magnitude;
}

function compactYen(value) {
  return value >= 10000 ? `￥${(value / 10000).toLocaleString('ja-JP')}${t('tenThousand')}` : yen.format(value);
}

function renderChart(days) {
  const max = niceMax(Math.max(...days.map((day) => day.sales)));
  const bars = $('#chart-bars');
  const tooltip = $('#chart-tooltip');
  tooltip.hidden = true;

  $('#chart-axis').replaceChildren(
    ...[1, 0.5, 0].map((ratio) =>
      el('div', { className: 'gridline', style: `bottom:${ratio * 100}%` }, el('span', { textContent: compactYen(max * ratio) })),
    ),
  );

  bars.replaceChildren(
    ...days.map((day) => {
      const label = day.date.slice(5).replace('-', '/');
      const column = el('div', { className: 'bar-hit', tabIndex: 0, role: 'listitem' });
      column.setAttribute('aria-label', `${label} ${t('chart.sales')} ${yen.format(day.sales)}, ${t('count', day.orders)}`);
      column.append(el('div', { className: 'bar', style: `height:${(day.sales / max) * 100}%` }));
      const show = () => {
        tooltip.replaceChildren(
          el('strong', { textContent: label }),
          el('span', { textContent: yen.format(day.sales) }),
          el('small', { textContent: t('count', day.orders) }),
        );
        tooltip.hidden = false;
        const left = column.offsetLeft + column.offsetWidth / 2;
        tooltip.style.left = `${Math.min(Math.max(left, 60), bars.offsetWidth - 60)}px`;
      };
      const hide = () => { tooltip.hidden = true; };
      column.addEventListener('mouseenter', show);
      column.addEventListener('focus', show);
      column.addEventListener('mouseleave', hide);
      column.addEventListener('blur', hide);
      return column;
    }),
  );

  $('#chart-labels').replaceChildren(
    ...days.map((day, index) =>
      el('span', { textContent: index % 2 === days.length % 2 ? '' : day.date.slice(5).replace('-', '/') }),
    ),
  );
}

function row(label, value) {
  return el('li', {}, label, el('span', { className: 'row-value' }, value));
}

function renderDashboard(data) {
  const { kpis } = data;
  $('#kpi-today').textContent = yen.format(kpis.todaySales);
  $('#kpi-today-orders').textContent = t('count', kpis.todayOrders);
  $('#kpi-month').textContent = yen.format(kpis.monthSales);
  $('#kpi-month-orders').textContent = t('count', kpis.monthOrders);
  $('#kpi-average').textContent = yen.format(kpis.averageOrder);
  $('#kpi-ship').textContent = t('count', kpis.toShip);
  $('#dashboard-updated').textContent = t('updated', formatDateTime(Date.now()));

  renderChart(data.daily);

  $('#status-list').replaceChildren(
    ...Object.entries(data.statusCounts).map(([status, count]) => row(statusBadge(status), t('count', count))),
  );
  $('#top-list').replaceChildren(
    ...data.topProducts.map((product) =>
      row(el('span', { className: 'ellipsis', textContent: product.name }), yen.format(product.sales)),
    ),
  );
  $('#low-stock-list').replaceChildren(
    ...(data.lowStock.length
      ? data.lowStock.map((product) =>
          row(
            el('span', { className: 'ellipsis', textContent: product.name }),
            el('span', {
              className: product.stock === 0 ? 'badge badge-cancelled' : 'badge badge-pending',
              textContent: product.stock === 0 ? t('stock.out') : t('stockLeft', product.stock),
            }),
          ),
        )
      : [el('li', { className: 'muted', textContent: t('panel.noAlerts') })]),
  );
}

async function loadDashboard() {
  try {
    renderDashboard(await api('/api/dashboard'));
  } catch (error) {
    toast(error.message, { error: true });
  }
}

// ---------- orders ----------

function renderStatusFilter() {
  const counts = { all: state.orders.length };
  for (const order of state.orders) counts[order.status] = (counts[order.status] ?? 0) + 1;

  $('#status-filter').replaceChildren(
    ...['all', ...STATUSES].map((status) => {
      const chip = el('button', {
        type: 'button',
        className: 'chip',
        textContent: `${status === 'all' ? t('orders.all') : t(`status.${status}`)} ${counts[status] ?? 0}`,
      });
      chip.setAttribute('aria-pressed', String(state.filter === status));
      chip.addEventListener('click', () => {
        state.filter = status;
        renderOrders();
      });
      return chip;
    }),
  );
}

function statusSelect(order) {
  const select = el(
    'select',
    { className: `status-select badge-${order.status}` },
    ...STATUSES.map((value) => el('option', { value, textContent: t(`status.${value}`), selected: value === order.status })),
  );
  select.setAttribute('aria-label', t('statusAria', order.order_no));
  select.addEventListener('change', async () => {
    const previous = order.status;
    select.disabled = true;
    try {
      const url = `/api/orders/${order.id}`;
      await send('PATCH', url, { status: select.value });
      order.status = select.value;
      toast(t('statusChanged', order.order_no, t(`status.${order.status}`)), { request: { method: 'PATCH', url } });
      renderOrders();
    } catch (error) {
      select.value = previous;
      toast(error.message, { error: true });
    } finally {
      select.disabled = false;
    }
  });
  return select;
}

function renderOrders() {
  renderStatusFilter();
  const query = state.query.toLowerCase();
  const visible = state.orders.filter(
    (order) =>
      (state.filter === 'all' || order.status === state.filter) &&
      (!query || order.order_no.toLowerCase().includes(query) || order.customer.includes(state.query)),
  );

  $('#order-rows').replaceChildren(
    ...(visible.length
      ? visible.map((order) =>
          el(
            'tr',
            {},
            el('td', {}, el('code', { textContent: order.order_no })),
            el('td', { textContent: formatDateTime(order.ordered_at) }),
            el('td', { textContent: order.customer }),
            el('td', { textContent: order.prefecture }),
            el('td', { className: 'ellipsis', textContent: order.product_name }),
            el('td', { className: 'num', textContent: order.quantity }),
            el('td', { className: 'num', textContent: yen.format(order.total) }),
            el('td', { textContent: order.payment }),
            el('td', {}, statusSelect(order)),
          ),
        )
      : [el('tr', {}, el('td', { colSpan: 9, className: 'empty', textContent: t('orders.empty') }))]),
  );
}

async function loadOrders() {
  try {
    state.orders = (await api('/api/orders')).orders;
    renderOrders();
  } catch (error) {
    toast(error.message, { error: true });
  }
}

// ---------- products (CRUD) ----------

const dialog = $('#product-dialog');
const productForm = $('#product-form');
let editingProduct = null;

function stockBadge(stock) {
  if (stock === 0) return el('span', { className: 'badge badge-cancelled', textContent: t('stock.out') });
  if (stock < LOW_STOCK) return el('span', { className: 'badge badge-pending', textContent: t('stock.low') });
  return el('span', { className: 'badge badge-delivered', textContent: t('stock.ok') });
}

function openProductForm(product = null) {
  editingProduct = product;
  $('#product-dialog-title').textContent = t(product ? 'products.edit' : 'products.add');
  productForm.reset();
  $('#product-error').textContent = '';
  if (product) {
    for (const field of ['name', 'category', 'price', 'stock']) productForm.elements[field].value = product[field];
  }
  dialog.showModal();
}

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fields = productForm.elements;
  const body = {
    name: fields.name.value.trim(),
    category: fields.category.value,
    price: Number(fields.price.value),
    stock: Number(fields.stock.value),
  };
  const [method, url] = editingProduct ? ['PUT', `/api/products/${editingProduct.id}`] : ['POST', '/api/products'];
  const submit = productForm.querySelector('[type="submit"]');
  submit.disabled = true;
  try {
    const { product } = await send(method, url, body);
    dialog.close();
    toast(t(editingProduct ? 'productUpdated' : 'productCreated', product.name), { request: { method, url } });
    await loadProducts();
  } catch (error) {
    $('#product-error').textContent = error.message;
  } finally {
    submit.disabled = false;
  }
});

async function removeProduct(product) {
  if (!confirm(t('confirmDelete', product.name))) return;
  const url = `/api/products/${product.id}`;
  try {
    await send('DELETE', url);
    toast(t('productDeleted', product.name), { request: { method: 'DELETE', url } });
    await loadProducts();
  } catch (error) {
    toast(error.message, { error: true });
  }
}

async function loadProducts() {
  try {
    const { products, categories } = await api('/api/products');
    $('#product-category').replaceChildren(...categories.map((category) => el('option', { value: category, textContent: category })));
    $('#product-count').textContent = t('productCount', products.length);
    $('#product-rows').replaceChildren(
      ...products.map((product) => {
        const editButton = el('button', { type: 'button', className: 'ghost', textContent: t('action.edit') });
        const deleteButton = el('button', { type: 'button', className: 'ghost danger', textContent: t('action.delete') });
        editButton.setAttribute('aria-label', `${t('action.edit')}: ${product.name}`);
        deleteButton.setAttribute('aria-label', `${t('action.delete')}: ${product.name}`);
        editButton.addEventListener('click', () => openProductForm(product));
        deleteButton.addEventListener('click', () => removeProduct(product));
        return el(
          'tr',
          {},
          el('td', {}, el('code', { textContent: product.sku })),
          el('td', { textContent: product.name }),
          el('td', { textContent: product.category }),
          el('td', { className: 'num', textContent: yen.format(product.price) }),
          el('td', { className: 'num', textContent: product.stock }),
          el('td', {}, stockBadge(product.stock)),
          el('td', { className: 'actions' }, editButton, deleteButton),
        );
      }),
    );
  } catch (error) {
    toast(error.message, { error: true });
  }
}

$('#add-product').addEventListener('click', () => openProductForm());
$('#product-cancel').addEventListener('click', () => dialog.close());

// ---------- routing ----------

const loaders = { dashboard: loadDashboard, orders: loadOrders, products: loadProducts };

function route() {
  const view = loaders[location.hash.slice(1)] ? location.hash.slice(1) : 'dashboard';
  for (const name of Object.keys(loaders)) {
    $(`#view-${name}`).hidden = name !== view;
  }
  for (const link of document.querySelectorAll('.nav a')) {
    link.toggleAttribute('aria-current', link.dataset.view === view);
  }
  loaders[view]();
}

$('#order-search').addEventListener('input', (event) => {
  state.query = event.target.value.trim();
  renderOrders();
});

window.addEventListener('hashchange', route);
applyStaticText();
route();
loadHealth();
setInterval(loadHealth, 15000);
