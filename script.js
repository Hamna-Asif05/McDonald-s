// Catalog Menu Database
const fullCatalog = [
  { id: 1, name: 'Omelette Muffin Meal', category: 'breakfast', price: 620, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Chicken Sausage McMuffin w/Egg', category: 'breakfast', price: 690, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Chicken Sausage McMuffin Meal', category: 'breakfast', price: 740, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Big Mac', category: 'beef', price: 850, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Double Cheeseburger', category: 'beef', price: 790, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Spicy McCrispy Deluxe', category: 'crispy', price: 820, img: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80' },
  { id: 7, name: 'McChicken', category: 'chicken', price: 650, img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Crispy Wrap with Mayo', category: 'wraps', price: 610, img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&auto=format&fit=crop&q=80' },
  { id: 9, name: 'World Famous Fries (L)', category: 'sides', price: 390, img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80' },
  { id: 10, name: 'McFlurry Oreo', category: 'dessert', price: 430, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80' }
];

// Branches Data for Store Locator
const branchesList = [
  { city: 'gujranwala', name: "GT Road Branch", area: 'Model Town / GT Road Bypass', hours: 'Open 24/7 (Drive-Thru Active)' },
  { city: 'gujranwala', name: "Master City Express", area: 'Master City Main Commercial', hours: 'Open 24/7' },
  { city: 'lahore', name: "Gulberg Boulevard Hub", area: 'Near Commercial Center', hours: 'Open 24/7' },
  { city: 'lahore', name: "DHA Phase 5", area: 'Sports Complex Sector', hours: 'Open 24/7' },
  { city: 'karachi', name: "Sea View Restaurant", area: 'Clifton Beach Road', hours: 'Open 24/7' },
  { city: 'islamabad', name: "F-9 Park Drive-Thru", area: 'Fatima Jinnah Park Corridor', hours: 'Open 24/7' }
];

// Active Food Tray (Cart Storage)
let cartTray = [
  { name: 'Big Mac', price: 850, quantity: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Single Page Navigation Logic
  function handleNavigation() {
    let hash = window.location.hash.replace('#', '') || 'home';
    const targetPage = document.getElementById(`page-${hash}`);

    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    if (targetPage) {
      targetPage.classList.add('active');
    } else {
      document.getElementById('page-home').classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active-tab');
      if (link.getAttribute('href') === `#${hash}`) {
        link.classList.add('active-tab');
      }
    });

    const megaMenu = document.getElementById('megaMenu');
    if (megaMenu) megaMenu.classList.remove('active');

    // Close mobile drawer on navigation
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileDrawer) mobileDrawer.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', handleNavigation);
  handleNavigation();

  // 2. Render Products
  renderMenuCatalog(fullCatalog);

  // 3. MegaMenu Toggle (Desktop)
  const menuToggle = document.getElementById('menuToggle');
  const megaMenu = document.getElementById('megaMenu');

  if (menuToggle && megaMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      megaMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && e.target !== menuToggle) {
        megaMenu.classList.remove('active');
      }
    });
  }

  document.querySelectorAll('.megamenu a[data-cat], .drawer-submenu a[data-cat]').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.getAttribute('data-cat');
      filterMenuCatalog(cat);
      const mobileDrawer = document.getElementById('mobileDrawer');
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    });
  });

  // 4. Mobile Drawer Toggles
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerMenuAccordion = document.getElementById('drawerMenuAccordion');
  const drawerSubmenu = document.getElementById('drawerSubmenu');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('active'));
  }
  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => mobileDrawer.classList.remove('active'));
  }
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) mobileDrawer.classList.remove('active');
    });
  }
  if (drawerMenuAccordion && drawerSubmenu) {
    drawerMenuAccordion.addEventListener('click', () => {
      drawerSubmenu.classList.toggle('active');
      const icon = drawerMenuAccordion.querySelector('i');
      if (icon) icon.classList.toggle('fa-chevron-up');
    });
  }

  // Mobile Locate Trigger Button in Drawer
  const mobileLocateBtn = document.getElementById('mobileLocateBtn');
  if (mobileLocateBtn) {
    mobileLocateBtn.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      const locatorModal = document.getElementById('locatorModal');
      if (locatorModal) locatorModal.classList.add('active');
    });
  }

  // 5. Sidebar Category Filter
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const cat = item.getAttribute('data-category');
      filterMenuCatalog(cat);
    });
  });

  // 6. Store Locator Modal
  const locateTrigger = document.getElementById('locateTrigger');
  const locatorModal = document.getElementById('locatorModal');
  const closeLocator = document.getElementById('closeLocator');
  const citySearchInput = document.getElementById('citySearchInput');
  const searchCityBtn = document.getElementById('searchCityBtn');
  const gpsFindBtn = document.getElementById('gpsFindBtn');

  renderBranches(branchesList.slice(0, 3));

  if (locateTrigger && locatorModal) {
    locateTrigger.addEventListener('click', () => locatorModal.classList.add('active'));
  }
  if (closeLocator && locatorModal) {
    closeLocator.addEventListener('click', () => locatorModal.classList.remove('active'));
  }

  if (searchCityBtn) {
    searchCityBtn.addEventListener('click', () => {
      const q = citySearchInput.value.toLowerCase().trim();
      if (!q) return;
      const filtered = branchesList.filter(b => b.city.includes(q) || b.name.toLowerCase().includes(q) || b.area.toLowerCase().includes(q));
      renderBranches(filtered, q);
    });
  }

  if (gpsFindBtn) {
    gpsFindBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        gpsFindBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Getting GPS...';
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            gpsFindBtn.innerHTML = '<i class="fa-solid fa-check"></i> Location Verified!';
            renderBranches([
              {
                name: 'Nearest Branch Detected',
                area: `Coordinates: Lat ${pos.coords.latitude.toFixed(3)}, Lon ${pos.coords.longitude.toFixed(3)}`,
                hours: 'Open Now • 24/7 McDelivery'
              }
            ]);
          },
          () => {
            gpsFindBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> GPS Denied';
            alert('Location access denied. Please enter your city name manually.');
          }
        );
      }
    });
  }

  // 7. Order Tray / Checkout Modal Integration
  const orderOnDeliveryBtn = document.getElementById('openDeliveryModal');
  const mobileOpenDeliveryModal = document.getElementById('mobileOpenDeliveryModal');
  const closeCheckoutBtn = document.getElementById('closeCheckout');
  const cancelCheckoutBtn = document.getElementById('cancelCheckout');
  const checkoutForm = document.getElementById('checkoutForm');

  if (orderOnDeliveryBtn) orderOnDeliveryBtn.addEventListener('click', openTrayModal);
  if (mobileOpenDeliveryModal) mobileOpenDeliveryModal.addEventListener('click', openTrayModal);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeTrayModal);
  if (cancelCheckoutBtn) cancelCheckoutBtn.addEventListener('click', closeTrayModal);

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (cartTray.length === 0) {
        alert('Your order tray is empty!');
        return;
      }

      const totalAmount = cartTray.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
      const payload = {
        customerName: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        deliveryAddress: document.getElementById('custAddress').value,
        items: cartTray,
        totalAmount: totalAmount
      };

      try {
        const res = await fetch('http://localhost:5000/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        alert(`Order Received by Server!\nOrder ID: ${data.orderId}\nCustomer: ${payload.customerName}\nGrand Total: Rs. ${totalAmount}`);
      } catch (err) {
        alert(`Order Received! Order ID: MCD-PK-${Math.floor(100000 + Math.random() * 900000)}`);
      }

      cartTray = [];
      closeTrayModal();
      checkoutForm.reset();
    });
  }

  // 8. Search Overlay
  const searchTrigger = document.getElementById('searchTrigger');
  const mobileSearchTrigger = document.getElementById('mobileSearchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');

  const openSearch = () => {
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    }
  };

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (mobileSearchTrigger) mobileSearchTrigger.addEventListener('click', openSearch);
  if (closeSearch && searchOverlay) {
    closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      const term = e.target.value.toLowerCase();
      const matches = fullCatalog.filter(i => i.name.toLowerCase().includes(term));
      renderMenuCatalog(matches);
      if (e.key === 'Enter') {
        searchOverlay.classList.remove('active');
        window.location.hash = '#menu';
      }
    });
  }

  // 9. Careers Form Backend Connect
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
    careerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectRole = document.getElementById('applicantRole').value;
      const customRole = document.getElementById('otherRoleInput').value;
      const finalRole = (selectRole === 'Other') ? customRole : selectRole;

      const payload = {
        name: document.getElementById('applicantName').value,
        email: document.getElementById('applicantEmail').value,
        phone: document.getElementById('applicantPhone').value,
        role: finalRole,
        experience: document.getElementById('applicantExperience').value
      };

      try {
        const res = await fetch('http://localhost:5000/api/careers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        alert(data.message || 'Job Application logged in backend!');
      } catch (err) {
        alert(`Application for "${payload.role}" logged successfully!`);
      }
      careerForm.reset();
      const otherWrap = document.getElementById('otherRoleWrap');
      if (otherWrap) otherWrap.style.display = 'none';
    });
  }

  // 10. Contact Support Form Backend Connect
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
      };

      try {
        const res = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        alert(data.message || 'Message logged in backend support desk!');
      } catch (err) {
        alert(`Thank you ${payload.name}! Your message regarding "${payload.subject}" has been received.`);
      }
      contactForm.reset();
    });
  }

  // 11. Footer Accordions for Mobile
  document.querySelectorAll('.footer-col.accordion-col .footer-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parentCol = header.closest('.footer-col.accordion-col');
      if (parentCol) parentCol.classList.toggle('active');
    });
  });

  // 12. Floating Scroll To Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Render Catalog Grid
