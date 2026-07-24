document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("password-toggle");
    const passwordToggleIcon = document.getElementById("password-toggle-icon");
    const loginButton = document.getElementById("login-button");
    const alertMessage = document.getElementById("alert-message");
    const alertText = document.getElementById("alert-text");
    const alertIcon = document.getElementById("alert-icon");
    const forgotPasswordLink = document.getElementById("forgot-password-link");

    passwordToggle.addEventListener("click", function () {
        const passwordIsHidden = passwordInput.type === "password";

        passwordInput.type = passwordIsHidden ? "text" : "password";

        passwordToggleIcon.className = passwordIsHidden
            ? "fa-regular fa-eye-slash"
            : "fa-regular fa-eye";

        passwordToggle.setAttribute(
            "aria-label",
            passwordIsHidden
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
        );

        passwordToggle.setAttribute(
            "title",
            passwordIsHidden
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
        );
    });

    emailInput.addEventListener("input", function () {
        emailInput.classList.remove("input-error");
        hideAlert();
    });

    passwordInput.addEventListener("input", function () {
        passwordInput.classList.remove("input-error");
        hideAlert();
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const motDePasse = passwordInput.value.trim();

        emailInput.classList.remove("input-error");
        passwordInput.classList.remove("input-error");
        hideAlert();

        let formIsValid = true;

        if (email === "") {
            emailInput.classList.add("input-error");
            formIsValid = false;
        }

        if (motDePasse === "") {
            passwordInput.classList.add("input-error");
            formIsValid = false;
        }

        if (!formIsValid) {
            showAlert(
                "Veuillez renseigner votre adresse e-mail et votre mot de passe.",
                "error"
            );
            return;
        }

        setLoadingState(true);

        try {
            const result = await apiPost("login", {
                email: email,
                motDePasse: motDePasse
            });

            if (!result.success) {
                showAlert(
                    result.message || "Adresse e-mail ou mot de passe incorrect.",
                    "error"
                );
                return;
            }

            localStorage.setItem(
                "visibl_user",
                JSON.stringify(result.user)
            );

            showAlert(
                result.message || "Connexion réussie.",
                "success"
            );

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 700);

        } catch (error) {
            console.error("Erreur de connexion :", error);

            showAlert(
                "Impossible de joindre le serveur. Veuillez réessayer.",
                "error"
            );

        } finally {
            setLoadingState(false);
        }
    });

    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();

        showAlert(
            "La récupération du mot de passe sera ajoutée prochainement.",
            "success"
        );
    });

    function setLoadingState(isLoading) {
        loginButton.disabled = isLoading;
        loginButton.classList.toggle("loading", isLoading);
    }

    function showAlert(message, type) {
        alertText.textContent = message;
        alertMessage.className = "alert-message show " + type;

        alertIcon.className = type === "success"
            ? "fa-solid fa-circle-check"
            : "fa-solid fa-circle-exclamation";
    }

    function hideAlert() {
        alertMessage.className = "alert-message";
        alertText.textContent = "";
    }
});
