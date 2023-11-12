# TheBradery
# Creation d'une application de paiement

•	Panier : Les utilisateurs doivent pouvoir ajouter des produits à leur panier, en respectant la limite de stock disponible.
•	Page de Paiement : Une fois les produits ajoutés, les utilisateurs doivent pouvoir se diriger vers une page de paiement et passer une commande.
•	Commandes: Après avoir passé une commande, une entrée doit être créée dans la base de données avec le prix total et chaque article de la commande. Le stock de produits doit également être mis à jour.


## Installation

### Backend (Express)

1. Cloner le répertoire du projet.
2. Naviguer vers le répertoire backend : `cd BackApp--- cd newAPP`.
3. Installer les dépendances : `npm install`.
4. Démarrer le serveur Express : `node app.js`.

Le serveur devrait être accessible à l'adresse [http://localhost:3001](http://localhost:3001).

### Frontend (React)

1. Naviguer vers le répertoire frontend : `cd front--- cd front-app`.
2. Installer les dépendances : `npm install`.
3. Démarrer l'application React : `npm start`.

L'application React devrait être accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Configuration

### Base de données

Assurez-vous d'avoir configuré la base de données selon le script fourni dans le répertoire `database`.

### Variables d'Environnement

Vous pouvez configurer certaines variables d'environnement dans un fichier `.env`. Un exemple peut être trouvé dans le fichier `.env.example`.

## Fonctionnalités

- **Panier**: Les utilisateurs peuvent ajouter des produits à leur panier, respectant la limite de stock disponible.
- **Page de Paiement**: Les utilisateurs peuvent se diriger vers une page de paiement et passer une commande.
- **Commandes**: Une entrée est créée dans la base de données après avoir passé une commande, avec le prix total et chaque article de la commande. Le stock de produits est également mis à jour.

## Routes API

- **GET `/api/products`**: Récupère la liste des produits.
- **POST `/api/add-to-cart`**: Ajoute un produit au panier.
- **POST `/api/checkout`**: Finalise une commande.

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des problèmes, des demandes d'amélioration ou des pull requests.

## Auteurs
Mbengue Mohamed Makhtar
