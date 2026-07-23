document.addEventListener("DOMContentLoaded", function () {

            const loginForm =
                document.getElementById("login-form");

            const identifierInput =
                document.getElementById("identifier");

            const passwordInput =
                document.getElementById("password");

            const passwordToggle =
                document.getElementById("password-toggle");

            const passwordToggleIcon =
                document.getElementById("password-toggle-icon");

            const loginButton =
                document.getElementById("login-button");

            const alertMessage =
                document.getElementById("alert-message");

            const alertText =
                document.getElementById("alert-text");

            const alertIcon =
                document.getElementById("alert-icon");

            const forgotPasswordLink =
                document.getElementById("forgot-password-link");


            /*
            =========================================
            AFFICHER OU MASQUER LE MOT DE PASSE
            =========================================
            */

            passwordToggle.addEventListener("click", function () {

                const passwordIsHidden =
                    passwordInput.type === "password";

                passwordInput.type =
                    passwordIsHidden ? "text" : "password";

                passwordToggleIcon.className =
                    passwordIsHidden
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


            /*
            =========================================
            RETIRER LES ERREURS PENDANT LA SAISIE
            =========================================
            */

            identifierInput.addEventListener("input", function () {

                identifierInput.classList.remove("input-error");

                hideAlert();

            });

            passwordInput.addEventListener("input", function () {

                passwordInput.classList.remove("input-error");

                hideAlert();

            });


            /*
            =========================================
            SOUMISSION DU FORMULAIRE
            =========================================
            */

            loginForm.addEventListener("submit", function (event) {

                event.preventDefault();

                const identifier =
                    identifierInput.value.trim();

                const password =
                    passwordInput.value.trim();

                let formIsValid = true;


                identifierInput.classList.remove("input-error");
                passwordInput.classList.remove("input-error");

                hideAlert();


                if (identifier === "") {

                    identifierInput.classList.add("input-error");

                    formIsValid = false;

                }


                if (password === "") {

                    passwordInput.classList.add("input-error");

                    formIsValid = false;

                }


                if (!formIsValid) {

                    showAlert(
                        "Veuillez renseigner votre identifiant et votre mot de passe.",
                        "error"
                    );

                    return;

                }


                setLoadingState(true);


                /*
                =========================================
                FUTURE CONNEXION À GOOGLE APPS SCRIPT
                =========================================

                Ici, nous ajouterons plus tard l'appel à
                Google Apps Script pour vérifier les
                identifiants dans Google Sheets.

                Exemple futur :

                fetch(API_URL, {
                    method: "POST",
                    body: JSON.stringify({
                        action: "login",
                        identifier: identifier,
                        password: password
                    })
                });

                Pour le moment, aucune connexion réelle
                n'est effectuée.
                */


                setTimeout(function () {

                    setLoadingState(false);

                    showAlert(
                        "La page de connexion est prête. L'authentification sera activée lors de la connexion à Google Sheets.",
                        "success"
                    );

                }, 900);

            });


            /*
            =========================================
            MOT DE PASSE OUBLIÉ
            =========================================
            */

            forgotPasswordLink.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showAlert(
                        "La récupération du mot de passe sera activée avec le système d'authentification.",
                        "success"
                    );

                }
            );


            /*
            =========================================
            FONCTIONS UTILITAIRES
            =========================================
            */

            function setLoadingState(isLoading) {

                loginButton.disabled = isLoading;

                loginButton.classList.toggle(
                    "loading",
                    isLoading
                );

            }


            function showAlert(message, type) {

                alertText.textContent = message;

                alertMessage.className =
                    "alert-message show " + type;

                alertIcon.className =
                    type === "success"
                        ? "fa-solid fa-circle-check"
                        : "fa-solid fa-circle-exclamation";

            }


            function hideAlert() {

                alertMessage.className =
                    "alert-message";

                alertText.textContent = "";

            }

        });
