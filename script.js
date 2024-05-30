document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");

  // Tooltip for navigation links
  navLinks.forEach((link) => {
    link.setAttribute("title", `Go to ${link.textContent}`);
  });

  // Smooth scroll and active link highlighting
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: "smooth" });

      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const form = document.querySelector("form");
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const numberInput = form.querySelector('input[type="number"]');
  const dobInput = form.querySelector('input[type="date"]');

  const submitButton = form.querySelector('button[type="submit"]');

  // Load form data from local storage
  loadFormData();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const number = numberInput.value.trim();
    const dob = dobInput.value.trim();

    if (!name || !email || !number || !dob) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Registration successful!");
    form.reset();
    localStorage.clear();
  });

  // Live form field validation
  nameInput.addEventListener("input", () => validateField(nameInput));
  emailInput.addEventListener("input", () => validateField(emailInput));
  numberInput.addEventListener("input", () => validateField(numberInput));
  dobInput.addEventListener("input", () => validateField(dobInput));

  form.addEventListener("input", saveFormData);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateField(input) {
    if (!input.value.trim()) {
      input.setCustomValidity("This field is required");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  }

  function saveFormData() {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      number: numberInput.value,
      dob: dobInput.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  function loadFormData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      nameInput.value = formData.name;
      emailInput.value = formData.email;
      numberInput.value = formData.number;
      dobInput.value = formData.dob;
    }
  }
});
