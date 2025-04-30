// Sample event data
const events = [
    {
        id: 1,
        title: "Summer Music Festival",
        date: "July 15-17, 2023",
        location: "Central Park, New York",
        price: 149.99,
        image: "img1.jpg"
    },
    {
        id: 2,
        title: "International Jazz Night",
        date: "August 5, 2023",
        location: "Blue Note, Chicago",
        price: 89.99,
        image: "img1.jpg"
    },
    {
        id: 3,
        title: "Broadway Show: Hamilton",
        date: "September 10, 2023",
        location: "Broadway Theater, New York",
        price: 199.99,
        image: "img1.jpg"
    },
    {
        id: 4,
        title: "NBA Finals Game",
        date: "June 12, 2023",
        location: "Madison Square Garden, New York",
        price: 299.99,
        image: "img1.jpg"
    },
    {
        id: 5,
        title: "Stand-up Comedy Night",
        date: "July 22, 2023",
        location: "Comedy Club, Los Angeles",
        price: 49.99,
        image: "img1.jpg"
    },
    {
        id: 6,
        title: "Electronic Dance Festival",
        date: "August 19-20, 2023",
        location: "Sunset Beach, Miami",
        price: 179.99,
        image: "img1.jpg"
    },
    {
        id: 7,
        title: "Rock Concert: Foo Fighters",
        date: "October 5, 2023",
        location: "Arena Stadium, Seattle",
        price: 129.99,
        image: "img1.jpg"
    },
    {
        id: 8,
        title: "Classical Symphony Orchestra",
        date: "November 15, 2023",
        location: "Symphony Hall, Boston",
        price: 109.99,
        image: "img1.jpg"
    }
];

// Cart data
let cart = [];
let totalAmount = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Load events
    loadEvents();
    
    // Event listeners
    setupEventListeners();
});

// Load events into the page
function loadEvents() {
    const featuredContainer = document.getElementById('featured-events-container');
    const upcomingContainer = document.getElementById('upcoming-events-container');
    
    // Featured events (first 4)
    const featuredEvents = events.slice(0, 4);
    featuredContainer.innerHTML = '';
    
    featuredEvents.forEach(event => {
        featuredContainer.appendChild(createEventCard(event));
    });
    
    // Upcoming events (last 4)
    const upcomingEvents = events.slice(4);
    upcomingContainer.innerHTML = '';
    
    upcomingEvents.forEach(event => {
        upcomingContainer.appendChild(createEventCard(event));
    });
}

