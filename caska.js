let currentPage = "HOME";
const colors = { primary: "#4f46e5", white: "#ffffff", bg: "#f9f9f9" };
document.body.style.margin = "0";
document.body.style.fontFamily = "Segoe UI, Arial";
document.body.style.background = colors.bg;

// ===== HEADER =====
const header = document.createElement("div");
header.style.cssText = `background:${colors.primary};color:${colors.white};padding:15px 20px;display:flex;align-items:center;justify-content:space-between;`;
document.body.appendChild(header);

const logoContainer = document.createElement("div");
logoContainer.style.display = "flex";
logoContainer.style.alignItems = "center";
logoContainer.style.gap = "25px";
header.appendChild(logoContainer);

// Sawirka logo-ga
let barberLogo = null;
const logoImg = document.createElement("img");
logoImg.src = "logo.png"; 
logoImg.style.width = "100px";
logoImg.style.height = "100px";
logoImg.style.objectFit = "cover";
logoImg.style.borderRadius = "8px";
logoImg.style.border = "0px dashed #ffffff"; // Placeholder line
logoContainer.appendChild(logoImg);

// Header Title
const headerTitle = document.createElement("div");
headerTitle.textContent = "COSOB BARBER";
headerTitle.style.fontSize = "32px";
headerTitle.style.fontWeight = "800";
logoContainer.appendChild(headerTitle);


// ===== MENU =====
const menuBtn = document.createElement("div");
menuBtn.textContent = "☰ MENU";
menuBtn.style.cssText = `cursor:pointer;padding:12px 20px;background:${colors.primary};color:${colors.white};font-size:18px;`;
document.body.appendChild(menuBtn);

// ===== SIDEBAR =====
const sidebar = document.createElement("div");
sidebar.style.cssText = `position:fixed;top:0;left:-240px;width:220px;height:100%;background:${colors.primary};padding-top:70px;transition:0.3s;`;
document.body.appendChild(sidebar);

// ===== NAV =====
const nav = document.createElement("div");
nav.style.cssText = `background:${colors.primary};padding:15px;text-align:center;`;
document.body.appendChild(nav);

// ===== PAGES =====
const pages = ["HOME", "SERVICES", "ABOUT", "BOOKING", "CONTACT", "RECEIPTS"];
const navButtons = {};
const sideButtons = {};
pages.forEach(p => {
    const b1 = document.createElement("button");
    b1.textContent = p;
    b1.style.cssText = `margin:6px;padding:10px 18px;background:${colors.white};color:${colors.primary};border:none;border-radius:6px;cursor:pointer;font-weight:600;`;
    nav.appendChild(b1);
    navButtons[p] = b1;

    const b2 = document.createElement("div");
    b2.textContent = p;
    b2.style.cssText = `padding:14px;color:${colors.white};cursor:pointer;`;
    sidebar.appendChild(b2);
    sideButtons[p] = b2;
});

// ===== MAIN =====
const main = document.createElement("div");
main.style.cssText = "padding:25px;min-height:260px;max-width:900px;margin:20px auto;background:white;border-radius:10px;";
document.body.appendChild(main);

// ===== FOOTER =====
const footer = document.createElement("div");
footer.style.cssText = `background:${colors.primary};color:${colors.white};text-align:center;padding:14px;`;
footer.textContent = "Contact: cosobbarber@gmail.com | Phone: +252617886066";
document.body.appendChild(footer);

// ===== MENU TOGGLE =====
menuBtn.onclick = () => { sidebar.style.left = sidebar.style.left === "0px" ? "-240px" : "0px"; };

// ===== WORKING HOURS =====
const workingHours = {
    "Saturday": { start: 7, end: 12.5 },
    "Sunday": { start: 7, end: 12.5 },
    "Monday": { start: 7, end: 12.5 },
    "Tuesday": { start: 7, end: 12.5 },
    "Wednesday": { start: 7, end: 12.5 },
    "Thursday": { start: 7, end: 12.5 },
    "Friday": { start: 13, end: 12.5 }
};

// ===== BARBER LIST =====
const barbers = ["patric", "Abdi", "Hassan", "Ali"];
const maxAppointmentsPerBarber = 4;
const bookedAppointments = {};
const receiptsList = [];

// ===== LOCAL STORAGE HELPERS =====
function saveReceiptsToStorage() {
    const data = receiptsList.map(r => ({ ...r, timestamp: new Date().getTime() }));
    localStorage.setItem("cosob_receipts", JSON.stringify(data));
}

