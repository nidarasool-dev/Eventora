
// ===============================
// HAMBURGER MENU
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}


// CLOSE MOBILE MENU

document.querySelectorAll("#nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks && menuToggle) {

            navLinks.classList.remove("active");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

});


// ===============================
// EVENTORA GALLERY MOCK API
// ===============================

function makeImages(category, ids) {

    return ids.map(id => ({
        category: category,
        image: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`
    }));

}


const galleryAPI = [

    // WEDDING DECOR
    ...makeImages("wedding", [
        7711167, 37710440, 36669332,
        37302293, 16120230, 17315434,
        33914523, 24023403, 17023147
    ]),

    // BIRTHDAY DECOR
    ...makeImages("birthday", [
        16220888, 5610382, 14457438,
        6815418, 7328587, 30464370,
        37296132, 14457430, 8014841
    ]),

    // ENGAGEMENT DECOR
    ...makeImages("engagement", [
        20356315, 32147292, 36230868,
        36230877, 37710446, 37302304,
        35985200, 37665542, 28981058
    ]),

    // PARTY DECOR
    ...makeImages("party", [
        9509563, 28179595, 15666708,
        3402538, 7180587, 7328590,
        31972323, 34386819, 37296139
    ])

];


// MOCK API FUNCTION

async function fetchGalleryAPI() {
    return galleryAPI;
}


// ===============================
// GALLERY ELEMENTS
// ===============================

const galleryGrid = document.getElementById("gallery-grid");

const galleryButtons = document.querySelectorAll(
    ".gallery-filters button"
);

let allGalleryImages = [];


// ===============================
// DISPLAY GALLERY
// ===============================

function displayGallery(images) {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    if (images.length === 0) {

        galleryGrid.textContent = "No images found.";
        return;

    }

    images.forEach(item => {

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        // IMAGE

        const img = document.createElement("img");

        img.src = item.image;
        img.alt = item.category + " event decoration";
        img.loading = "lazy";

        img.onerror = () => {
            galleryItem.remove();
        };

        galleryItem.appendChild(img);


        // HOVER OVERLAY

        const overlay = document.createElement("div");
        overlay.classList.add("gallery-overlay");

        const title = document.createElement("h3");
        title.textContent = item.category;

        const description = document.createElement("p");
        description.textContent = "Beautiful Event Moments";

        overlay.appendChild(title);
        overlay.appendChild(description);

        galleryItem.appendChild(overlay);


        // ADD COMPLETE ITEM

        galleryGrid.appendChild(galleryItem);

    });

}


// LOAD GALLERY

async function loadGallery() {

    if (!galleryGrid) return;

    try {

        allGalleryImages = await fetchGalleryAPI();

        displayGallery(allGalleryImages);

    } catch (error) {

        galleryGrid.textContent = "Gallery could not load.";

        console.log(error);

    }

}


// ===============================
// CATEGORY FILTERS
// ===============================

galleryButtons.forEach(button => {

    button.addEventListener("click", () => {

        galleryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        if (selectedCategory === "all") {

            displayGallery(allGalleryImages);

        } else {

            const filteredImages = allGalleryImages.filter(item => {
                return item.category === selectedCategory;
            });

            displayGallery(filteredImages);

        }

    });

});


// ===============================
// START GALLERY
// ===============================

if (galleryGrid) {
    loadGallery();
}

// CONTACT FORM

const contactForm = document.getElementById("contact-form-data");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        contactForm.reset();

    });

}


// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        // Close other questions
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            }
        });

        // Toggle clicked question
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }

    });

});