// Create event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}">
        </div>
        <div class="event-details">
            <div class="event-date">${event.date}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
            <div class="event-price">From $${event.price.toFixed(2)}</div>
            <button class="btn btn-primary buy-ticket" data-id="${event.id}">Buy Tickets</button>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Buy ticket buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-ticket')) {
            const eventId = parseInt(e.target.getAttribute('data-id'));
            openTicketModal(eventId);
        }
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Cart button
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', function() {
        openCartModal();
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        openCheckoutModal();
    });
    
    // Payment form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
    
    // Back to home button
    const backToHomeBtn = document.getElementById('back-to-home');
    backToHomeBtn.addEventListener('click', function() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Reset cart
        cart = [];
        totalAmount = 0;
        updateCartCount();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Open ticket modal
function openTicketModal(eventId) {
    const event = events.find(e => e.id === eventId);
    const modal = document.getElementById('ticket-modal');
    const ticketDetails = document.getElementById('ticket-details');
    
    if (event) {
        ticketDetails.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="ticket-info">
                    <h2>${event.title}</h2>
                    <div class="event-date"><i class="far fa-calendar-alt"></i> ${event.date}</div>
                    <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                </div>
            </div>
            <div class="ticket-description">
                <h3>Event Description</h3>
                <p>Join us for an unforgettable experience at ${event.title}. This event features amazing performances that you won't want to miss!</p>
            </div>
            <div class="ticket-options">
                <h3>Select Tickets</h3>
                <div class="ticket-type">
                    <div class="ticket-type-info">
                        <h4>General Admission</h4>
                        <p>Standard entry, no reserved seating</p>
                    </div>
                    <div class="ticket-type-price">$${event.price.toFixed(2)}</div>
                    <div class="ticket-quantity">
                        <button class="quantity-decrease">-</button>
                        <input type="number" min="0" value="0" class="quantity-input" data-type="general" data-price="${event.price}">
                        <button class="quantity-increase">+</button>
                    </div>
                </div>
                <div class="ticket-type">
                    <div class="ticket-type-info">
                        <h4>VIP Access</h4>
                        <p>Premium seating, exclusive merchandise</p>
                    </div>
                    <div class="ticket-type-price">$${(event.price * 1.5).toFixed(2)}</div>
                    <div class="ticket-quantity">
                        <button class="quantity-decrease">-</button>
                        <input type="number" min="0" value="0" class="quantity-input" data-type="vip" data-price="${event.price * 1.5}">
                        <button class="quantity-increase">+</button>
                    </div>
                </div>
                <div class="ticket-total">
                    <div>Total:</div>
                    <div class="ticket-total-price">$0.00</div>
                </div>
            </div>
            <button class="btn btn-primary btn-block add-to-cart" data-id="${event.id}">Add to Cart</button>
        `;
        
        // Add event listeners for quantity buttons
        const decreaseButtons = ticketDetails.querySelectorAll('.quantity-decrease');
        const increaseButtons = ticketDetails.querySelectorAll('.quantity-increase');
        const quantityInputs = ticketDetails.querySelectorAll('.quantity-input');
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.nextElementSibling;
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                    updateTicketTotal();
                }
            });
        });
        
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                input.value = parseInt(input.value) + 1;
                updateTicketTotal();
            });
        });
        
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (parseInt(this.value) < 0) {
                    this.value = 0;
                }
                updateTicketTotal();
            });
        });
        
        // Add to cart button
        const addToCartBtn = ticketDetails.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            addToCart(event);
        });
        
        modal.style.display = 'block';
    }
}

// Update ticket total
function updateTicketTotal() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    let total = 0;
    
    quantityInputs.forEach(input => {
        const quantity = parseInt(input.value);
        const price = parseFloat(input.getAttribute('data-price'));
        total += quantity * price;
    });
    
    const totalElement = document.querySelector('.ticket-total-price');
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Add to cart
function addToCart(event) {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    let hasTickets = false;
    
    quantityInputs.forEach(input => {
        const quantity = parseInt(input.value);
        const type = input.getAttribute('data-type');
        const price = parseFloat(input.getAttribute('data-price'));
        
        if (quantity > 0) {
            hasTickets = true;
            
            // Check if this ticket type is already in cart
            const existingItem = cart.find(item => 
                item.eventId === event.id && item.ticketType === type
            );
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    eventId: event.id,
                    eventTitle: event.title,
                    eventDate: event.date,
                    eventLocation: event.location,
                    ticketType: type,
                    ticketPrice: price,
                    quantity: quantity
                });
            }
            
            totalAmount += quantity * price;
        }
    });
    
    if (hasTickets) {
        // Close ticket modal
        document.getElementById('ticket-modal').style.display = 'none';
        
        // Update cart count
        updateCartCount();
        
        // Show confirmation message
        alert('Tickets added to cart!');
    } else {
        alert('Please select at least one ticket.');
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    let count = 0;
    
    cart.forEach(item => {
        count += item.quantity;
    });
    
    cartCount.textContent = count;
}

// Open cart modal
function openCartModal() {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    // Clear previous items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('checkout-btn').style.display = 'none';
    } else {
        document.getElementById('checkout-btn').style.display = 'block';
        
        // Add items to cart
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.eventTitle}</h4>
                    <p>${item.eventDate} - ${item.ticketType.charAt(0).toUpperCase() + item.ticketType.slice(1)} Admission</p>
                    <p>${item.quantity} x $${item.ticketPrice.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-price">$${(item.quantity * item.ticketPrice).toFixed(2)}</span>
                    <span class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></span>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners for remove buttons
        const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }
    
    // Update total amount
    cartTotalAmount.textContent = `$${totalAmount.toFixed(2)}`;
    
    modal.style.display = 'block';
}

// Remove from cart
function removeFromCart(index) {
    const item = cart[index];
    totalAmount -= item.quantity * item.ticketPrice;
    
    cart.splice(index, 1);
    updateCartCount();
    openCartModal(); // Refresh cart modal
}

// Open checkout modal
function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotalAmount = document.getElementById('checkout-total-amount');
    
    // Clear previous items
    checkoutItems.innerHTML = '';
    
    // Add items to checkout
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <div>${item.eventTitle} - ${item.ticketType.charAt(0).toUpperCase() + item.ticketType.slice(1)} (${item.quantity})</div>
            <div>$${(item.quantity * item.ticketPrice).toFixed(2)}</div>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
    
    // Update total amount
    checkoutTotalAmount.textContent = `$${totalAmount.toFixed(2)}`;
    
    // Close cart modal
    document.getElementById('cart-modal').style.display = 'none';
    
    // Show checkout form, hide confirmation
    document.getElementById('checkout-form').style.display = 'block';
    document.getElementById('confirmation').style.display = 'none';
    
    modal.style.display = 'block';
}

// Process payment
function processPayment() {
    // In a real application, this would send payment information to a server
    // For this demo, we'll just simulate a successful payment
    
    // Generate random order number
    const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
    
    // Get current date
    const date = new Date();
    const purchaseDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    
    // Update confirmation details
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('purchase-date').textContent = purchaseDate;
    
    // Hide checkout form, show confirmation
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    
    // Clear cart
    cart = [];
    totalAmount = 0;
    updateCartCount();
}