function loadReceiptsFromStorage() {
    const data = JSON.parse(localStorage.getItem("cosob_receipts") || "[]");
    const now = new Date().getTime();
    const filtered = data.filter(r => now - r.timestamp <= 30*24*60*60*1000);
    receiptsList.length = 0;
    filtered.forEach(r => receiptsList.push(r));
    saveReceiptsToStorage();
}

// ===== PAGES =====
function loadHome() {
    currentPage = "HOME";
    main.innerHTML = `<h2>Welcome to Cosob Barber</h2>
                      <p>Your one-stop booking platform for haircuts, styling, massages, and more.</p>`;
}

function loadServices() {
    currentPage = "SERVICES";
    main.innerHTML = "";
    
    const services = [
        { name: "Hair Cut - Normal", price: 6, img: "normal.jpg" },
        { name: "Hair Cut - VIP", price: 12, img: "vip.jpg" },
        { name: "Kids Haircut", price: 4, img: "kids.jpg" },
        { name: "Shampoo & Hair Wash", price: 5, img: "shampoo.jpg" },
        { name: "Hot Towel Shave", price: 7, img: "hot towel.jpg" },
        { name: "beard styling", price: 5, img: "beard.jpg" },
        { name: "Head Shave", price: 2, img: "head.jpg" },
        { name: "Scalp Massage", price: 15, img: "scalp.jpg" },
        { name: "Face Clean", price: 4, img: "clean.jpg" },
        { name: "Hair Coloring", price: 5, img: "coloring.jpg" },
        { name: "Massage Full Body", price: 25, img: "massage.jpg" }
    ];
    
    // Grid container 4 column
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(4, 1fr)";
    container.style.gap = "20px";
    container.style.justifyItems = "center";
    main.appendChild(container);
    
    services.forEach(service => {
        const card = document.createElement("div");
        card.style.width = "160px";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.borderRadius = "8px";
        card.style.background = "#ffffff";
        card.style.padding = "10px";
        
        // Shadow xoog leh
        card.style.boxShadow = "0 15px 40px rgba(0,0,0,0.6)";
        card.style.transition = "transform 0.2s, box-shadow 0.2s";
        card.onmouseover = () => {
            card.style.transform = "translateY(-6px)";
            card.style.boxShadow = "0 25px 60px rgba(0,0,0,0.8)";
        };
        card.onmouseout = () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "0 15px 40px rgba(0,0,0,0.6)";
        };
        
        // Sawirka weyn
        const img = document.createElement("img");
        img.src = service.img;
        img.alt = service.name;
        img.style.width = "100%";
        img.style.height = "140px"; // sawirka ka weyn
        img.style.objectFit = "cover";
        img.style.borderRadius = "5px";
        
        // Magaca
        const name = document.createElement("h4");
        name.textContent = service.name;
        name.style.marginTop = "10px";
        name.style.textAlign = "center";
        
        // Qiimaha
        const price = document.createElement("p");
        price.textContent = "$" + service.price;
        price.style.textAlign = "center";
        
        // Ku dar card-ka
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        
        container.appendChild(card);
    });
}
  

// ===== ABOUT PAGE =====
function loadAbout() {
    currentPage = "ABOUT";
    main.innerHTML = "";
    
    const aboutCard = document.createElement("div");
    
    // Shadow, gradient, layout qurxoon
    aboutCard.style.background = "linear-gradient(135deg, #ffffff, #f0f4ff)";
    aboutCard.style.padding = "30px";
    aboutCard.style.borderRadius = "16px";
    aboutCard.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
    aboutCard.style.maxWidth = "700px";
    aboutCard.style.margin = "20px auto";
    aboutCard.style.lineHeight = "1.7";
    aboutCard.style.transition = "transform 0.3s, box-shadow 0.3s";
    
    // Hover effect
    aboutCard.addEventListener("mouseover", () => {
        aboutCard.style.transform = "translateY(-5px)";
        aboutCard.style.boxShadow = "0 25px 60px rgba(0,0,0,0.25)";
    });
    aboutCard.addEventListener("mouseout", () => {
        aboutCard.style.transform = "translateY(0)";
        aboutCard.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
    });
    
    // Content
    aboutCard.innerHTML = `
        <h2 style="margin-bottom:15px;">About Cosob Barber</h2>
        <p>Location: banadir hodan Mogadishu, Somalia</p>
        <p>Working Hours:</p>
        <ul>
            <li>Saturday 7:00 AM - 12:30 PM</li>
            <li>Sunday 7:00 AM - 12:30 PM</li>
            <li>Monday 7:00 AM - 12:30 PM</li>
            <li>Tuesday 7:00 AM - 12:30 PM</li>
            <li>Wednesday 7:00 AM - 12:30 PM</li>
            <li>Thursday 7:00 AM - 12:30 PM</li>
            <li>Friday 1:00 PM - 12:30 PM</li>
        </ul>
    `;
    
    main.appendChild(aboutCard);
}


