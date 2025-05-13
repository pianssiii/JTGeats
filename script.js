document.addEventListener("DOMContentLoaded", function () {
    // --- General Helper for Modals ---
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add("show");
            document.body.classList.add("modal-open");
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove("show");
            // Only remove modal-open if no other modals are shown
            const stillOpenModals = document.querySelectorAll('.modal.show');
            if (stillOpenModals.length === 0) {
                document.body.classList.remove("modal-open");
            }
        }
    }

    // --- Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // --- Search Bar in Hero Section ---
    const heroSearchButton = document.querySelector(".hero-section .search-box button");
    const heroSearchInput = document.querySelector(".hero-section .search-box input");
    if (heroSearchButton && heroSearchInput) {
        heroSearchButton.addEventListener("click", function () {
            let searchQuery = heroSearchInput.value.trim();
            if (searchQuery) {
                // console.log(`Searching for: ${searchQuery}`); // Less intrusive
                alert(`Searching for: ${searchQuery}`);
            } else {
                alert("Please enter food to search.");
            }
        });
    }

    // --- Home Kitchen Grid (Data population - from original script) ---
    const foodContainer = document.getElementById("foodContainer");
    if (foodContainer) {
        const foodItems = [
            { image: "/assets/1.png", name: "Home made pizza", price: "₹190", rating: 4.7, time: "50-79 min", discount: "50%" },
            { image: "/assets/2.png", name: "Veggie Delight Pizza", price: "₹220", rating: 4.5, time: "40-60 min", discount: "" },
            { image: "/assets/3.png", name: "Chicken Pasta", price: "₹250", rating: 4.8, time: "30-50 min", discount: "20%" },
            { image: "/assets/4.png", name: "Caesar Salad", price: "₹180", rating: 4.3, time: "20-30 min", discount: "" },
            { image: "/assets/5.png", name: "Fruit Bowl", price: "₹150", rating: 4.9, time: "15-25 min", discount: "10%" },
            { image: "/assets/6.png", name: "Butter Chicken", price: "₹300", rating: 4.6, time: "50-70 min", discount: "15%" },
            { image: "/assets/7.png", name: "Paneer Tikka", price: "₹280", rating: 4.7, time: "45-65 min", discount: "" },
            { image: "/assets/8.png", name: "Dal Makhani", price: "₹200", rating: 4.4, time: "40-60 min", discount: "25%" },
        ];
        foodItems.forEach((item) => {
            const foodCard = document.createElement("div");
            foodCard.classList.add("food-card");
            // The div with class "relative" was in original JS, if specific styling depends on it, keep it.
            // Otherwise, image-container could serve this purpose if styled with position: relative.
            // For simplicity, retaining original structure from provided JS.
            foodCard.innerHTML = `
                <div class="image-container"> 
                    ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="food-details">
                    <h3 class="food-name">${item.name}</h3>
                    <p class="food-price">${item.price}</p>
                    <p class="food-meta">⭐ ${item.rating} | ⏳ ${item.time}</p>
                </div>
            `;
            foodContainer.appendChild(foodCard);
        });
    } else {
        console.error("Error: #foodContainer not found for Home Kitchen Grid!");
    }


    // --- Popular Items Slider ---
    const popularItemsSlider = document.querySelector(".popular-items-slider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (popularItemsSlider && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            popularItemsSlider.scrollBy({ left: -320, behavior: "smooth" }); // Card width (300) + gap (20)
        });

        nextBtn.addEventListener("click", () => {
            popularItemsSlider.scrollBy({ left: 320, behavior: "smooth" });
        });
    }

    // Popular Items - Quantity buttons (scoped to popular items slider)
    const popularItemCards = document.querySelectorAll(".popular-items-slider .food-card");
    popularItemCards.forEach(card => {
        const plusBtn = card.querySelector(".plus");
        const minusBtn = card.querySelector(".minus");
        const countElement = card.querySelector(".quantity .count");

        if (plusBtn && countElement) {
            plusBtn.addEventListener("click", () => {
                countElement.textContent = parseInt(countElement.textContent) + 1;
            });
        }
        if (minusBtn && countElement) {
            minusBtn.addEventListener("click", () => {
                let count = parseInt(countElement.textContent);
                if (count > 1) {
                    countElement.textContent = count - 1;
                }
            });
        }
    });
    

    // Popular Items - Hover effect for cards with an "Add" button
    const interactiveCards = document.querySelectorAll(".popular-items-slider .food-card.popular-item-interactive");
    interactiveCards.forEach(card => {
        const addBtn = card.querySelector(".add-btn");
        const quantityControls = card.querySelector(".quantity");

        if (addBtn && quantityControls) {
            card.addEventListener("mouseenter", () => {
                addBtn.style.display = "none";
                quantityControls.style.display = "flex";
            });
            card.addEventListener("mouseleave", () => {
                addBtn.style.display = "inline-block"; 
                quantityControls.style.display = "none";
            });
        }
    });


    // --- Cart Modal ---
    const cartButton = document.getElementById("cartButton");
    const cartModal = document.getElementById("cartModal");
    const closeCartModalBtn = document.getElementById("closeCartModalButton"); // Updated ID from HTML

    if (cartButton && cartModal && closeCartModalBtn) {
        cartButton.addEventListener("click", function () {
            openModal(cartModal);
        });

        closeCartModalBtn.addEventListener("click", function () {
            closeModal(cartModal);
        });

        cartModal.addEventListener("click", function (event) {
            if (event.target === cartModal) { // Click on backdrop
                closeModal(cartModal);
            }
        });
    }

    // --- Request Dish Modal ---
    const openRequestModalBtn = document.getElementById("openRequestModalBtn"); // Updated ID from HTML
    const requestDishModal = document.getElementById("requestModal");
    
    if (openRequestModalBtn && requestDishModal) {
        const cancelRequestModalButton = requestDishModal.querySelector(".cancel-btn");
        const submitRequestModalButton = requestDishModal.querySelector(".submit-btn");
        const closeRequestModalXButton = requestDishModal.querySelector(".close-modal");
        const requestDishForm = document.getElementById("requestDishForm");


        openRequestModalBtn.addEventListener("click", function () {
            openModal(requestDishModal);
        });

        if (cancelRequestModalButton) {
            cancelRequestModalButton.addEventListener("click", function () {
                closeModal(requestDishModal);
            });
        }

        if (submitRequestModalButton) {
            submitRequestModalButton.addEventListener("click", function () {
                // event.preventDefault(); // No form actual submission, button type is "button"
                if (requestDishForm) {
                    requestDishForm.reset(); // Clear form fields
                }
                closeModal(requestDishModal);
            });
        }

        if (closeRequestModalXButton) {
            closeRequestModalXButton.addEventListener("click", function () {
                closeModal(requestDishModal);
            });
        }

        requestDishModal.addEventListener("click", function (event) {
            if (event.target === requestDishModal) { // Click on backdrop
                closeModal(requestDishModal);
            }
        });
    }


    // --- Video Player Functionality ---
    const videoContainer = document.querySelector(".video-container");
    if (videoContainer) {
        const video = videoContainer.querySelector(".styled-video");
        let playIconOverlay = videoContainer.querySelector('.play-icon-overlay');

        if (video) {
            if (!playIconOverlay) { // Create if not already in HTML (though CSS implies JS adds it)
                playIconOverlay = document.createElement('div');
                playIconOverlay.classList.add('play-icon-overlay');
                playIconOverlay.innerHTML = '<i class="fas fa-play"></i>';
                videoContainer.appendChild(playIconOverlay);
            }
            
            video.removeAttribute("controls");

            function togglePlayPause() {
                if (video.paused || video.ended) {
                    video.play();
                } else {
                    video.pause();
                }
            }

            video.addEventListener("click", togglePlayPause);
            if(playIconOverlay){
                 playIconOverlay.addEventListener("click", togglePlayPause); // Prevent error if somehow null
            }

            video.addEventListener("play", () => {
                if(playIconOverlay) playIconOverlay.classList.add("hidden");
            });

            video.addEventListener("pause", () => {
                if(playIconOverlay) playIconOverlay.classList.remove("hidden");
            });

            video.addEventListener("ended", () => {
                if(playIconOverlay) playIconOverlay.classList.remove("hidden");
            });

            // Initial state
            if (playIconOverlay) {
                if (video.paused || video.ended) {
                    playIconOverlay.classList.remove("hidden");
                } else {
                    playIconOverlay.classList.add("hidden");
                }
            }
        }
    }


    // --- Contact Form Submission (Existing Logic) ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields!");
                return;
            }

            alert("Thank you! Your message has been sent.");
            contactForm.reset();
        });
    }
});