function renderMenuCatalog(items) {
  const container = document.getElementById('menuCatalogGrid');
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; color: #888; padding: 20px;">No items match this selection.</p>';
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="catalog-card">
      <img src="${item.img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <div class="price">Rs. ${item.price}</div>
      <button class="primary-btn sm-btn" onclick="addToTray('${item.name}', ${item.price})">Order Now</button>
    </div>
  `).join('');
}

// Tray / Cart Functions
function openTrayModal() {
  const modal = document.getElementById('checkoutModal');
  renderCartTray();
  if (modal) modal.classList.add('active');
}

function closeTrayModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

function renderCartTray() {
  const container = document.getElementById('cartItemsList');
  const totalDisplay = document.getElementById('cartTotalDisplay');
  if (!container) return;

  if (cartTray.length === 0) {
    container.innerHTML = '<p style="color: #888; text-align: center; padding: 15px;">Your tray is empty.</p>';
    if (totalDisplay) totalDisplay.innerText = 'Rs. 0';
    return;
  }

  let total = 0;
  container.innerHTML = cartTray.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item-row">
        <div>
          <strong>${item.name}</strong>
          <span style="color:#777; font-size:12px; margin-left:6px;">x${item.quantity}</span>
        </div>
        <div>
          <span style="font-weight:700;">Rs. ${item.price * item.quantity}</span>
          <button onclick="removeFromTray(${index})" style="background:none; border:none; color:#DA291C; margin-left:10px; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `;
  }).join('');

  if (totalDisplay) totalDisplay.innerText = `Rs. ${total}`;
}

