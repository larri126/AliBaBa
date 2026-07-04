/* ============================================================
   KEBAB POS — Serverless Mobile Point of Sale
   ============================================================ */

const STORAGE_KEY = 'kebab_pos_orders';
const GRANDE_SURCHARGE = 1.50;
const SUPPLEMENT_PRICE = 1.00;
const REFRESCO_PRICE = 1.80;

const SUPPLEMENTS = [
  { id: 'queso', label: 'Queso' },
  { id: 'patatas', label: 'Patatas' },
  { id: 'salsa_kebab', label: 'Salsa Kebab' },
  { id: 'salsa_bbq', label: 'Salsa BBQ' },
  { id: 'arroz', label: 'Arroz' },
  { id: 'carne_extra', label: 'Carne Extra' },
];

const EXCLUSIONS = [
  { id: 'sin_lechuga', label: 'Sin lechuga' },
  { id: 'sin_tomate', label: 'Sin tomate' },
  { id: 'sin_cebolla', label: 'Sin cebolla' },
  { id: 'sin_col', label: 'Sin col' },
  { id: 'sin_salsa_blanca', label: 'Sin salsa blanca' },
  { id: 'sin_salsa_roja', label: 'Sin salsa roja' },
  { id: 'sin_patatas', label: 'Sin patatas' },
];

const MENU_DRINK_OPTIONS = [
  'Nestea Maracuyá',
  'Nestea Frutos Rojos',
  '7up',
  'Aquarius Normal',
  'Aquarius Melocotón Rojo',
  'Aquarius Naranja',
  'Coca-Cola Normal',
  'Coca-Cola Zero',
  'Fanta Naranja',
  'Fanta Limón',
  'Amstel 0,0 Lata',
  'Heineken Lata',
  'Amstel Lata',
  'Mahou Lata',
  'Agua Pequeña',
  'Agua con Gas',
  'Gaseosa',
  'Sweeps (Schweppes)',
  'Zumo Piña',
  'Zumo Piña sin azúcar',
  'Energética Pequeña',
  'Agua Grande',
];

const CHUPITO_COPA_STANDARD = [
  'Casalla', 'Vino', 'Herbero', 'Orujo', 'Whisky', 'Larios', 'Maestranza', 'Mistela',
];