function loadBooking() {
    currentPage = "BOOKING";
    main.innerHTML = `<h2 style="text-align:center;margin-bottom:20px;">Book Your Appointment</h2>`;

    const f = document.createElement("form");
    f.style.cssText = `
        display:flex; 
        flex-direction:column; 
        gap:15px; 
        max-width:500px; 
        margin:0 auto; 
        padding:25px; 
        background:#fff; 
        border-radius:12px; 
        box-shadow:0 8px 20px rgba(0,0,0,0.15);
    `;

    const inputStyle = `
        padding:12px; 
        border:1px solid #ccc; 
        border-radius:8px; 
        outline:none; 
        box-shadow:0 3px 6px rgba(0,0,0,0.05);
        transition:0.3s;
    `;

    const name = document.createElement("input");
    name.placeholder = "Full Name";
    name.style.cssText = inputStyle;

    const number = document.createElement("input");
    number.placeholder = "Phone Number";
    number.style.cssText = inputStyle;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.min = new Date().toISOString().split("T")[0];
    dateInput.style.cssText = inputStyle;

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.style.cssText = inputStyle;

    const barberSelect = document.createElement("select");
    barberSelect.style.cssText = inputStyle;
    barbers.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b;
        opt.textContent = b;
        barberSelect.appendChild(opt);
    });

    const services = [
        { name: "Hair Cut - Normal", price: 6 }, { name: "Hair Cut - VIP", price: 12 }, 
        { name: "Kids Haircut", price: 4}, { name: "Shampoo & Hair Wash", price: 5},
        { name: "Hot Towel Shave", price: 7 }, { name: "beard styling", price: 5}, { name: "Head Shave", price: 2 },
        { name: "Scalp Massage", price: 15}, { name: "Face Clean", price: 18 }, { name: "Hair Coloring", price: 5 },
        { name: "Massage Full Body", price: 25 }
    ];

    const servicesDiv = document.createElement("div");
    servicesDiv.style.cssText = `
        display:flex; 
        flex-direction:column; 
        gap:10px; 
        padding:10px; 
        background: linear-gradient(135deg, #f0f0f0, #fafafa); 
        border-radius:8px; 
        box-shadow:0 4px 12px rgba(0,0,0,0.05);
    `;

    services.forEach(s => {
        const label = document.createElement("label");
        label.style.cssText = "cursor:pointer; display:flex; align-items:center; gap:8px;";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = s.name;
        cb.dataset.price = s.price;
        label.appendChild(cb);
        label.append(" " + s.name + " ($" + s.price + ")");
        servicesDiv.appendChild(label);
    });

    const totalPriceDiv = document.createElement("p");
    totalPriceDiv.textContent = "Total Price: $0";
    totalPriceDiv.style.fontWeight = "bold";
    totalPriceDiv.style.marginTop = "5px";

    servicesDiv.querySelectorAll("input[type=checkbox]").forEach(cb => {
        cb.onchange = () => {
            let total = 0;
            servicesDiv.querySelectorAll("input[type=checkbox]").forEach(c => { 
                if (c.checked) total += Number(c.dataset.price); 
            });
            totalPriceDiv.textContent = "Total Price: $" + total;
        };
    });

    const msg = document.createElement("textarea");
    msg.placeholder = "Additional Notes";
    msg.style.cssText = inputStyle + "height:80px; resize:none;";

    const info = document.createElement("p");
    info.style.color = "red";

    const submit = document.createElement("button");
    submit.textContent = "Confirm Booking";
    submit.style.cssText = `
        padding:12px;
        background: linear-gradient(135deg, ${colors.primary}, #00A5E0);
        color:${colors.white};
        border:none;
        border-radius:8px;
        cursor:pointer;
        font-weight:bold;
        transition:0.3s;
        box-shadow:0 6px 15px rgba(0,0,0,0.1);
    `;
    submit.onmouseover = () => submit.style.opacity = "0.9";
    submit.onmouseout = () => submit.style.opacity = "1";

    f.onsubmit = e => {
        e.preventDefault();
        loadReceiptsFromStorage();

        const selectedServices = [];
        let total = 0;
        servicesDiv.querySelectorAll("input[type=checkbox]").forEach(c => { 
            if (c.checked) { selectedServices.push(c.value); total += Number(c.dataset.price); } 
        });

        if (!name.value || !number.value || !dateInput.value || !timeInput.value || selectedServices.length === 0) {
            info.textContent = "Fill all fields / Buuxi dhammaan meelaha!";
            return;
        }

        const selectedBarber = barberSelect.value;
        const selectedDateTime = dateInput.value + "T" + timeInput.value;

        if (!bookedAppointments[selectedBarber]) bookedAppointments[selectedBarber] = [];
        const alreadyBooked = bookedAppointments[selectedBarber].some(t => t === selectedDateTime);
        if (alreadyBooked) {
            info.style.color = "red";
            info.textContent = `Time slot ${timeInput.value} is already booked for ${selectedBarber}.`;
            return;
        }

        const selectedDate = new Date(dateInput.value);
        const weekStart = new Date(selectedDate); weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
        const userThisWeek = receiptsList.filter(r => r.client === name.value && new Date(r.date) >= weekStart && new Date(r.date) <= weekEnd);
        if (userThisWeek.length > 0) {
            info.style.color = "red";
            info.textContent = "You already have a booking this week / Toddobaadkan horey ayaad u qabatay.";
            return;
        }

        bookedAppointments[selectedBarber].push(selectedDateTime);
        const receiptData = { client: name.value, phone: number.value, barber: selectedBarber, date: dateInput.value, time: timeInput.value, services: selectedServices, total };
        receiptsList.push(receiptData);
        saveReceiptsToStorage();

        info.style.color="green"; 
        info.textContent="Appointment confirmed!";
        f.reset(); 
        totalPriceDiv.textContent="Total Price: $0";
    };

    [name, number, dateInput, timeInput, barberSelect, servicesDiv, totalPriceDiv, msg, submit, info].forEach(el => f.appendChild(el));
    main.appendChild(f);
}