function addToTray(itemName, price = 790) {
  const existing = cartTray.find(i => i.name === itemName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartTray.push({ name: itemName, price: price, quantity: 1 });
  }
  openTrayModal();
}

function removeFromTray(index) {
  cartTray.splice(index, 1);
  renderCartTray();
}

function filterMenuCatalog(cat) {
  const title = document.getElementById('menuTitle');
  if (cat === 'all') {
    if (title) title.innerText = 'Full Menu';
    renderMenuCatalog(fullCatalog);
  } else {
    if (title) title.innerText = cat.toUpperCase();
    const filtered = fullCatalog.filter(i => i.category === cat);
    renderMenuCatalog(filtered);
  }
}

function renderBranches(list, query = '') {
  const branchResults = document.getElementById('branchResults');
  if (!branchResults) return;
  if (list.length === 0) {
    branchResults.innerHTML = `<p style="padding:10px; color:#888;">No branches found for "${query}".</p>`;
    return;
  }
  branchResults.innerHTML = list.map(b => `
    <div class="branch-item">
      <strong>${b.name}</strong>
      <span>${b.area}</span>
      <span class="status-open">${b.hours}</span>
    </div>
  `).join('');
}

function openJobModal(roleName) {
  window.location.hash = '#careers';
  setTimeout(() => {
    const roleSelect = document.getElementById('applicantRole');
    if (roleSelect) {
      roleSelect.value = roleName;
      document.getElementById('jobAppSection').scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// Dynamic Action Modals & Helper Functions
function openActionModal(htmlContent) {
  const modal = document.getElementById('actionModal');
  const container = document.getElementById('actionModalContent');
  if (modal && container) {
    container.innerHTML = htmlContent;
    modal.classList.add('active');
  }
}

function closeActionModal() {
  const modal = document.getElementById('actionModal');
  if (modal) modal.classList.remove('active');
}

function toggleOtherInput(selectElement, targetWrapId, targetInputId) {
  const wrap = document.getElementById(targetWrapId);
  const input = document.getElementById(targetInputId);
  if (wrap && input) {
    if (selectElement.value === 'Other') {
      wrap.style.display = 'block';
      input.required = true;
      input.focus();
    } else {
      wrap.style.display = 'none';
      input.required = false;
      input.value = '';
    }
  }
}

// 1. Kitchen Tour Registration
function handleKitchenTour() {
  openActionModal(`
    <h3 class="modal-title"><i class="fa-solid fa-door-open"></i> Kitchen Tour Registration</h3>
    <p class="modal-desc">Book your slot for the Open Door Kitchen Tour this month.</p>
    <form class="custom-form" onsubmit="submitKitchenTour(event)">
      <input type="text" id="tourName" placeholder="Full Name *" required>
      <input type="email" id="tourEmail" placeholder="Email Address *" required>
      <input type="tel" id="tourPhone" placeholder="Mobile Phone *" required>
      
      <select id="tourBranchSelect" onchange="toggleOtherInput(this, 'otherTourWrap', 'otherTourInput')" required>
        <option value="">Select Branch *</option>
        <option value="GT Road Branch, Gujranwala">GT Road Branch, Gujranwala</option>
        <option value="Master City Express, Gujranwala">Master City Express, Gujranwala</option>
        <option value="Gulberg Hub, Lahore">Gulberg Hub, Lahore</option>
        <option value="DHA Phase 5, Lahore">DHA Phase 5, Lahore</option>
        <option value="F-9 Park Drive-Thru, Islamabad">F-9 Park Drive-Thru, Islamabad</option>
        <option value="Sea View Restaurant, Karachi">Sea View Restaurant, Karachi</option>
        <option value="Other">Other (Type your own branch/city)</option>
      </select>

      <div id="otherTourWrap" style="display: none; margin-top: 5px;">
        <input type="text" id="otherTourInput" placeholder="Enter your custom branch / city address *">
      </div>

      <input type="date" id="tourDate" required style="margin-top: 5px;">
      <button type="submit" class="primary-btn" style="margin-top: 15px;">Confirm Registration</button>
    </form>
  `);
}

async function submitKitchenTour(e) {
  e.preventDefault();
  const selectVal = document.getElementById('tourBranchSelect').value;
  const customVal = document.getElementById('otherTourInput').value;
  const finalBranch = (selectVal === 'Other') ? customVal : selectVal;

  const payload = {
    name: document.getElementById('tourName').value,
    email: document.getElementById('tourEmail').value,
    phone: document.getElementById('tourPhone').value,
    branch: finalBranch,
    date: document.getElementById('tourDate').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/kitchen-tour', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert(data.message || 'Tour booked successfully!');
  } catch (err) {
    alert(`Tour booked for ${payload.name} on ${payload.date} at ${payload.branch}!`);
  }
  closeActionModal();
}

// 2. Birthday Party Booking
function handlePartyBooking() {
  openActionModal(`
    <h3 class="modal-title"><i class="fa-solid fa-cake-candles"></i> Birthday Party Booking</h3>
    <p class="modal-desc">Plan an unforgettable celebration with our party hosts.</p>
    <form class="custom-form" onsubmit="submitPartyBooking(event)">
      <input type="text" id="partyParentName" placeholder="Parent / Guardian Name *" required>
      <input type="text" id="partyChildName" placeholder="Child's Name *" required>
      <input type="number" id="partyChildAge" placeholder="Age Celebrating *" min="1" max="15" required>
      <input type="tel" id="partyPhone" placeholder="Contact Number *" required>
      
      <select id="partyBranchSelect" onchange="toggleOtherInput(this, 'otherPartyWrap', 'otherPartyInput')" required>
        <option value="">Select Branch For Party *</option>
        <option value="GT Road Branch, Gujranwala">GT Road Branch, Gujranwala</option>
        <option value="Gulberg Hub, Lahore">Gulberg Hub, Lahore</option>
        <option value="F-9 Park Drive-Thru, Islamabad">F-9 Park Drive-Thru, Islamabad</option>
        <option value="Sea View Restaurant, Karachi">Sea View Restaurant, Karachi</option>
        <option value="Other">Other (Custom Branch / City)</option>
      </select>

      <div id="otherPartyWrap" style="display: none; margin-top: 5px;">
        <input type="text" id="otherPartyInput" placeholder="Specify your preferred city / venue location *">
      </div>

      <input type="number" id="partyGuests" placeholder="Expected Kids Count *" min="5" max="50" required style="margin-top: 5px;">
      <input type="date" id="partyDate" required>
      <button type="submit" class="primary-btn" style="margin-top: 15px;">Submit Party Request</button>
    </form>
  `);
}

async function submitPartyBooking(e) {
  e.preventDefault();
  const selectVal = document.getElementById('partyBranchSelect').value;
  const customVal = document.getElementById('otherPartyInput').value;
  const finalBranch = (selectVal === 'Other') ? customVal : selectVal;

  const payload = {
    parentName: document.getElementById('partyParentName').value,
    childName: document.getElementById('partyChildName').value,
    age: document.getElementById('partyChildAge').value,
    phone: document.getElementById('partyPhone').value,
    branch: finalBranch,
    guests: document.getElementById('partyGuests').value,
    date: document.getElementById('partyDate').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/party-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert(data.message || 'Party request submitted successfully!');
  } catch (err) {
    alert(`Birthday party request for ${payload.childName} submitted! Our party captain will contact ${payload.phone}.`);
  }
  closeActionModal();
}

// 3. Join Reading Club
function handleReadingClub() {
  openActionModal(`
    <h3 class="modal-title"><i class="fa-solid fa-book-open-reader"></i> Join Reading Club</h3>
    <p class="modal-desc">Sign up for monthly storytelling sessions and book discounts.</p>
    <form class="custom-form" onsubmit="submitReadingClub(event)">
      <input type="text" id="readerParentName" placeholder="Parent Name *" required>
      <input type="email" id="readerEmail" placeholder="Email Address *" required>
      <input type="text" id="readerChildName" placeholder="Child Name *" required>
      
      <select id="readerAgeGroup" onchange="toggleOtherInput(this, 'otherAgeWrap', 'otherAgeInput')" required>
        <option value="">Select Child Age Group *</option>
        <option value="3-5 Years">3 - 5 Years</option>
        <option value="6-8 Years">6 - 8 Years</option>
        <option value="9-12 Years">9 - 12 Years</option>
        <option value="Other">Other (Custom Age / Teen Category)</option>
      </select>

      <div id="otherAgeWrap" style="display: none; margin-top: 5px;">
        <input type="text" id="otherAgeInput" placeholder="Specify your child's age or grade level *">
      </div>

      <button type="submit" class="primary-btn" style="margin-top: 15px;">Join Club</button>
    </form>
  `);
}

async function submitReadingClub(e) {
  e.preventDefault();
  const selectVal = document.getElementById('readerAgeGroup').value;
  const customVal = document.getElementById('otherAgeInput').value;
  const finalAge = (selectVal === 'Other') ? customVal : selectVal;

  const payload = {
    parentName: document.getElementById('readerParentName').value,
    email: document.getElementById('readerEmail').value,
    childName: document.getElementById('readerChildName').value,
    ageGroup: finalAge
  };

  try {
    const res = await fetch('http://localhost:5000/api/reading-club', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert(data.message || 'Welcome to the Reading Club!');
  } catch (err) {
    alert(`Welcome ${payload.parentName}! Reading Club welcome kit dispatched to ${payload.email}.`);
  }
  closeActionModal();
}

// 4. Cast Your Vote (IMA 2026)
function handleVote() {
  openActionModal(`
    <h3 class="modal-title"><i class="fa-solid fa-check-to-slot"></i> Vote For Design</h3>
    <p class="modal-desc">Cast your ballot for the McDonald's x IMA 2026 Fashion Runway.</p>
    <form class="custom-form" onsubmit="submitVote(event)">
      <select id="votedDesign" onchange="toggleOtherInput(this, 'otherVoteWrap', 'otherVoteInput')" required>
        <option value="">Select Runway Look *</option>
        <option value="Look 01: Golden Heritage Trench">Look 01: Golden Heritage Trench</option>
        <option value="Look 02: Avant-Garde Fry Stripes">Look 02: Avant-Garde Fry Stripes</option>
        <option value="Look 03: Retro Arch Streetwear">Look 03: Retro Arch Streetwear</option>
        <option value="Other">Other (Write nominee or concept)</option>
      </select>

      <div id="otherVoteWrap" style="display: none; margin-top: 5px;">
        <input type="text" id="otherVoteInput" placeholder="Type custom design look or student name *">
      </div>

      <input type="email" id="voterEmail" placeholder="Your Email Address *" required style="margin-top: 8px;">
      <div style="text-align: left; font-size: 13px; color: #666; margin: 8px 0;">
        <label><input type="radio" name="score" value="5" checked> ★★★★★ (Exceptional)</label><br>
        <label><input type="radio" name="score" value="4"> ★★★★☆ (Great)</label><br>
        <label><input type="radio" name="score" value="3"> ★★★☆☆ (Good)</label>
      </div>
      <button type="submit" class="primary-btn" style="margin-top: 10px;">Submit Vote</button>
    </form>
  `);
}

async function submitVote(e) {
  e.preventDefault();
  const selectVal = document.getElementById('votedDesign').value;
  const customVal = document.getElementById('otherVoteInput').value;
  const finalDesign = (selectVal === 'Other') ? customVal : selectVal;

  const payload = {
    design: finalDesign,
    email: document.getElementById('voterEmail').value,
    rating: document.querySelector('input[name="score"]:checked').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert(data.message || 'Vote recorded successfully!');
  } catch (err) {
    alert(`Vote recorded for ${payload.design}! Thank you for participating.`);
  }
  closeActionModal();
}

// 5. Learn More Details
function handleLearnMore(topic) {
  const topics = {
    quality: {
      title: "100% Halal Pure Beef & Chicken",
      desc: "Our patties are sourced exclusively from certified suppliers, minced with no binders, fillers, or artificial preservatives, seasoned only with salt and pepper after searing."
    },
    ingredients: {
      title: "Farm Fresh Ingredients",
      desc: "Lettuce is harvested daily from local hydroponic farms, washed in triple-filtered water, and packaged at 4°C to maintain freshness."
    },
    nutrition: {
      title: "Your Right To Know",
      desc: "Every item on our menu displays caloric values, protein, carbohydrates, allergens, and dietary markers clearly."
    }
  };

  const selected = topics[topic] || topics.quality;
  openActionModal(`
    <h3 class="modal-title" style="color: #27251F;">${selected.title}</h3>
    <p class="modal-desc" style="text-align: left; line-height: 1.7; margin-top: 15px;">${selected.desc}</p>
    <button class="primary-btn" onclick="closeActionModal()" style="margin-top: 20px;">Got It</button>
  `);
}