const MENU = {
  kebabs: {
    label: 'Kebabs',
    icon: '🥙',
    items: [
      { id: 'kebab_pollo', name: 'Pollo', price: 5.00, bread: true, grande: true },
      { id: 'kebab_ternera', name: 'Ternera', price: 5.00, bread: true, grande: true },
      { id: 'kebab_mixto', name: 'Mixto', price: 5.00, bread: true, grande: true },
      { id: 'kebab_falafel', name: 'Falafel', price: 5.00, bread: true, grande: true },
      { id: 'kebab_vegetal', name: 'Vegetal', price: 4.50, bread: true, grande: true },
      { id: 'kebab_solo_carne', name: 'Solo Carne', price: 6.00, bread: true, grande: true },
    ],
  },
  boxes: {
    label: 'Boxes',
    icon: '📦',
    items: [
      { id: 'box_simple', name: 'Simple', price: 4.50, description: 'Patatas + Carne + Salsa' },
      { id: 'box_mediano', name: 'Mediano', price: 5.50, description: 'Patatas + Carne + Salsa' },
      { id: 'box_especial', name: 'Especial', price: 6.50, description: 'Con ensalada' },
      { id: 'box_extra_especial', name: 'Extra Especial', price: 7.00, description: 'Con ensalada y queso' },
      { id: 'box_alitas', name: 'Boom Box Alitas', price: 6.50 },
      { id: 'box_nuggets', name: 'Boom Box Nuggets', price: 6.50 },
      { id: 'box_falafel', name: 'Boom Box Falafel', price: 6.50 },
      { id: 'box_boom', name: 'Boom Box Boom', price: 6.50 },
    ],
  },
  kebab_especial: {
    label: 'Kebab Especial',
    icon: '⭐',
    items: [
      { id: 'especial_sufi', name: 'Sufi', price: 14.50 },
      { id: 'especial_jovi', name: 'Jovi', price: 11.50 },
      { id: 'especial_ravi', name: 'Ravi', price: 11.50 },
      { id: 'especial_ali', name: 'Ali', price: 12.50 },
      { id: 'especial_goli', name: 'Goli', price: 11.50 },
      { id: 'especial_jose', name: 'Jose', price: 12.50 },
    ],
  },
  burgers: {
    label: 'Burgers',
    icon: '🍔',
    items: [
      { id: 'burger_simple', name: 'Simple', price: 5.50 },
      { id: 'burger_bbq', name: 'BBQ', price: 6.50 },
      { id: 'burger_kebab', name: 'Kebab', price: 7.50 },
      { id: 'burger_especial', name: 'Especial', price: 7.50 },
    ],
  },
  salads: {
    label: 'Ensaladas',
    icon: '🥗',
    items: [
      { id: 'salad_simple', name: 'Simple', price: 5.50 },
      { id: 'salad_testy', name: 'Testy', price: 9.50 },
      { id: 'salad_ali_baba', name: 'Ali Baba', price: 10.50 },
    ],
  },
  platos: {
    label: 'Platos',
    icon: '🍽️',
    items: [
      { id: 'plato_simple', name: 'Simple', price: 8.00, grande: true },
      { id: 'plato_especial', name: 'Especial', price: 8.50, grande: true },
    ],
  },
  entrantes: {
    label: 'Entrantes',
    icon: '🍟',
    items: [
      { id: 'patatas_fritas', name: 'Patatas Fritas', sizes: { mediana: 2.50, grande: 3.50 } },
      { id: 'patatas_bravas', name: 'Patatas Bravas', sizes: { mediana: 4.00, grande: 5.00 } },
      { id: 'patatas_delux', name: 'Patatas Delux', sizes: { mediana: 4.00, grande: 5.00 } },
      { id: 'combo_falafel', name: 'Falafel + Patatas', price: 6.50, description: '6 unidades' },
      { id: 'combo_alitas', name: 'Alitas + Patatas', price: 6.50, description: '6 unidades' },
      { id: 'combo_nuggets', name: 'Nuggets + Patatas', price: 6.50, description: '6 unidades' },
      { id: 'nuggets_queso', name: 'Nuggets Queso', price: 4.50 },
      { id: 'cheez_snaks', name: 'Cheez Snaks', price: 4.50 },
      { id: 'fingers_mozzarella', name: 'Fingers Mozzarella', price: 4.50 },
      { id: 'onion_rings', name: 'Onion Rings', price: 4.50 },
    ],
  },
  menus: {
    label: 'Menús',
    icon: '🍱',
    items: [
      { id: 'menu_1', name: 'Menú 1', price: 8.00, description: '1 Kebab', grande: true, menuDrink: true },
      { id: 'menu_2', name: 'Menú 2', price: 14.00, description: '2 Kebabs', grande: true, menuDrink: true },
      { id: 'menu_3', name: 'Menú 3', price: 8.00, description: '1 Kebab Falafel', grande: true, menuDrink: true },
      { id: 'menu_4', name: 'Menú 4', price: 9.00, description: '6 Alitas + Arroz', menuDrink: true },
      { id: 'menu_5', name: 'Menú 5', price: 9.00, description: '8 Nuggets + Arroz', menuDrink: true },
      { id: 'menu_6', name: 'Menú 6', price: 9.00, description: '1 Burger', menuDrink: true },
    ],
  },
  chupitos_copas: {
    label: 'Chupitos & Copas',
    icon: '🥃',
    items: [
      ...CHUPITO_COPA_STANDARD.map((name) => ({
        id: `chup_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        name,
        sizes: { chupito: 1.00, copa: 2.50 },
        sizeLabels: { chupito: 'Chupito', copa: 'Copa' },
      })),
      {
        id: 'chup_tequila',
        name: 'Tequila',
        sizes: { chupito: 2.00, copa: 3.00 },
        sizeLabels: { chupito: 'Chupito', copa: 'Copa' },
      },
    ],
  },
  refrescos: {
    label: 'Refrescos',
    icon: '🥤',
    items: MENU_DRINK_OPTIONS.map((name) => ({
      id: `ref_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name,
      price: REFRESCO_PRICE,
    })),
  },
  premium_litros: {
    label: 'Premium / Litros',
    icon: '🍺',
    items: [
      { id: 'prem_litro_amstel', name: 'Litro Amstel', price: 3.50 },
      { id: 'prem_monster', name: 'Monster', price: 2.50 },
      { id: 'prem_litro_alhambra', name: 'Litro Alhambra', price: 2.50 },
      { id: 'prem_radler', name: 'Radler', price: 2.50 },
      { id: 'prem_tinto_verano', name: 'Tinto de Verano', price: 2.50 },
      { id: 'prem_amstel_tostada', name: 'Amstel 0,0 Tostada Cristal', price: 2.50 },
    ],
  },
};

/* ============================================================
   STATE
   ============================================================ */

let cart = [];
let orders = [];
let activeCategory = Object.keys(MENU)[0];
let activeView = 'menu';
let orderType = 'dine-in';
let selectedTable = null;
let editingOrderId = null;
let currentSheetItem = null;
let currentSheetCategoryKey = null;
let sheetConfig = {};
let sheetTargetOrder = 'new';
let supplementPickerContext = null;

/* ============================================================
   DOM REFERENCES
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  categoryTabs: $('#category-tabs'),
  menuItems: $('#menu-items'),
  cartBar: $('#cart-bar'),
  cartCount: $('#cart-count'),
  cartTotalBar: $('#cart-total-bar'),
  cartTotal: $('#cart-total'),
  cartItems: $('#cart-items'),
  cartEmpty: $('#cart-empty'),
  cartFooter: $('#cart-footer'),
  ordersList: $('#orders-list'),
  ordersEmpty: $('#orders-empty'),
  ordersCount: $('#orders-count'),
  ordersRevenue: $('#orders-revenue'),
  activeOrdersList: $('#active-orders-list'),
  activeOrdersEmpty: $('#active-orders-empty'),
  activeOrdersCount: $('#active-orders-count'),
  editingBanner: $('#editing-banner'),
  editingLabel: $('#editing-label'),
  itemSheet: $('#item-sheet'),
  itemSheetOverlay: $('#item-sheet-overlay'),
  sheetBody: $('#sheet-body'),
  sheetItemName: $('#sheet-item-name'),
  sheetItemCategory: $('#sheet-item-category'),
  sheetPrice: $('#sheet-price'),
  cartSheet: $('#cart-sheet'),
  cartSheetOverlay: $('#cart-sheet-overlay'),
  checkoutOverlay: $('#checkout-overlay'),
  customerName: $('#customer-name'),
  checkoutItemsCount: $('#checkout-items-count'),
  checkoutTotal: $('#checkout-total'),
  toast: $('#toast'),
  confirmOverlay: $('#confirm-overlay'),
  confirmTitle: $('#confirm-title'),
  confirmMessage: $('#confirm-message'),
  supplementOverlay: $('#supplement-overlay'),
  supplementPickerTitle: $('#supplement-picker-title'),
  supplementPickerList: $('#supplement-picker-list'),
};

/* ============================================================
   UTILITIES
   ============================================================ */

function formatPrice(amount) {
  return amount.toFixed(2) + '€';
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function showToast(message, duration = 2500) {
  dom.toast.textContent = message;
  dom.toast.classList.add('toast-visible');
  setTimeout(() => dom.toast.classList.remove('toast-visible'), duration);
}

function showConfirm(title, message) {
  return new Promise((resolve) => {
    dom.confirmTitle.textContent = title;
    dom.confirmMessage.textContent = message;
    dom.confirmOverlay.classList.remove('hidden');

    const onOk = () => { cleanup(); resolve(true); };
    const onCancel = () => { cleanup(); resolve(false); };
    const cleanup = () => {
      dom.confirmOverlay.classList.add('hidden');
      $('#confirm-ok').removeEventListener('click', onOk);
      $('#confirm-cancel').removeEventListener('click', onCancel);
    };

    $('#confirm-ok').addEventListener('click', onOk);
    $('#confirm-cancel').addEventListener('click', onCancel);
  });
}

function openSheet(sheet, overlay) {
  overlay.classList.remove('hidden');
  overlay.classList.add('overlay-visible');
  requestAnimationFrame(() => sheet.classList.add('sheet-open'));
  document.body.style.overflow = 'hidden';
}

function closeSheet(sheet, overlay) {
  sheet.classList.remove('sheet-open');
  overlay.classList.remove('overlay-visible');
  setTimeout(() => overlay.classList.add('hidden'), 300);
  document.body.style.overflow = '';
}

/* ============================================================
   PERSISTENCE
   ============================================================ */

function loadOrders() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    orders = data ? JSON.parse(data) : [];
    migrateOrders();
  } catch {
    orders = [];
  }
}