// ===== RECEIPTS WITH DAYS LEFT QURXAN =====
function loadReceipts() {
    currentPage = "RECEIPTS";
    main.innerHTML = "<h2 style='text-align:center;margin-bottom:20px;'>All Receipts / Rasiid Dhan</h2>";
    loadReceiptsFromStorage();
    
    if (receiptsList.length === 0) {
        main.innerHTML += "<p style='text-align:center;'>No receipts yet / Rasiid ma jiraan.</p>";
        return;
    }
    
    receiptsList.forEach(r => {
        const div = document.createElement("div");
        div.style.cssText = `
            background: linear-gradient(135deg, #ffffff, #f0f4ff);
            padding:20px;
            margin:15px 0;
            border-radius:12px;
            box-shadow:0 12px 30px rgba(0,0,0,0.12);
            transition: transform 0.3s, box-shadow 0.3s;
        `;
        div.onmouseover = () => {
            div.style.transform = "translateY(-3px)";
            div.style.boxShadow = "0 20px 50px rgba(0,0,0,0.18)";
        };
        div.onmouseout = () => {
            div.style.transform = "translateY(0)";
            div.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
        };
        
        const appointmentDate = new Date(r.date);
        const today = new Date();
        const timeDiff = appointmentDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        div.innerHTML = `
            <p><strong>Client:</strong> ${r.client}</p>
            <p><strong>Phone:</strong> ${r.phone}</p>
            <p><strong>Barber:</strong> ${r.barber}</p>
            <p><strong>Date:</strong> ${r.date}</p>
            <p><strong>Time:</strong> ${r.time}</p>
            <p><strong>Services:</strong> ${r.services.join(", ")}</p>
            <p><strong>Total:</strong> $${r.total}</p>
            <p><strong>Days Left:</strong> ${daysLeft} day(s)</p>
        `;
        main.appendChild(div);
    });
}

