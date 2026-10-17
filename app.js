const form = document.querySelector("form");
const input = document.getElementById("pass");

// Contraseña correcta
const CORRECT_PASSWORD = "pass123?";

// Mensaje de ayuda dinámico
const hint = document.createElement("p");
hint.className = "hint";
hint.textContent = "Ingresa la contraseña correcta para continuar.";
form.insertBefore(hint, form.querySelector('input[type="submit"]'));

function validate(value) {
	if (value === "") {
		return {
			valid: false,
			msg: "Ingresa la contraseña correcta para continuar.",
			empty: true,
		};
	}
	if (value === CORRECT_PASSWORD) {
		return { valid: true, msg: "¡Contraseña correcta! Redirigiendo..." };
	}
	return { valid: false, msg: "Contraseña incorrecta. Inténtalo de nuevo." };
}

function updateUI() {
	const value = input.value;
	input.classList.remove("valid", "invalid");
	hint.classList.remove("error", "ok");

	const { valid, msg, empty } = validate(value);

	if (empty) {
		hint.textContent = msg;
		return;
	}

	hint.textContent = msg;

	if (valid) {
		input.classList.add("valid");
		hint.classList.add("ok");
	} else {
		input.classList.add("invalid");
		hint.classList.add("error");
	}
}

input.addEventListener("input", updateUI);

form.addEventListener("submit", e => {
	e.preventDefault();
	updateUI();

	const { valid } = validate(input.value);

	if (!valid) {
		input.focus();
		return;
	}

	// Redirige a bd.html si la contraseña es correcta
	window.location.href = "bd.html";
});