function migrateOrders() {
  let changed = false;
  orders = orders.map((order) => {
    const migrated = { ...order };

    if (!migrated.status) { migrated.status = 'active'; changed = true; }
    if (!migrated.updatedAt) { migrated.updatedAt = migrated.createdAt; changed = true; }

    if (!migrated.orderType) {
      changed = true;
      if (migrated.table && migrated.table !== 'Takeaway') {
        migrated.orderType = 'dine-in';
        migrated.customerName = null;
      } else if (migrated.customerName) {
        migrated.orderType = 'takeaway';
        migrated.table = null;
      } else {
        migrated.orderType = 'dine-in';
      }
    }

    if (migrated.orderType === 'dine-in' && migrated.table === 'Takeaway') {
      migrated.table = null;
      migrated.orderType = 'takeaway';
      migrated.customerName = migrated.customerName || 'Cliente';
      changed = true;
    }

    const items = (migrated.items || []).map((item) => {
      if (!item.cartId || !item.itemId) changed = true;
      const config = item.config || {};
      if (!config.exclusions) { config.exclusions = []; changed = true; }
      if (!config.supplements) { config.supplements = []; changed = true; }
      if (config.exclusions.includes('sin_ensalada')) {
        config.exclusions = config.exclusions.filter((e) => e !== 'sin_ensalada');
        changed = true;
      }
      return {
        ...item,
        itemId: item.itemId || null,
        cartId: item.cartId || generateId(),
        config,
      };
    });
    migrated.items = items;

    return migrated;
  });
  if (changed) saveOrders();
}

function getActiveOrders() {
  return orders.filter((o) => o.status === 'active');
}

function getOrderLabel(order) {
  if (order.orderType === 'takeaway') {
    return `Nombre: ${order.customerName}`;
  }
  return `Mesa ${order.table}`;
}

function getOrderById(orderId) {
  return orders.find((o) => o.id === orderId);
}

