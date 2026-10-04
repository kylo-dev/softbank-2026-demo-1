// Deterministic dummy data. Same rows every boot; timestamps are relative to boot time.

const PRODUCTS = [
  ['宇治抹茶 100g', '食品', 1980],
  ['北海道産 日高昆布', '食品', 1280],
  ['新潟県産 コシヒカリ 5kg', '食品', 3480],
  ['柚子ぽん酢 360ml', '食品', 648],
  ['抹茶クッキー 12枚入', '食品', 1080],
  ['静岡 煎茶ティーバッグ', '食品', 864],
  ['南部鉄器 急須', '日用品', 8800],
  ['有田焼 マグカップ', '日用品', 2420],
  ['今治タオル ギフトセット', '日用品', 4950],
  ['和柄 手ぬぐい', '日用品', 990],
  ['信楽焼 花瓶', '日用品', 6600],
  ['和紙ノート A5', '日用品', 770],
  ['ワイヤレスイヤホン', '家電', 12800],
  ['スチーム加湿器', '家電', 9980],
  ['IH炊飯器 5.5合', '家電', 24800],
  ['電動歯ブラシ', '家電', 7480],
  ['保温タンブラー 500ml', '家電', 2980],
  ['化粧水 敏感肌用', 'コスメ', 1650],
  ['日焼け止め SPF50+', 'コスメ', 1320],
  ['フェイスマスク 10枚', 'コスメ', 1100],
  ['ヘアオイル 椿', 'コスメ', 2200],
  ['デニムジャケット', 'ファッション', 8900],
  ['キャンバススニーカー', 'ファッション', 6490],
  ['折りたたみ傘', 'ファッション', 2750],
];

const CATEGORIES = ['食品', '日用品', '家電', 'コスメ', 'ファッション'];
const FAMILY = ['佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤', '吉田', '山田'];
const GIVEN = ['翔太', '陽菜', '蓮', '結衣', '大翔', 'さくら', '悠真', '美咲', '健太', '愛', '拓海', '七海'];
const PREFECTURES = ['東京都', '東京都', '大阪府', '神奈川県', '愛知県', '福岡県', '北海道', '京都府', '兵庫県', '埼玉県', '千葉県', '宮城県', '広島県', '沖縄県'];
const PAYMENTS = ['クレジットカード', 'クレジットカード', 'PayPay', 'コンビニ払い', '代金引換', '銀行振込'];
const ORDER_COUNT = 100;
const DAY = 86_400_000;

// mulberry32: tiny seeded PRNG so every deploy starts from identical data
function createRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function statusFor(ageDays, random) {
  if (random() < 0.05) return 'cancelled';
  if (ageDays < 1) return random() < 0.5 ? 'pending' : 'preparing';
  if (ageDays < 3) return random() < 0.4 ? 'preparing' : 'shipped';
  if (ageDays < 6) return random() < 0.3 ? 'shipped' : 'delivered';
  return 'delivered';
}

function buildSeed(now = Date.now()) {
  const random = createRandom(20261004);
  const pick = (list) => list[Math.floor(random() * list.length)];

  const products = PRODUCTS.map(([name, category, price], index) => ({
    id: index + 1,
    sku: `SKU-${String(index + 1).padStart(4, '0')}`,
    name,
    category,
    price,
    stock: index % 6 === 0 ? Math.floor(random() * 8) : 20 + Math.floor(random() * 180),
  }));

  const orders = [];
  for (let index = 0; index < ORDER_COUNT; index += 1) {
    // skew toward recent days so the chart shows growth
    const ageDays = 30 * random() ** 1.4;
    const product = pick(products);
    const quantity = random() < 0.75 ? 1 : 2 + Math.floor(random() * 3);
    orders.push({
      ordered_at: new Date(now - ageDays * DAY),
      customer: `${pick(FAMILY)} ${pick(GIVEN)}`,
      prefecture: pick(PREFECTURES),
      product_id: product.id,
      product_name: product.name,
      quantity,
      total: product.price * quantity,
      payment: pick(PAYMENTS),
      status: statusFor(ageDays, random),
    });
  }

  orders.sort((a, b) => a.ordered_at - b.ordered_at);
  orders.forEach((order, index) => {
    order.id = index + 1;
    order.order_no = `JP-${String(240000 + index + 1)}`;
  });

  return { products, orders };
}

module.exports = { buildSeed, CATEGORIES };

if (require.main === module) {
  const assert = require('node:assert');
  const a = buildSeed(0);
  const b = buildSeed(0);
  assert.deepStrictEqual(a, b, 'seed must be deterministic');
  assert.strictEqual(a.orders.length, ORDER_COUNT);
  assert.ok(a.orders.every((order) => order.total === a.products[order.product_id - 1].price * order.quantity));
  assert.ok(a.products.some((product) => product.stock < 10), 'needs low-stock rows for the dashboard');
  assert.ok(a.products.every((product) => CATEGORIES.includes(product.category)), 'seed categories must be valid');
  console.log('seed ok');
}
