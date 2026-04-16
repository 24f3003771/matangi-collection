/**
 * Matangi Collection - Official Website Script
 * Established 2014 | Lucknow
 */

const WHATSAPP_NUMBER = "919795353474";
const DEFAULT_MESSAGE = "Hi! I found Matangi Collection online and want to inquire about your products.";

// Helper: Get WhatsApp URL
function getWhatsAppURL(message = DEFAULT_MESSAGE) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// 1. WhatsApp Integration
function initWhatsApp() {
    document.querySelectorAll("#whatsapp-nav, .whatsapp-btn, #whatsapp-footer").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(getWhatsAppURL(), "_blank");
        });
    });

    // Product-specific inquiry
    document.addEventListener("click", e => {
        const btn = e.target.closest(".whatsapp-inquiry");
        if (btn) {
            e.preventDefault();
            const product = btn.getAttribute("data-product") || "this item";
            const currentUrl = window.location.href;
            const msg = `Hi! I'm interested in the ${product} from Matangi Collection.\n\nLink: ${currentUrl}\n\nPlease share more details.`;
            window.open(getWhatsAppURL(msg), "_blank");
        }
    });

    // Contact Form Redirection
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name")?.value || "";
            const msg = document.getElementById("message")?.value || "";
            const whatsappMsg = `Hi! My name is ${name}. ${msg}`;
            window.open(getWhatsAppURL(whatsappMsg), "_blank");
        });
    }
}

// 2. Performance: Skeleton Loading & Lazy Rendering
async function loadProducts() {
    const grids = document.querySelectorAll("#product-grid, #featured-grid");
    if (grids.length === 0) return;

    // Show skeletons
    grids.forEach(grid => showSkeletons(grid, 4));

    try {
        const response = await fetch("data/products.json");
        const data = await response.json();
        window.allProducts = data.products;

        const pGrid = document.getElementById("product-grid");
        const fGrid = document.getElementById("featured-grid");

        if (pGrid) renderProducts(window.allProducts, "product-grid");
        if (fGrid) renderProducts(window.allProducts.filter(p => p.featured), "featured-grid");
        
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function showSkeletons(container, count) {
    container.innerHTML = Array(count).fill(0).map(() => `
        <div class="animate-pulse space-y-4">
            <div class="bg-gray-200 aspect-[3/4] rounded-2xl w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    `).join("");
}

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = "<p class='col-span-full text-center py-10'>No products found.</p>";
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 opacity-0" 
             style="animation: fadeIn 0.5s ease forwards;">
            <div class="relative overflow-hidden aspect-[3/4] bg-gray-50">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     loading="lazy"
                     onload="this.parentElement.classList.remove('animate-pulse')">
                ${product.featured ? '<div class="absolute top-4 left-4 bg-primary text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold">Best Seller</div>' : ''}
            </div>
            <div class="p-6">
                <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">${product.category}</p>
                <h3 class="font-serif text-xl text-on-surface mb-1">${product.name}</h3>
                <p class="text-xs text-stone-500 mb-4">${product.fabric}</p>
                <div class="flex justify-between items-center pt-4 border-t border-stone-50">
                    <span class="text-secondary font-bold text-lg">${product.price_range}</span>
                    <button class="whatsapp-inquiry bg-primary-container text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-primary transition-all" data-product="${product.name}">
                        <span class="material-symbols-outlined text-sm">chat</span> Inquiry
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// 3. Filters
function initFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", function() {
            btns.forEach(b => b.classList.remove("active", "bg-primary", "text-white"));
            this.classList.add("active", "bg-primary", "text-white");
            
            const cat = this.getAttribute("data-filter");
            const filtered = cat === "all" ? window.allProducts : window.allProducts.filter(p => p.category === cat);
            renderProducts(filtered, "product-grid");
        });
    });
}

// 4. Newsletter Toast
function initNewsletter() {
    const inputs = document.querySelectorAll('input[type="email"]');
    const buttons = document.querySelectorAll('footer button.material-symbols-outlined');
    
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (inputs[index]?.value) {
                alert("Thank you for joining our circle! We will notify you of heritage drops.");
                inputs[index].value = "";
            }
        });
    });
}

// 5. Dynamic Hero Image Slider
function initHeroSlider() {
    const heroImage = document.getElementById("hero-image");
    if (!heroImage) return;

    const images = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCHG5so-brAvMpWWf6xE_CsaX6XW5Y-5QMojVtMwRm5aK1YX3VSP90f5Oe938vymviqVlK4XTlYeMMKJ8aT2x8BgKUIKh6x06QFyMgg6y2iUK2SpeR4a84PwKYidOXYTy9LnFRTVOOTM3459WYmWZiiXYxoGwTBRLo7AQWVKxgyMiKy-GIyTrgHG7VqAI2dA76J1A6WZE4_dgXfkGlW94047jCb3dv2aAW9baMyiTHZbumuohd1vV6kvUVaOnQafwMW3PQL7ir8PfE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD6xI7Hw8Xvuwv7h_vLmB4-7hG8u2bpypiBreinQ44L9bIn7UfjR8nABEDb3nlR6TS_ibVo_rtsCK2cNx24biK35p3KLqZtCcbGURx_yJiK3CgzsOZOJlKDfx6JXJDAQ9QJ5HBTZV3rsXSEDP-K2pgn3zHvUVdrc5qiZNV6I8knbMD-LgwTtVVGiJopDFl7UyqkGnyyW-yDR1jFXo870nIfl6lK2C2dyjDSo3b4ikysxf2xK_RyMgM4QlZIrFyF48u5MJh0BMVzZQc",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFnSg2JCg7Yjh70rfNtBCwcaT3_1346DCDlItz3QNO0WWGkaXOyGGYufpJn-NpF0YSX7hRljCiSs2uFKSc6H9bKeI8m9ObXPRHmaOsigIckvtO_Bi4WcVl_9tcJmtDQ79qX_D6ig5FDqgfoQC1NKqI73L_Rx_6rvL1XCDMmmRcakxxw2pFhLWpFM7-xqIJglXxJGGGYxCTN3FdDMPaNxBmeamJN6fOYPYEQjxm08pOJMCK20Z3nNq-fRE2dPibow-0eF1R4kAsRa8",
        heroImage.src // Ensure original image is in rotation
    ];
    
    // Remove duplicates keeping original order
    const uniqueImages = [...new Set(images)];

    let currentIndex = 0;
    
    // Preload images
    uniqueImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    setInterval(() => {
        heroImage.style.opacity = '0.9';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % uniqueImages.length;
            heroImage.src = uniqueImages[currentIndex];
            heroImage.style.opacity = '1';
        }, 500);
    }, 5000);
}

// DOM Init
const initApp = () => {
    initWhatsApp();
    initFilters();
    initNewsletter();
    loadProducts();
    initHeroSlider();
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Animation CSS Addition
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);