function recalculateOrderTotals(order) {
  order.itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  order.total = order.items.reduce((sum, i) => sum + i.totalPrice, 0);
  order.updatedAt = new Date().toISOString();
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function exportOrders() {
  if (orders.length === 0) {
    showToast('No hay pedidos para exportar');
    return;
  }
  const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `kebab-pos-pedidos-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`${orders.length} pedidos exportados`);
}

async function clearHistory() {
  if (orders.length === 0) {
    showToast('El historial ya está vacío');
    return;
  }
  const confirmed = await showConfirm(
    'Limpiar Historial',
    `¿Eliminar ${orders.length} pedido(s)? Esta acción no se puede deshacer.`
  );
  if (confirmed) {
    orders = [];
    saveOrders();
    cancelEditing();
    renderHistory();
    renderActiveOrders();
    showToast('Historial eliminado');
  }
}

/* ============================================================
   PRICE CALCULATION
   ============================================================ */

function calculateBasePrice(item, config) {
  let price;

  if (item.sizes) {
    const sizeKey = config.size || 'mediana';
    price = item.sizes[sizeKey] || item.sizes.mediana;
  } else if (item.editable && config.customPrice != null) {
    price = config.customPrice;
  } else {
    price = item.price;
  }

  if (config.grande && item.grande) {
    price += GRANDE_SURCHARGE;
  }

  return price;
}

function getSupplementCost(config) {
  return (config.supplements?.length || 0) * SUPPLEMENT_PRICE;
}

function calculateUnitPrice(item, config) {
  return calculateBasePrice(item, config) + getSupplementCost(config);
}

/** Price for item sheet preview (base only, no supplements) */
function calculateItemPrice(item, config) {
  return calculateBasePrice(item, config);
}

function getCartTotal() {
  return cart.reduce((sum, entry) => sum + entry.totalPrice, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, entry) => sum + entry.quantity, 0);
}

/* ============================================================
   CART
   ============================================================ */

function normalizeConfig(config) {
  return {
    bread: config.bread || null,
    grande: !!config.grande,
    size: config.size || null,
    customPrice: config.customPrice ?? null,
    menuDrink: config.menuDrink || null,
    exclusions: [...(config.exclusions || [])],
    supplements: [...(config.supplements || [])],
  };
}

function recalculateEntryPrice(entry) {
  const menuItem = findMenuItem(entry.itemId);
  entry.unitPrice = menuItem
    ? calculateUnitPrice(menuItem, entry.config)
    : entry.unitPrice;
  entry.totalPrice = entry.unitPrice * entry.quantity;
}

function recalculateOrderItem(entry) {
  recalculateEntryPrice(entry);
  entry.configLabel = buildConfigLabel(entry.config, findMenuItem(entry.itemId));
}

function buildCartEntry(item, categoryKey, config) {
  const normalized = normalizeConfig(config);
  const unitPrice = calculateUnitPrice(item, normalized);
  return {
    cartId: generateId(),
    itemId: item.id,
    name: item.name,
    category: MENU[categoryKey].label,
    quantity: 1,
    config: normalized,
    unitPrice,
    totalPrice: unitPrice,
  };
}

function buildOrderItem(entry) {
  return {
    cartId: entry.cartId,
    itemId: entry.itemId,
    name: entry.name,
    category: entry.category,
    quantity: entry.quantity,
    unitPrice: entry.unitPrice,
    totalPrice: entry.totalPrice,
    config: entry.config,
    configLabel: buildConfigLabel(entry.config, findMenuItem(entry.itemId)),
  };
}

function addToCart(item, categoryKey, config) {
  cart.push(buildCartEntry(item, categoryKey, config));
  updateCartUI();
  showToast(`${item.name} añadido al carrito`);
}

function appendItemToOrder(orderId, item, categoryKey, config) {
  const order = getOrderById(orderId);
  if (!order || order.status !== 'active') {
    showToast('Pedido no encontrado');
    return;
  }

  const entry = buildCartEntry(item, categoryKey, config);
  order.items.push(buildOrderItem(entry));
  recalculateOrderTotals(order);
  saveOrders();
  renderActiveOrders();
  showToast(`${item.name} añadido a ${getOrderLabel(order)}`);
}

function removeFromCart(cartId) {
  cart = cart.filter((e) => e.cartId !== cartId);
  updateCartUI();
}

function updateCartQuantity(cartId, delta) {
  const entry = cart.find((e) => e.cartId === cartId);
  if (!entry) return;

  entry.quantity += delta;
  if (entry.quantity <= 0) {
    removeFromCart(cartId);
    return;
  }
  recalculateEntryPrice(entry);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function getSizeLabel(config, item) {
  if (!config.size || !item?.sizes) return null;
  if (item.sizeLabels) return item.sizeLabels[config.size] || config.size;
  return config.size === 'grande' ? 'Grande' : 'Mediana';
}

function buildModifierLabel(config, item) {
  const parts = [];

  if (config.bread) parts.push(config.bread);
  if (config.grande && item?.grande) parts.push('Grande');
  const sizeLabel = getSizeLabel(config, item);
  if (sizeLabel) parts.push(sizeLabel);
  if (config.exclusions?.length > 0) {
    const labels = config.exclusions.map((id) => {
      const ex = EXCLUSIONS.find((e) => e.id === id);
      return ex ? ex.label : id;
    });
    parts.push(labels.join(', '));
  }
  if (config.menuDrink) parts.push(`Bebida: ${config.menuDrink}`);
  return parts.length > 0 ? parts.join(' · ') : null;
}

function buildConfigLabel(config, item) {
  const parts = [];

  if (config.bread) parts.push(config.bread);
  if (config.grande && item?.grande) parts.push('Grande');
  const sizeLabel = getSizeLabel(config, item);
  if (sizeLabel) parts.push(sizeLabel);
  if (config.exclusions?.length > 0) {
    const labels = config.exclusions.map((id) => {
      const ex = EXCLUSIONS.find((e) => e.id === id);
      return ex ? ex.label : id;
    });
    parts.push(labels.join(', '));
  }
  if (config.menuDrink) parts.push(`Bebida: ${config.menuDrink}`);
  if (config.supplements?.length > 0) {
    const labels = config.supplements.map((id) => {
      const sup = SUPPLEMENTS.find((s) => s.id === id);
      return sup ? `+${sup.label}` : id;
    });
    parts.push(labels.join(', '));
  }

  return parts.length > 0 ? parts.join(' · ') : null;
}

/* ============================================================
   SUPPLEMENT MANAGEMENT
   ============================================================ */

function openSupplementPicker(cartId, orderId = null) {
  let entry;
  if (orderId) {
    const order = getOrderById(orderId);
    entry = order?.items.find((i) => i.cartId === cartId);
  } else {
    entry = cart.find((e) => e.cartId === cartId);
  }
  if (!entry) return;

  supplementPickerContext = { cartId, orderId };
  const current = entry.config.supplements || [];
  const available = SUPPLEMENTS.filter((s) => !current.includes(s.id));

  dom.supplementPickerTitle.textContent = `Suplementos — ${entry.name}`;

  if (available.length === 0) {
    dom.supplementPickerList.innerHTML = `
      <p class="text-center text-stone-500 py-4 text-sm">Todos los suplementos ya están añadidos</p>`;
  } else {
    dom.supplementPickerList.innerHTML = available.map((s) => `
      <button type="button" data-supplement-id="${s.id}"
        class="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-kebab-50 active:bg-kebab-100 rounded-xl transition-colors text-left">
        <span class="font-semibold text-stone-800">${s.label}</span>
        <span class="text-kebab-700 font-bold">+${formatPrice(SUPPLEMENT_PRICE)}</span>
      </button>
    `).join('');

    dom.supplementPickerList.querySelectorAll('[data-supplement-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        addSupplementToItem(cartId, btn.dataset.supplementId, orderId);
        closeSupplementPicker();
      });
    });
  }

  dom.supplementOverlay.classList.remove('hidden');
}

function closeSupplementPicker() {
  dom.supplementOverlay.classList.add('hidden');
  supplementPickerContext = null;
}

function addSupplementToItem(cartId, supplementId, orderId = null) {
  if (orderId) {
    const order = getOrderById(orderId);
    if (!order || order.status !== 'active') return;
    const item = order.items.find((i) => i.cartId === cartId);
    if (!item) return;
    if (!item.config.supplements) item.config.supplements = [];
    if (item.config.supplements.includes(supplementId)) return;
    item.config.supplements.push(supplementId);
    recalculateOrderItem(item);
    recalculateOrderTotals(order);
    saveOrders();
    renderActiveOrders();
    if (editingOrderId === orderId) syncCartFromOrder(order);
    const sup = SUPPLEMENTS.find((s) => s.id === supplementId);
    showToast(`+${sup?.label || 'Suplemento'} añadido`);
    return;
  }

  const entry = cart.find((e) => e.cartId === cartId);
  if (!entry) return;
  if (!entry.config.supplements) entry.config.supplements = [];
  if (entry.config.supplements.includes(supplementId)) return;
  entry.config.supplements.push(supplementId);
  recalculateEntryPrice(entry);
  updateCartUI();
  const sup = SUPPLEMENTS.find((s) => s.id === supplementId);
  showToast(`+${sup?.label || 'Suplemento'} añadido`);
}

function removeSupplementFromItem(cartId, supplementId, orderId = null) {
  if (orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    const item = order.items.find((i) => i.cartId === cartId);
    if (!item?.config.supplements) return;
    item.config.supplements = item.config.supplements.filter((s) => s !== supplementId);
    recalculateOrderItem(item);
    recalculateOrderTotals(order);
    saveOrders();
    renderActiveOrders();
    if (editingOrderId === orderId) syncCartFromOrder(order);
    showToast('Suplemento eliminado');
    return;
  }

  const entry = cart.find((e) => e.cartId === cartId);
  if (!entry?.config.supplements) return;
  entry.config.supplements = entry.config.supplements.filter((s) => s !== supplementId);
  recalculateEntryPrice(entry);
  updateCartUI();
  showToast('Suplemento eliminado');
}

function syncCartFromOrder(order) {
  cart = order.items.map((item) => ({
    cartId: item.cartId,
    itemId: item.itemId,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    config: normalizeConfig(item.config || {}),
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  }));
  updateCartUI();
}

function renderSupplementTags(entry, orderId = null) {
  const supplements = entry.config?.supplements || [];
  if (supplements.length === 0) return '';

  return `
    <div class="flex flex-wrap gap-1.5 mt-2">
      ${supplements.map((id) => {
        const sup = SUPPLEMENTS.find((s) => s.id === id);
        return `
          <span class="inline-flex items-center gap-1 text-xs font-medium bg-kebab-100 text-kebab-800 pl-2.5 pr-1.5 py-1 rounded-full">
            +${sup?.label || id}
            <button type="button"
              data-rm-supplement="${id}"
              data-cart-id="${entry.cartId}"
              data-order-id="${orderId || ''}"
              class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-kebab-200 text-kebab-900 font-bold leading-none"
              aria-label="Quitar ${sup?.label || id}">×</button>
          </span>`;
      }).join('')}
    </div>`;
}

function bindSupplementControls(container) {
  container.querySelectorAll('[data-add-supplement]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId || null;
      openSupplementPicker(btn.dataset.addSupplement, orderId === '' ? null : orderId);
    });
  });
  container.querySelectorAll('[data-rm-supplement]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId || null;
      removeSupplementFromItem(
        btn.dataset.cartId,
        btn.dataset.rmSupplement,
        orderId === '' ? null : orderId
      );
    });
  });
}

/* ============================================================
   ORDER SUBMISSION & EDITING
   ============================================================ */

function resetCheckoutForm() {
  dom.customerName.value = '';
  selectedTable = null;
  orderType = 'dine-in';
  $$('.table-btn').forEach((b) => b.classList.remove('selected'));
  setOrderType('dine-in');
}

function setOrderType(type) {
  orderType = type;
  $$('.order-type-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  $('#section-table').classList.toggle('hidden', type !== 'dine-in');
  $('#section-name').classList.toggle('hidden', type !== 'takeaway');
  if (type === 'dine-in') {
    dom.customerName.value = '';
  } else {
    selectedTable = null;
    $$('.table-btn').forEach((b) => b.classList.remove('selected'));
  }
}

function validateOrderMetadata() {
  if (orderType === 'dine-in') {
    if (!selectedTable) {
      showToast('Selecciona una mesa');
      return false;
    }
    return true;
  }
  const name = dom.customerName.value.trim();
  if (!name) {
    showToast('Introduce el nombre del cliente');
    dom.customerName.focus();
    return false;
  }
  return true;
}

function buildOrderFromCart(metadata) {
  return {
    id: generateId(),
    orderType: metadata.orderType,
    customerName: metadata.orderType === 'takeaway' ? metadata.customerName : null,
    table: metadata.orderType === 'dine-in' ? metadata.table : null,
    items: cart.map(buildOrderItem),
    total: getCartTotal(),
    itemCount: getCartItemCount(),
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function submitOrder() {
  if (cart.length === 0) {
    showToast('El carrito está vacío');
    return;
  }

  if (editingOrderId) {
    saveEditedOrder();
    return;
  }

  if (!validateOrderMetadata()) return;

  const order = buildOrderFromCart({
    orderType,
    customerName: dom.customerName.value.trim(),
    table: selectedTable,
  });

  orders.unshift(order);
  saveOrders();

  const label = getOrderLabel(order);
  clearCart();
  closeCheckout();
  closeSheet(dom.cartSheet, dom.cartSheetOverlay);
  resetCheckoutForm();
  renderActiveOrders();
  renderHistory();
  showToast(`Pedido enviado — ${label}`);
}

function loadOrderForEditing(orderId) {
  const order = getOrderById(orderId);
  if (!order || order.status !== 'active') {
    showToast('Pedido no encontrado');
    return;
  }

  editingOrderId = orderId;
  cart = order.items.map((item) => ({
    cartId: item.cartId || generateId(),
    itemId: item.itemId,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    config: normalizeConfig(item.config || {}),
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  }));

  updateCartUI();
  switchView('menu');
  openSheet(dom.cartSheet, dom.cartSheetOverlay);
  showToast(`Editando ${getOrderLabel(order)}`);
}

function saveEditedOrder() {
  const order = getOrderById(editingOrderId);
  if (!order) {
    showToast('Pedido no encontrado');
    cancelEditing();
    return;
  }

  if (cart.length === 0) {
    showToast('El pedido no puede quedar vacío. Usa "Completar" para cerrarlo.');
    return;
  }

  order.items = cart.map(buildOrderItem);
  recalculateOrderTotals(order);
  saveOrders();

  const label = getOrderLabel(order);
  cancelEditing();
  closeSheet(dom.cartSheet, dom.cartSheetOverlay);
  renderActiveOrders();
  renderHistory();
  showToast(`Cambios guardados — ${label}`);
}

function cancelEditing() {
  editingOrderId = null;
  clearCart();
  updateCartUI();
}

async function completeOrder(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;

  const confirmed = await showConfirm(
    'Completar Pedido',
    `¿Marcar "${getOrderLabel(order)}" como completado?`
  );
  if (!confirmed) return;

  if (editingOrderId === orderId) cancelEditing();

  order.status = 'closed';
  order.updatedAt = new Date().toISOString();
  saveOrders();
  renderActiveOrders();
  renderHistory();
  showToast('Pedido completado');
}

function findMenuItem(itemId) {
  for (const cat of Object.values(MENU)) {
    const item = cat.items.find((i) => i.id === itemId);
    if (item) return item;
  }
  return null;
}

/* ============================================================
   ITEM CUSTOMIZATION SHEET
   ============================================================ */

function getDefaultSize(item) {
  if (!item.sizes) return null;
  if (item.sizeLabels) return 'chupito';
  return 'mediana';
}

function getItemPriceDisplay(item) {
  if (item.sizes) {
    const prices = Object.values(item.sizes);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;
  }
  return formatPrice(item.price);
}

function renderAccordion(id, title, subtitle, content, openByDefault = false) {
  return `
    <div class="border border-stone-200 rounded-xl overflow-hidden">
      <button type="button" class="accordion-toggle w-full flex items-center justify-between p-4 bg-stone-50 active:bg-stone-100 transition-colors text-left" data-accordion="${id}" aria-expanded="${openByDefault}">
        <div>
          <span class="font-semibold text-stone-800">${title}</span>
          ${subtitle ? `<span class="text-stone-400 font-normal text-sm ml-1">${subtitle}</span>` : ''}
        </div>
        <svg class="accordion-chevron w-5 h-5 text-stone-500 transition-transform duration-200 flex-shrink-0 ml-2 ${openByDefault ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="accordion-panel ${openByDefault ? '' : 'hidden'} border-t border-stone-100 px-3 py-3 space-y-2 bg-white">
        ${content}
      </div>
    </div>`;
}

function bindAccordions() {
  $$('.accordion-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const chevron = btn.querySelector('.accordion-chevron');
      const isHidden = panel.classList.contains('hidden');
      panel.classList.toggle('hidden', !isHidden);
      chevron?.classList.toggle('rotate-180', isHidden);
      btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
  });
}

function openItemSheet(item, categoryKey) {
  currentSheetItem = item;
  currentSheetCategoryKey = categoryKey;
  const category = MENU[categoryKey];

  sheetConfig = {
    bread: item.bread ? 'Pita' : null,
    grande: false,
    size: getDefaultSize(item),
    exclusions: [],
    supplements: [],
    menuDrink: null,
    customPrice: null,
  };
  sheetTargetOrder = 'new';

  dom.sheetItemName.textContent = item.name;
  dom.sheetItemCategory.textContent = category.label + (item.description ? ` — ${item.description}` : '');
  renderSheetOptions(item);
  updateSheetPrice();
  updateSheetAddButton();
  openSheet(dom.itemSheet, dom.itemSheetOverlay);
}

function renderSheetOptions(item) {
  let html = '';

  if (item.bread) {
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Tipo de Pan</p>
        <div class="flex gap-2">
          <button type="button" data-bread="Pita" class="bread-btn flex-1 py-3 rounded-xl border-2 font-semibold transition-colors border-kebab-600 bg-kebab-50 text-kebab-700">Pita</button>
          <button type="button" data-bread="Rollo" class="bread-btn flex-1 py-3 rounded-xl border-2 font-semibold transition-colors border-stone-200 text-stone-700">Rollo</button>
        </div>
      </div>`;
  }

  if (item.grande) {
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Tamaño</p>
        <label class="flex items-center justify-between p-4 bg-stone-50 rounded-xl cursor-pointer active:bg-stone-100">
          <div>
            <span class="font-semibold">Grande</span>
            <span class="text-sm text-stone-500 ml-2">+${formatPrice(GRANDE_SURCHARGE)}</span>
          </div>
          <input type="checkbox" id="opt-grande" class="w-6 h-6 accent-kebab-600 rounded">
        </label>
      </div>`;
  }

  if (item.sizes) {
    const labels = item.sizeLabels || { mediana: 'Mediana', grande: 'Grande' };
    const sizeKeys = Object.keys(item.sizes);
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Tamaño</p>
        <div class="flex gap-2">
          ${sizeKeys.map((key, idx) => `
            <button type="button" data-size="${key}" class="size-btn flex-1 py-3 rounded-xl border-2 font-semibold transition-colors ${idx === 0 ? 'border-kebab-600 bg-kebab-50 text-kebab-700' : 'border-stone-200 text-stone-700'}">
              ${labels[key] || key} <span class="text-sm font-normal">${formatPrice(item.sizes[key])}</span>
            </button>
          `).join('')}
        </div>
      </div>`;
  }

  if (item.menuDrink) {
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Bebida incluida <span class="text-red-500">*</span></p>
        <select id="menu-drink" class="w-full border-2 border-stone-200 rounded-xl px-4 py-3.5 text-base font-medium focus:outline-none focus:border-kebab-500 bg-white">
          <option value="">Seleccionar bebida...</option>
          ${MENU_DRINK_OPTIONS.map((d) => `<option value="${d}">${d}</option>`).join('')}
        </select>
        <p class="text-xs text-stone-400 mt-1.5">Incluida en el precio del menú</p>
      </div>`;
  }

  const exclusionsHtml = EXCLUSIONS.map((ex) => `
    <label class="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer active:bg-stone-100">
      <span class="font-medium text-sm">${ex.label}</span>
      <input type="checkbox" data-exclusion="${ex.id}" class="exclusion-check w-5 h-5 accent-kebab-600 rounded">
    </label>
  `).join('');

  const supplementsHtml = SUPPLEMENTS.map((s) => `
    <label class="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer active:bg-stone-100">
      <span class="font-medium text-sm">${s.label}</span>
      <div class="flex items-center gap-2">
        <span class="text-xs text-kebab-600 font-semibold">+${formatPrice(SUPPLEMENT_PRICE)}</span>
        <input type="checkbox" data-supplement="${s.id}" class="supplement-check w-5 h-5 accent-kebab-600 rounded">
      </div>
    </label>
  `).join('');

  html += renderAccordion('quitar', 'Quitar', '(0.00€)', exclusionsHtml, true);
  html += renderAccordion('suplementos', 'Suplementos', `(+${formatPrice(SUPPLEMENT_PRICE)} c/u)`, supplementsHtml, false);

  html += `
    <div>
      <p class="text-sm font-semibold text-stone-700 mb-2">Pedido Destino</p>
      <select id="target-order" class="w-full border-2 border-stone-200 rounded-xl px-4 py-3.5 text-base font-medium focus:outline-none focus:border-kebab-500 bg-white appearance-none">
        <option value="new">Nuevo Pedido (carrito)</option>
        ${getActiveOrders().map((o) => `
          <option value="${o.id}">${getOrderLabel(o)} — ${formatPrice(o.total)}</option>
        `).join('')}
      </select>
    </div>`;

  dom.sheetBody.innerHTML = html;
  bindSheetEvents(item);
  bindAccordions();

  const targetSelect = $('#target-order');
  if (targetSelect) {
    targetSelect.value = sheetTargetOrder;
    targetSelect.addEventListener('change', () => {
      sheetTargetOrder = targetSelect.value;
      updateSheetAddButton();
    });
  }
}

function updateSheetAddButton() {
  const btn = $('#sheet-add-btn');
  if (!btn) return;
  if (sheetTargetOrder === 'new') {
    btn.textContent = 'Añadir al Carrito';
  } else {
    const order = getOrderById(sheetTargetOrder);
    btn.textContent = order ? `Añadir a ${getOrderLabel(order)}` : 'Añadir al Pedido';
  }
}

function bindSheetEvents(item) {
  $$('.bread-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sheetConfig.bread = btn.dataset.bread;
      $$('.bread-btn').forEach((b) => {
        const active = b.dataset.bread === sheetConfig.bread;
        b.classList.toggle('border-kebab-600', active);
        b.classList.toggle('bg-kebab-50', active);
        b.classList.toggle('text-kebab-700', active);
        b.classList.toggle('border-stone-200', !active);
        b.classList.toggle('text-stone-700', !active);
      });
      updateSheetPrice();
    });
  });

  const grandeCheck = $('#opt-grande');
  if (grandeCheck) {
    grandeCheck.addEventListener('change', () => {
      sheetConfig.grande = grandeCheck.checked;
      updateSheetPrice();
    });
  }

  $$('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sheetConfig.size = btn.dataset.size;
      $$('.size-btn').forEach((b) => {
        const active = b.dataset.size === sheetConfig.size;
        b.classList.toggle('border-kebab-600', active);
        b.classList.toggle('bg-kebab-50', active);
        b.classList.toggle('text-kebab-700', active);
        b.classList.toggle('border-stone-200', !active);
        b.classList.toggle('text-stone-700', !active);
      });
      updateSheetPrice();
    });
  });

  const priceInput = $('#opt-price');
  if (priceInput) {
    priceInput.addEventListener('input', () => {
      const val = parseFloat(priceInput.value);
      sheetConfig.customPrice = isNaN(val) ? 0 : val;
      updateSheetPrice();
    });
  }

  const menuDrinkSelect = $('#menu-drink');
  if (menuDrinkSelect) {
    menuDrinkSelect.addEventListener('change', () => {
      sheetConfig.menuDrink = menuDrinkSelect.value || null;
    });
  }

  $$('.exclusion-check').forEach((check) => {
    check.addEventListener('change', () => {
      const id = check.dataset.exclusion;
      if (check.checked) {
        if (!sheetConfig.exclusions.includes(id)) sheetConfig.exclusions.push(id);
      } else {
        sheetConfig.exclusions = sheetConfig.exclusions.filter((e) => e !== id);
      }
    });
  });

  $$('.supplement-check').forEach((check) => {
    check.addEventListener('change', () => {
      const id = check.dataset.supplement;
      if (check.checked) {
        if (!sheetConfig.supplements.includes(id)) sheetConfig.supplements.push(id);
      } else {
        sheetConfig.supplements = sheetConfig.supplements.filter((s) => s !== id);
      }
      updateSheetPrice();
    });
  });
}

function updateSheetPrice() {
  if (!currentSheetItem) return;
  dom.sheetPrice.textContent = formatPrice(calculateUnitPrice(currentSheetItem, sheetConfig));
}

function closeItemSheet() {
  closeSheet(dom.itemSheet, dom.itemSheetOverlay);
  currentSheetItem = null;
  currentSheetCategoryKey = null;
  sheetTargetOrder = 'new';
}

/* ============================================================
   RENDERING
   ============================================================ */

function renderCategoryTabs() {
  dom.categoryTabs.innerHTML = Object.entries(MENU).map(([key, cat]) => `
    <button type="button" data-category="${key}"
      class="category-tab flex-shrink-0 px-4 py-2.5 rounded-full border-2 text-sm font-semibold whitespace-nowrap transition-colors ${key === activeCategory ? 'active' : ''}">
      ${cat.icon} ${cat.label}
    </button>
  `).join('');

  dom.categoryTabs.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderCategoryTabs();
      renderMenuItems();
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

function renderMenuItems() {
  const category = MENU[activeCategory];
  dom.menuItems.innerHTML = category.items.map((item) => {
    const priceDisplay = getItemPriceDisplay(item);

    return `
      <button type="button" data-item-id="${item.id}" data-category="${activeCategory}"
        class="menu-item w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between active:bg-stone-50 transition-colors text-left">
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-stone-900 text-base">${item.name}</p>
          ${item.description ? `<p class="text-xs text-stone-400 mt-0.5">${item.description}</p>` : ''}
        </div>
        <span class="text-kebab-700 font-bold text-base ml-3 flex-shrink-0">${priceDisplay}</span>
      </button>`;
  }).join('');

  dom.menuItems.querySelectorAll('.menu-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      const item = MENU[cat].items.find((i) => i.id === btn.dataset.itemId);
      if (item) openItemSheet(item, cat);
    });
  });
}

function renderCartItemCard(entry, orderId = null) {
  const menuItem = findMenuItem(entry.itemId);
  const modifierLabel = buildModifierLabel(entry.config, menuItem);

  return `
    <div class="bg-stone-50 rounded-xl p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-stone-900">${entry.name}</p>
          <p class="text-xs text-stone-400">${entry.category}</p>
          ${modifierLabel ? `<p class="text-xs text-stone-500 mt-1">${modifierLabel}</p>` : ''}
          ${renderSupplementTags(entry, orderId)}
        </div>
        <button type="button" data-remove="${entry.cartId}" class="text-red-400 hover:text-red-600 p-1 flex-shrink-0" aria-label="Eliminar">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
      <button type="button"
        data-add-supplement="${entry.cartId}"
        data-order-id="${orderId || ''}"
        class="mt-2 w-full py-2.5 border-2 border-dashed border-kebab-300 text-kebab-700 font-semibold text-sm rounded-xl hover:bg-kebab-50 active:bg-kebab-100 transition-colors">
        + Añadir Suplemento (+1.00€)
      </button>
      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center gap-3">
          <button type="button" data-qty-minus="${entry.cartId}" class="w-9 h-9 rounded-full bg-white border-2 border-stone-200 font-bold text-lg flex items-center justify-center active:bg-stone-100">−</button>
          <span class="font-bold text-lg w-6 text-center">${entry.quantity}</span>
          <button type="button" data-qty-plus="${entry.cartId}" class="w-9 h-9 rounded-full bg-kebab-600 text-white font-bold text-lg flex items-center justify-center active:bg-kebab-700">+</button>
        </div>
        <span class="font-bold text-kebab-700 text-lg">${formatPrice(entry.totalPrice)}</span>
      </div>
    </div>`;
}

function renderCartItems() {
  if (cart.length === 0) {
    dom.cartItems.innerHTML = '';
    dom.cartEmpty.classList.remove('hidden');
    dom.cartFooter.classList.add('hidden');
    return;
  }

  dom.cartEmpty.classList.add('hidden');
  dom.cartFooter.classList.remove('hidden');

  dom.cartItems.innerHTML = cart.map((entry) => renderCartItemCard(entry)).join('');

  dom.cartItems.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });
  dom.cartItems.querySelectorAll('[data-qty-minus]').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.qtyMinus, -1));
  });
  dom.cartItems.querySelectorAll('[data-qty-plus]').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.qtyPlus, 1));
  });
  bindSupplementControls(dom.cartItems);
}

function updateCartUI() {
  const count = getCartItemCount();
  const total = getCartTotal();

  dom.cartCount.textContent = count;
  dom.cartTotalBar.textContent = formatPrice(total);
  dom.cartTotal.textContent = formatPrice(total);

  const isEditing = !!editingOrderId;
  dom.editingBanner.classList.toggle('hidden', !isEditing);
  $('#btn-checkout').classList.toggle('hidden', isEditing);
  $('#btn-save-edit').classList.toggle('hidden', !isEditing);

  if (isEditing) {
    const order = getOrderById(editingOrderId);
    dom.editingLabel.textContent = order ? getOrderLabel(order) : '';
  }

  if (count > 0 || isEditing) {
    dom.cartBar.classList.remove('hidden');
  } else {
    dom.cartBar.classList.add('hidden');
  }

  renderCartItems();
}

function renderOrderCard(order, { showActions = false } = {}) {
  const date = new Date(order.updatedAt || order.createdAt);
  const timeStr = date.toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });

  const itemsHtml = order.items.map((item) => {
    if (showActions) {
      const menuItem = findMenuItem(item.itemId);
      const modifierLabel = buildModifierLabel(item.config || {}, menuItem);
      return `
        <div class="py-2 border-b border-stone-100 last:border-0">
          <div class="flex justify-between text-sm gap-2">
            <div class="flex-1 min-w-0">
              <span class="font-medium">${item.quantity}x ${item.name}</span>
              ${modifierLabel ? `<span class="text-xs text-stone-500 block mt-0.5">${modifierLabel}</span>` : ''}
              ${renderSupplementTags(item, order.id)}
            </div>
            <span class="text-stone-600 flex-shrink-0 font-medium pt-0.5">${formatPrice(item.totalPrice)}</span>
          </div>
          <button type="button"
            data-add-supplement="${item.cartId}"
            data-order-id="${order.id}"
            class="mt-2 w-full py-2 border-2 border-dashed border-kebab-300 text-kebab-700 font-semibold text-xs rounded-lg hover:bg-kebab-50 active:bg-kebab-100 transition-colors">
            + Añadir Suplemento (+1.00€)
          </button>
        </div>`;
    }

    return `
      <div class="flex justify-between text-sm py-1.5 border-b border-stone-100 last:border-0">
        <div class="flex-1 min-w-0 pr-2">
          <span class="font-medium">${item.quantity}x ${item.name}</span>
          ${item.configLabel ? `<span class="text-xs text-kebab-600 block mt-0.5">${item.configLabel}</span>` : ''}
        </div>
        <span class="text-stone-600 flex-shrink-0 font-medium">${formatPrice(item.totalPrice)}</span>
      </div>`;
  }).join('');

  const statusBadge = order.status === 'active'
    ? '<span class="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Activo</span>'
    : '<span class="text-xs font-semibold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">Completado</span>';

  const actionsHtml = showActions ? `
    <div class="flex gap-2 mt-3 pt-3 border-t border-stone-100">
      <button type="button" data-edit-order="${order.id}" class="flex-1 bg-kebab-600 hover:bg-kebab-700 active:bg-kebab-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
        Editar Pedido
      </button>
      <button type="button" data-complete-order="${order.id}" class="flex-1 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-semibold py-3 rounded-xl text-sm transition-colors">
        Completar
      </button>
    </div>
  ` : '';

  return `
    <div class="bg-white rounded-2xl shadow-sm p-4">
      <div class="flex items-start justify-between mb-1">
        <div>
          <p class="font-bold text-stone-900 text-lg">${getOrderLabel(order)}</p>
          <p class="text-xs text-stone-400 mt-0.5">${timeStr}</p>
        </div>
        <div class="text-right flex-shrink-0 ml-2">
          <span class="text-lg font-bold text-kebab-700">${formatPrice(order.total)}</span>
          <div class="mt-1">${statusBadge}</div>
        </div>
      </div>
      <div class="bg-stone-50 rounded-xl p-3 mt-2">
        ${itemsHtml}
      </div>
      ${actionsHtml}
    </div>`;
}

function renderActiveOrders() {
  const active = getActiveOrders();
  dom.activeOrdersCount.textContent = active.length;

  if (active.length === 0) {
    dom.activeOrdersList.innerHTML = '';
    dom.activeOrdersEmpty.classList.remove('hidden');
    return;
  }

  dom.activeOrdersEmpty.classList.add('hidden');
  dom.activeOrdersList.innerHTML = active.map((order) =>
    renderOrderCard(order, { showActions: true })
  ).join('');

  dom.activeOrdersList.querySelectorAll('[data-edit-order]').forEach((btn) => {
    btn.addEventListener('click', () => loadOrderForEditing(btn.dataset.editOrder));
  });
  dom.activeOrdersList.querySelectorAll('[data-complete-order]').forEach((btn) => {
    btn.addEventListener('click', () => completeOrder(btn.dataset.completeOrder));
  });
  bindSupplementControls(dom.activeOrdersList);
}

function renderHistory() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  dom.ordersCount.textContent = orders.length;
  dom.ordersRevenue.textContent = formatPrice(totalRevenue);

  if (orders.length === 0) {
    dom.ordersList.innerHTML = '';
    dom.ordersEmpty.classList.remove('hidden');
    return;
  }

  dom.ordersEmpty.classList.add('hidden');
  dom.ordersList.innerHTML = orders.map((order) => renderOrderCard(order)).join('');
}

function switchView(view) {
  activeView = view;
  $('#view-menu').classList.toggle('hidden', view !== 'menu');
  $('#view-active').classList.toggle('hidden', view !== 'active');
  $('#view-history').classList.toggle('hidden', view !== 'history');

  const subtitles = {
    menu: 'Menú activo',
    active: 'Comandas activas',
    history: 'Historial de pedidos',
  };
  $('#header-subtitle').textContent = subtitles[view] || '';

  $$('.nav-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });

  if (view === 'active') renderActiveOrders();
  if (view === 'history') renderHistory();
}

/* ============================================================
   CHECKOUT
   ============================================================ */

function openCheckout() {
  if (cart.length === 0) {
    showToast('El carrito está vacío');
    return;
  }
  if (editingOrderId) {
    saveEditedOrder();
    return;
  }
  dom.checkoutItemsCount.textContent = getCartItemCount();
  dom.checkoutTotal.textContent = formatPrice(getCartTotal());
  dom.checkoutOverlay.classList.remove('hidden');
}

function closeCheckout() {
  dom.checkoutOverlay.classList.add('hidden');
}

/* ============================================================
   EVENT BINDINGS
   ============================================================ */

function bindEvents() {
  $$('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  $('#sheet-close').addEventListener('click', closeItemSheet);
  dom.itemSheetOverlay.addEventListener('click', closeItemSheet);

  $('#sheet-add-btn').addEventListener('click', () => {
    if (!currentSheetItem || !currentSheetCategoryKey) return;

    if (currentSheetItem.menuDrink) {
      const drinkVal = $('#menu-drink')?.value || sheetConfig.menuDrink;
      if (!drinkVal) {
        showToast('Selecciona una bebida para el menú');
        $('#menu-drink')?.focus();
        return;
      }
      sheetConfig.menuDrink = drinkVal;
    }

    const config = normalizeConfig({ ...sheetConfig });
    const target = $('#target-order') ? $('#target-order').value : sheetTargetOrder;

    if (target && target !== 'new') {
      appendItemToOrder(target, currentSheetItem, currentSheetCategoryKey, config);
    } else {
      addToCart(currentSheetItem, currentSheetCategoryKey, config);
    }
    closeItemSheet();
  });

  $('#btn-open-cart').addEventListener('click', () => {
    renderCartItems();
    openSheet(dom.cartSheet, dom.cartSheetOverlay);
  });

  $('#cart-close').addEventListener('click', () => closeSheet(dom.cartSheet, dom.cartSheetOverlay));
  dom.cartSheetOverlay.addEventListener('click', () => closeSheet(dom.cartSheet, dom.cartSheetOverlay));

  $('#btn-checkout').addEventListener('click', () => {
    closeSheet(dom.cartSheet, dom.cartSheetOverlay);
    openCheckout();
  });

  $('#btn-save-edit').addEventListener('click', saveEditedOrder);
  $('#btn-cancel-edit').addEventListener('click', () => {
    cancelEditing();
    closeSheet(dom.cartSheet, dom.cartSheetOverlay);
    showToast('Edición cancelada');
  });

  $('#checkout-close').addEventListener('click', closeCheckout);
  dom.checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === dom.checkoutOverlay) closeCheckout();
  });

  $$('.order-type-btn').forEach((btn) => {
    btn.addEventListener('click', () => setOrderType(btn.dataset.type));
  });

  $$('.table-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedTable = btn.dataset.table;
      $$('.table-btn').forEach((b) => b.classList.toggle('selected', b === btn));
    });
  });

  $('#btn-submit-order').addEventListener('click', submitOrder);

  $('#btn-export').addEventListener('click', exportOrders);
  $('#btn-clear').addEventListener('click', clearHistory);

  $('#supplement-close').addEventListener('click', closeSupplementPicker);
  dom.supplementOverlay.addEventListener('click', (e) => {
    if (e.target === dom.supplementOverlay) closeSupplementPicker();
  });
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  loadOrders();
  setOrderType('dine-in');
  renderCategoryTabs();
  renderMenuItems();
  updateCartUI();
  renderActiveOrders();
  renderHistory();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
