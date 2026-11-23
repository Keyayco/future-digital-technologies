const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-nav");

if (menuButton instanceof HTMLButtonElement && menu instanceof HTMLElement) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    }
  });
}

const yearOutput = document.querySelector("#year");
if (yearOutput) yearOutput.textContent = String(new Date().getFullYear());

const applianceField = document.querySelector('select[name="appliance"]');
document.querySelectorAll("[data-appliance]").forEach((link) => {
  link.addEventListener("click", () => {
    if (applianceField instanceof HTMLSelectElement) {
      applianceField.value = link.getAttribute("data-appliance") || "";
    }
  });
});

const issueField = document.querySelector('textarea[name="issue"]');
const charCount = document.querySelector(".char-count");
if (issueField instanceof HTMLTextAreaElement && charCount instanceof HTMLElement) {
  issueField.addEventListener("input", () => {
    charCount.textContent = `${issueField.value.length.toLocaleString("en-ZA")} / 1,200`;
  });
}

const enquiryForm = document.querySelector("#enquiry-form");
const successPanel = document.querySelector("#form-success");
const whatsappResult = document.querySelector("#whatsapp-result");

if (
  enquiryForm instanceof HTMLFormElement &&
  successPanel instanceof HTMLElement &&
  whatsappResult instanceof HTMLAnchorElement
) {
  const requiredFields = Array.from(enquiryForm.querySelectorAll("input[required], select[required], textarea[required]"));

  for (const field of requiredFields) {
    field.addEventListener("input", () => clearFieldError(field));
    field.addEventListener("change", () => clearFieldError(field));
    field.addEventListener("blur", () => validateField(field));
  }

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    successPanel.hidden = true;

    let firstInvalid = null;
    for (const field of requiredFields) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    }

    if (firstInvalid instanceof HTMLElement) {
      firstInvalid.focus();
      return;
    }

    const name = trimField(enquiryForm.elements.namedItem("name"));
    const phone = trimField(enquiryForm.elements.namedItem("phone"));
    const appliance = trimField(enquiryForm.elements.namedItem("appliance"));
    const issue = trimField(enquiryForm.elements.namedItem("issue"));
    if (!name || !phone || !appliance || !issue) return;

    const message = [
      "Hello, I would like to enquire about an appliance.",
      "",
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Appliance: ${appliance}`,
      `Issue: ${issue}`,
    ].join("\n");

    whatsappResult.href = `https://wa.me/27834755746?text=${encodeURIComponent(message)}`;
    successPanel.hidden = false;
    whatsappResult.focus();
  });
}

function trimField(field) {
  return field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement
    ? field.value.trim()
    : "";
}

function validateField(field) {
  if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return false;

  const error = field.closest(".field")?.querySelector(".field-error");
  let message = "";
  if (!field.value.trim()) {
    message = "Please complete this field.";
  } else if (field instanceof HTMLInputElement && field.type === "tel" && !/^[+0-9() -]{7,24}$/.test(field.value.trim())) {
    message = "Enter a phone number using digits, spaces or +.";
  } else if (field.value.length > Number(field.maxLength) && field.maxLength > 0) {
    message = `Please keep this under ${field.maxLength.toLocaleString("en-ZA")} characters.`;
  }

  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error instanceof HTMLElement) error.textContent = message;
  return !message;
}

function clearFieldError(field) {
  if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;

  field.removeAttribute("aria-invalid");
  const error = field.closest(".field")?.querySelector(".field-error");
  if (error instanceof HTMLElement) error.textContent = "";
}