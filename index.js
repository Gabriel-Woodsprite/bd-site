const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height, cx, cy;
let particles = [];
const numParticles = 600; // Cantidad de puntitos

// Ajustar el tamaño del canvas a la pantalla
function resize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	cx = width / 2;
	cy = height / 2;
}
window.addEventListener("resize", resize);
resize();

// Clase para crear cada partícula
class Particle {
	constructor() {
		this.reset();
	}

	reset() {
		// Ángulo y distancia desde el centro
		this.angle = Math.random() * Math.PI * 2;
		this.distance = Math.random() * (Math.max(width, height) / 2) + 10;
		// Velocidad y colores (azules y violetas)
		this.speed = Math.random() * 2 + 0.5;
		this.color = Math.random() > 0.5 ? "#5c7cfa" : "#b085f5";
	}

	update() {
		this.distance -= this.speed; // Se mueve hacia el centro
		// Si llega al centro, reiniciar lejos
		if (this.distance < 5) {
			this.reset();
			this.distance = Math.max(width, height) / 2;
		}
	}

	draw() {
		// Calcular posición X e Y basado en el ángulo y la distancia
		const x = cx + Math.cos(this.angle) * this.distance;
		const y = cy + Math.sin(this.angle) * this.distance;

		ctx.beginPath();
		ctx.arc(x, y, 1.5, 0, Math.PI * 2); // Tamaño del punto
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

// Crear las partículas
for (let i = 0; i < numParticles; i++) {
	particles.push(new Particle());
}

// Bucle de animación
function animate() {
	// Pequeño rastro para el efecto de movimiento (opacidad)
	ctx.fillStyle = "rgba(26, 26, 26, 0.2)"; // Mismo color del fondo #1a1a1a
	ctx.fillRect(0, 0, width, height);

	// Actualizar y dibujar cada partícula
	particles.forEach(p => {
		p.update();
		p.draw();
	});

	requestAnimationFrame(animate);
}

animate();
