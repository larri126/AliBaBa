/* ============================================================
   KEBAB POS — Serverless Mobile Point of Sale
   ============================================================ */

const STORAGE_KEY = 'kebab_pos_orders';
const GRANDE_SURCHARGE = 1.50;
const SUPPLEMENT_PRICE = 1.00;
const DEFAULT_DRINK_PRICE = 1.50;

const SUPPLEMENTS = [
  { id: 'queso', label: 'Queso' },
  { id: 'patatas', label: 'Patatas' },
  { id: 'salsa_kebab', label: 'Salsa Kebab' },
  { id: 'salsa_bbq', label: 'Salsa BBQ' },
  { id: 'arroz', label: 'Arroz' },
  { id: 'carne_extra', label: 'Carne Extra' },
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
      { id: 'menu_1', name: 'Menú 1', price: 8.00, description: '1 Kebab', grande: true },
      { id: 'menu_2', name: 'Menú 2', price: 14.00, description: '2 Kebabs', grande: true },
      { id: 'menu_3', name: 'Menú 3', price: 8.00, description: '1 Kebab Falafel', grande: true },
      { id: 'menu_4', name: 'Menú 4', price: 9.00, description: '6 Alitas + Arroz' },
      { id: 'menu_5', name: 'Menú 5', price: 9.00, description: '8 Nuggets + Arroz' },
      { id: 'menu_6', name: 'Menú 6', price: 9.00, description: '1 Burger' },
    ],
  },
  drinks: {
    label: 'Bebidas',
    icon: '🥤',
    items: [
      { id: 'drink_coca', name: 'Coca-Cola Normal', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_coca_zero', name: 'Coca-Cola Zero', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_nestea_maracuya', name: 'Nestea Maracuyá', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_nestea_frutos', name: 'Nestea Frutos Rojos', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_agua_pequena', name: 'Agua Pequeña', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_agua_grande', name: 'Agua Grande', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_heineken', name: 'Heineken', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_latas', name: 'Latas', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_tercios', name: 'Tercios', price: DEFAULT_DRINK_PRICE, editable: true },
      { id: 'drink_litros', name: 'Litros', price: DEFAULT_DRINK_PRICE, editable: true },
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
let selectedTable = null;
let currentSheetItem = null;
let sheetConfig = {};

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
  } catch {
    orders = [];
  }
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
    renderHistory();
    showToast('Historial eliminado');
  }
}

/* ============================================================
   PRICE CALCULATION
   ============================================================ */