// ===== CONTACT + FEEDBACK QURXAN =====
function loadContact() {
    currentPage = "CONTACT"; 
    main.innerHTML = ""; // nadiifi main

    // Contact info card
    const contactCard = document.createElement("div");
    contactCard.style.cssText = `
        background: linear-gradient(135deg, #ffffff, #f0f4ff);
        padding:25px;
        border-radius:14px;
        box-shadow:0 12px 30px rgba(0,0,0,0.12);
        max-width:700px;
        margin:20px auto 30px auto;
        transition: transform 0.3s, box-shadow 0.3s;
        line-height:1.6;
    `;
    contactCard.onmouseover = () => {
        contactCard.style.transform = "translateY(-3px)";
        contactCard.style.boxShadow = "0 20px 50px rgba(0,0,0,0.18)";
    };
    contactCard.onmouseout = () => {
        contactCard.style.transform = "translateY(0)";
        contactCard.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
    };
    contactCard.innerHTML = `
        <h2 style="margin-bottom:15px;">Contact Cosob Barber</h2>
        <p>Email: cosobbarber@gmail.com</p>
        <p>Phone: +252617886066</p>
    `;
    main.appendChild(contactCard);

    // Feedback form
    const feedbackForm = document.createElement("form");
    feedbackForm.style.cssText = `
        display:flex; 
        flex-direction:column; 
        gap:14px; 
        background: linear-gradient(135deg, #f9f9f9, #ffffff);
        padding:25px; 
        border-radius:14px; 
        box-shadow:0 10px 25px rgba(0,0,0,0.08);
        max-width:700px;
        margin:0 auto;
        transition: transform 0.3s, box-shadow 0.3s;
    `;
    feedbackForm.onmouseover = () => {
        feedbackForm.style.transform = "translateY(-3px)";
        feedbackForm.style.boxShadow = "0 18px 45px rgba(0,0,0,0.14)";
    };
    feedbackForm.onmouseout = () => {
        feedbackForm.style.transform = "translateY(0)";
        feedbackForm.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
    };

    const inputStyle = `
        padding:12px; 
        border:1px solid #ccc; 
        border-radius:10px; 
        outline:none; 
        box-shadow:0 3px 6px rgba(0,0,0,0.05);
        transition:0.3s;
    `;

    const nameInput = document.createElement("input"); 
    nameInput.placeholder = "Your Name"; 
    nameInput.style.cssText = inputStyle;

    const emailInput = document.createElement("input"); 
    emailInput.type = "email"; 
    emailInput.placeholder = "Your Email"; 
    emailInput.style.cssText = inputStyle;

    const messageInput = document.createElement("textarea"); 
    messageInput.placeholder = "Write your feedback / Cabashadaada halkan ku qor"; 
    messageInput.style.cssText = inputStyle + "height:100px;resize:none;";

    const submitBtn = document.createElement("button"); 
    submitBtn.textContent = "Send Feedback / Dir Cabasho"; 
    submitBtn.style.cssText = `
        padding:14px;
        background: linear-gradient(135deg, ${colors.primary}, #6c63ff);
        color:${colors.white};
        border:none;
        border-radius:10px;
        cursor:pointer;
        font-weight:bold;
        box-shadow:0 6px 15px rgba(0,0,0,0.12);
        transition:0.3s;
    `;
    submitBtn.onmouseover = () => submitBtn.style.opacity = "0.9";
    submitBtn.onmouseout = () => submitBtn.style.opacity = "1";

    const info = document.createElement("p"); 
    info.style.color = "green";

    feedbackForm.onsubmit = e => {
        e.preventDefault();
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            info.style.color = "red";
            info.textContent = "Please fill all fields / Buuxi dhammaan meelaha!";
            return;
        }
        const feedbackList = JSON.parse(localStorage.getItem("cosob_feedback") || "[]");
        feedbackList.push({ name: nameInput.value, email: emailInput.value, message: messageInput.value, timestamp: new Date().getTime() });
        localStorage.setItem("cosob_feedback", JSON.stringify(feedbackList));

        info.style.color = "green";
        info.textContent = "Feedback sent! / Cabashadaada waa la diray.";
        feedbackForm.reset();
    };

    [nameInput,emailInput,messageInput,submitBtn,info].forEach(el => feedbackForm.appendChild(el));
    main.appendChild(feedbackForm);
}

// ===== PAGE HANDLERS =====
pages.forEach(p=>{
    navButtons[p].onclick=()=>{sidebar.style.left="-240px"; window["load"+p.charAt(0)+p.slice(1).toLowerCase()]();};
    sideButtons[p].onclick=()=>{sidebar.style.left="-240px"; window["load"+p.charAt(0)+p.slice(1).toLowerCase()]();};
});

// ===== INITIAL PAGE =====