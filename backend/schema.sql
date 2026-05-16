CREATE DATABASE IF NOT EXISTS fmc_style
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE fmc_style;

CREATE TABLE utilisateurs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telephone VARCHAR(40),
  motDePasse VARCHAR(255) NOT NULL,
  role ENUM('client', 'admin', 'employe') DEFAULT 'client',
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL
);

CREATE TABLE services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  prix DECIMAL(10, 2) NOT NULL,
  duree INT UNSIGNED NOT NULL,
  image VARCHAR(255),
  estActif BOOLEAN DEFAULT TRUE,
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL
);

CREATE TABLE employes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  utilisateurId INT UNSIGNED NOT NULL,
  titrePoste VARCHAR(120) NOT NULL,
  joursTravail JSON NOT NULL,
  heureDebut VARCHAR(5) DEFAULT '09:00',
  heureFin VARCHAR(5) DEFAULT '18:00',
  estActif BOOLEAN DEFAULT TRUE,
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL,
  CONSTRAINT fk_employes_utilisateur
    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id)
    ON DELETE CASCADE
);

CREATE TABLE competences_employes (
  employeId INT UNSIGNED NOT NULL,
  serviceId INT UNSIGNED NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (employeId, serviceId),
  FOREIGN KEY (employeId) REFERENCES employes(id) ON DELETE CASCADE,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE rendez_vous (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  clientId INT UNSIGNED NOT NULL,
  serviceId INT UNSIGNED NOT NULL,
  employeId INT UNSIGNED NOT NULL,
  date DATE NOT NULL,
  heure VARCHAR(5) NOT NULL,
  statut ENUM('en_attente', 'confirme', 'annule', 'termine') DEFAULT 'en_attente',
  statutPaiement ENUM('en_attente', 'paye') DEFAULT 'en_attente',
  notes TEXT,
  imagesInspiration JSON NOT NULL,
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL,
  UNIQUE KEY unique_employe_creneau (employeId, date, heure),
  FOREIGN KEY (clientId) REFERENCES utilisateurs(id),
  FOREIGN KEY (serviceId) REFERENCES services(id),
  FOREIGN KEY (employeId) REFERENCES employes(id)
);

CREATE TABLE promotions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  description TEXT,
  typeRemise ENUM('pourcentage', 'fixe') NOT NULL,
  valeur DECIMAL(10, 2) NOT NULL,
  dateDebut DATE,
  dateFin DATE,
  estActive BOOLEAN DEFAULT TRUE,
  image VARCHAR(255),
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL
);

CREATE TABLE promotions_services (
  promotionId INT UNSIGNED NOT NULL,
  serviceId INT UNSIGNED NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (promotionId, serviceId),
  FOREIGN KEY (promotionId) REFERENCES promotions(id) ON DELETE CASCADE,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE paiements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rendezVousId INT UNSIGNED NOT NULL,
  montant DECIMAL(10, 2) NOT NULL,
  remiseAppliquee DECIMAL(10, 2) DEFAULT 0,
  montantFinal DECIMAL(10, 2) NOT NULL,
  methode VARCHAR(80) DEFAULT 'simulation',
  statut ENUM('en_attente', 'complete', 'echoue') DEFAULT 'en_attente',
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL,
  FOREIGN KEY (rendezVousId) REFERENCES rendez_vous(id) ON DELETE CASCADE
);

CREATE TABLE conversations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  utilisateurId INT UNSIGNED NOT NULL,
  messages JSON NOT NULL,
  contexte JSON NOT NULL,
  creeLe DATETIME NOT NULL,
  modifieLe DATETIME NOT NULL,
  FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id) ON DELETE CASCADE
);