function calculateItemPrice(item, config) {
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

  if (config.supplements && config.supplements.length > 0) {
    price += config.supplements.length * SUPPLEMENT_PRICE;
  }

  return price;
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

function addToCart(item, categoryKey, config) {
  const unitPrice = calculateItemPrice(item, config);
  const cartId = generateId();

  cart.push({
    cartId,
    itemId: item.id,
    name: item.name,
    category: MENU[categoryKey].label,
    quantity: 1,
    config: { ...config },
    unitPrice,
    totalPrice: unitPrice,
  });

  updateCartUI();
  showToast(`${item.name} añadido al carrito`);
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
  entry.totalPrice = entry.unitPrice * entry.quantity;
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function buildConfigLabel(config, item) {
  const parts = [];

  if (config.bread) parts.push(config.bread);
  if (config.grande && item.grande) parts.push('Grande');
  if (config.size && item.sizes) {
    parts.push(config.size === 'grande' ? 'Grande' : 'Mediana');
  }
  if (config.supplements && config.supplements.length > 0) {
    const labels = config.supplements.map((id) => {
      const sup = SUPPLEMENTS.find((s) => s.id === id);
      return sup ? sup.label : id;
    });
    parts.push('+' + labels.join(', '));
  }

  return parts.length > 0 ? parts.join(' · ') : null;
}

/* ============================================================
   ORDER SUBMISSION
   ============================================================ */

function submitOrder() {
  const customerName = dom.customerName.value.trim();
  if (!customerName) {
    showToast('Introduce el nombre del cliente');
    dom.customerName.focus();
    return;
  }
  if (!selectedTable) {
    showToast('Selecciona una mesa');
    return;
  }
  if (cart.length === 0) {
    showToast('El carrito está vacío');
    return;
  }

  const order = {
    id: generateId(),
    customerName,
    table: selectedTable,
    items: cart.map((e) => ({
      name: e.name,
      category: e.category,
      quantity: e.quantity,
      unitPrice: e.unitPrice,
      totalPrice: e.totalPrice,
      config: e.config,
      configLabel: buildConfigLabel(e.config, findMenuItem(e.itemId)),
    })),
    total: getCartTotal(),
    itemCount: getCartItemCount(),
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);
  saveOrders();

  const tableDisplay = order.table === 'Takeaway' ? 'Para Llevar' : order.table;

  clearCart();
  closeCheckout();
  closeSheet(dom.cartSheet, dom.cartSheetOverlay);
  dom.customerName.value = '';
  selectedTable = null;
  $$('.table-btn').forEach((b) => b.classList.remove('selected'));

  renderHistory();
  showToast(`Pedido enviado — Mesa ${tableDisplay}`);
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

function openItemSheet(item, categoryKey) {
  currentSheetItem = item;
  const category = MENU[categoryKey];

  sheetConfig = {
    bread: item.bread ? 'Pita' : null,
    grande: false,
    size: item.sizes ? 'mediana' : null,
    supplements: [],
    customPrice: item.editable ? item.price : null,
  };

  dom.sheetItemName.textContent = item.name;
  dom.sheetItemCategory.textContent = category.label + (item.description ? ` — ${item.description}` : '');
  renderSheetOptions(item);
  updateSheetPrice();
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
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Tamaño</p>
        <div class="flex gap-2">
          <button type="button" data-size="mediana" class="size-btn flex-1 py-3 rounded-xl border-2 font-semibold transition-colors border-kebab-600 bg-kebab-50 text-kebab-700">
            Mediana <span class="text-sm font-normal">${formatPrice(item.sizes.mediana)}</span>
          </button>
          <button type="button" data-size="grande" class="size-btn flex-1 py-3 rounded-xl border-2 font-semibold transition-colors border-stone-200 text-stone-700">
            Grande <span class="text-sm font-normal">${formatPrice(item.sizes.grande)}</span>
          </button>
        </div>
      </div>`;
  }

  if (item.editable) {
    html += `
      <div>
        <p class="text-sm font-semibold text-stone-700 mb-2">Precio</p>
        <div class="flex items-center gap-3">
          <input type="number" id="opt-price" step="0.10" min="0" value="${item.price.toFixed(2)}"
            class="flex-1 border-2 border-stone-200 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-kebab-500">
          <span class="text-stone-500 font-medium">€</span>
        </div>
      </div>`;
  }

  html += `
    <div>
      <p class="text-sm font-semibold text-stone-700 mb-2">Suplementos <span class="font-normal text-stone-400">(+${formatPrice(SUPPLEMENT_PRICE)} c/u)</span></p>
      <div class="space-y-2">
        ${SUPPLEMENTS.map((s) => `
          <label class="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl cursor-pointer active:bg-stone-100">
            <span class="font-medium">${s.label}</span>
            <input type="checkbox" data-supplement="${s.id}" class="supplement-check w-5 h-5 accent-kebab-600 rounded">
          </label>
        `).join('')}
      </div>
    </div>`;

  dom.sheetBody.innerHTML = html;
  bindSheetEvents(item);
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
  dom.sheetPrice.textContent = formatPrice(calculateItemPrice(currentSheetItem, sheetConfig));
}

function closeItemSheet() {
  closeSheet(dom.itemSheet, dom.itemSheetOverlay);
  currentSheetItem = null;
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
    const priceDisplay = item.sizes
      ? `${formatPrice(item.sizes.mediana)} – ${formatPrice(item.sizes.grande)}`
      : formatPrice(item.price);

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

function renderCartItems() {
  if (cart.length === 0) {
    dom.cartItems.innerHTML = '';
    dom.cartEmpty.classList.remove('hidden');
    dom.cartFooter.classList.add('hidden');
    return;
  }

  dom.cartEmpty.classList.add('hidden');
  dom.cartFooter.classList.remove('hidden');

  dom.cartItems.innerHTML = cart.map((entry) => {
    const menuItem = findMenuItem(entry.itemId);
    const configLabel = buildConfigLabel(entry.config, menuItem);

    return `
      <div class="bg-stone-50 rounded-xl p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-stone-900">${entry.name}</p>
            <p class="text-xs text-stone-400">${entry.category}</p>
            ${configLabel ? `<p class="text-xs text-kebab-600 mt-1">${configLabel}</p>` : ''}
          </div>
          <button type="button" data-remove="${entry.cartId}" class="text-red-400 hover:text-red-600 p-1 flex-shrink-0" aria-label="Eliminar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center gap-3">
            <button type="button" data-qty-minus="${entry.cartId}" class="w-9 h-9 rounded-full bg-white border-2 border-stone-200 font-bold text-lg flex items-center justify-center active:bg-stone-100">−</button>
            <span class="font-bold text-lg w-6 text-center">${entry.quantity}</span>
            <button type="button" data-qty-plus="${entry.cartId}" class="w-9 h-9 rounded-full bg-kebab-600 text-white font-bold text-lg flex items-center justify-center active:bg-kebab-700">+</button>
          </div>
          <span class="font-bold text-kebab-700 text-lg">${formatPrice(entry.totalPrice)}</span>
        </div>
      </div>`;
  }).join('');

  dom.cartItems.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });
  dom.cartItems.querySelectorAll('[data-qty-minus]').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.qtyMinus, -1));
  });
  dom.cartItems.querySelectorAll('[data-qty-plus]').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.qtyPlus, 1));
  });
}

function updateCartUI() {
  const count = getCartItemCount();
  const total = getCartTotal();

  dom.cartCount.textContent = count;
  dom.cartTotalBar.textContent = formatPrice(total);
  dom.cartTotal.textContent = formatPrice(total);

  if (count > 0) {
    dom.cartBar.classList.remove('hidden');
  } else {
    dom.cartBar.classList.add('hidden');
  }

  renderCartItems();
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

  dom.ordersList.innerHTML = orders.map((order) => {
    const date = new Date(order.createdAt);
    const timeStr = date.toLocaleString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    const itemsHtml = order.items.map((item) => `
      <div class="flex justify-between text-sm py-1 border-b border-stone-100 last:border-0">
        <div class="flex-1 min-w-0 pr-2">
          <span class="font-medium">${item.quantity}x ${item.name}</span>
          ${item.configLabel ? `<span class="text-xs text-stone-400 block">${item.configLabel}</span>` : ''}
        </div>
        <span class="text-stone-600 flex-shrink-0">${formatPrice(item.totalPrice)}</span>
      </div>
    `).join('');

    return `
      <div class="bg-white rounded-2xl shadow-sm p-4">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-bold text-stone-900">${order.customerName}</p>
            <p class="text-sm text-stone-500">Mesa ${order.table === 'Takeaway' ? 'Para Llevar' : order.table}</p>
          </div>
          <span class="text-lg font-bold text-kebab-700">${formatPrice(order.total)}</span>
        </div>
        <p class="text-xs text-stone-400 mb-2">${timeStr}</p>
        <div class="bg-stone-50 rounded-xl p-3 mt-2">
          ${itemsHtml}
        </div>
      </div>`;
  }).join('');
}

function switchView(view) {
  activeView = view;
  $('#view-menu').classList.toggle('hidden', view !== 'menu');
  $('#view-history').classList.toggle('hidden', view !== 'history');
  $('#header-subtitle').textContent = view === 'menu' ? 'Menú activo' : 'Historial de pedidos';

  $$('.nav-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });

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
    if (!currentSheetItem) return;
    const catKey = Object.keys(MENU).find((k) =>
      MENU[k].items.some((i) => i.id === currentSheetItem.id)
    );
    addToCart(currentSheetItem, catKey, { ...sheetConfig, supplements: [...sheetConfig.supplements] });
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

  $('#checkout-close').addEventListener('click', closeCheckout);
  dom.checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === dom.checkoutOverlay) closeCheckout();
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
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  loadOrders();
  renderCategoryTabs();
  renderMenuItems();
  updateCartUI();
  renderHistory();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
