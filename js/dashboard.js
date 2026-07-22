// ========================================
// DONNÉES DE SIMULATION
// ========================================

const dashboardData = {
    revenus: {
        valeur: 4520000,
        evolution: 12
    },

    commandes: {
        valeur: 328,
        evolution: 8
    },

    produits: {
        valeur: 1245,
        evolution: 5
    },

    clients: {
        valeur: 892,
        evolution: -2
    }
};


// ========================================
// FONCTIONS DE FORMATAGE
// ========================================

function formatNombre(nombre) {
    return new Intl.NumberFormat("fr-FR").format(nombre);
}


// ========================================
// AFFICHAGE DES KPI
// ========================================

function mettreAJourCarte(nom, donnees, unite = "") {
    const valeurElement = document.getElementById(`${nom}-value`);
    const tendanceElement = document.getElementById(`${nom}-trend`);

    if (!valeurElement || !tendanceElement) {
        console.error(`Éléments introuvables pour la carte : ${nom}`);
        return;
    }

    valeurElement.textContent =
        `${formatNombre(donnees.valeur)}${unite}`;

    const evolutionPositive = donnees.evolution >= 0;

    if (evolutionPositive) {
        tendanceElement.textContent =
            `↑ +${donnees.evolution}% ce mois`;

        tendanceElement.classList.remove("down");
        tendanceElement.classList.add("up");
    } else {
        tendanceElement.textContent =
            `↓ ${donnees.evolution}% ce mois`;

        tendanceElement.classList.remove("up");
        tendanceElement.classList.add("down");
    }
}


function afficherKPIPrincipaux() {
    mettreAJourCarte(
        "revenus",
        dashboardData.revenus,
        " FCFA"
    );

    mettreAJourCarte(
        "commandes",
        dashboardData.commandes
    );

    mettreAJourCarte(
        "produits",
        dashboardData.produits
    );

    mettreAJourCarte(
        "clients",
        dashboardData.clients
    );
}


// ========================================
// INITIALISATION DU DASHBOARD
// ========================================

function initialiserDashboard() {
    console.log("dashboard.js chargé");

    afficherKPIPrincipaux();
}


// ========================================
// DÉMARRAGE
// ========================================

document.addEventListener("DOMContentLoaded", initialiserDashboard);
