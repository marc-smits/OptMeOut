export default function (steps, language) {
	document.addEventListener("DOMContentLoaded", () => {
		const stepLinks = document.querySelectorAll(".nav-link");
		const prevButton = document.getElementById("prev-step");
		const nextButton = document.getElementById("next-step");
		let currentStep = 0;

		const stepsContainer = document.querySelectorAll(".step-content");

		// Initialize JSON Editors
		const editors = [];
		stepsContainer.forEach((step, index) => {
			const editor = new JSONEditor(step.querySelector("div"), {
				schema: Object.values(steps)[index],
				theme: "bootstrap5",
				disable_edit_json: true,
				disable_properties: true,
				disable_collapse: true,
			});
			editors.push(editor);
		});

		// Navigation Logic
		function showStep(stepIndex) {
			stepsContainer.forEach((step, index) => {
				step.classList.toggle("d-none", index !== stepIndex);
			});
			stepLinks.forEach((link, index) => {
				link.classList.toggle("active", index === stepIndex);
			});
			prevButton.disabled = stepIndex === 0;
			nextButton.textContent =
				stepIndex === stepsContainer.length - 1 ? "Submit" : "Next";
			currentStep = stepIndex;
		}

		stepLinks.forEach((link, index) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				showStep(index);
			});
		});

		prevButton.addEventListener("click", () => {
			if (currentStep > 0) showStep(currentStep - 1);
		});

		nextButton.addEventListener("click", () => {
			if (currentStep < stepsContainer.length - 1) {
				// Validate current step before proceeding
				const errors = editors[currentStep].validate();
				if (errors.length === 0) {
					showStep(currentStep + 1);
				} else {
					alert("Please fix errors before proceeding.");
				}
			} else {
				// Submit Form
				const formData = editors.map((editor) => editor.getValue());
				console.log("Form Data:", formData);
				// Send data to API (mock example)
				alert("Je formulier wordt nu afgeleverd.");
				fetch("https://api.example.com/submit", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				})
					.then((response) => response.json())
					.then((data) => alert("Letter submitted successfully!"))
					.catch((error) => console.error("Error:", error));
			}
		});

		// Show First Step Initially
		showStep(0);
	});
}
