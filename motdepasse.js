const bcrypt = require("bcrypt");

const password = "danick072"; // Le mot de passe à hacher
const saltRounds = 10; // Nombre de tours pour générer le sel

// Hacher le mot de passe
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error("Erreur lors du hachage du mot de passe :", err);
    return;
  }

  console.log("Mot de passe haché :", hash);

  // Exemple de vérification du mot de passe
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification du mot de passe :", err);
      return;
    }

    if (result) {
      console.log("Le mot de passe correspond !");
    } else {
      console.log("Le mot de passe est incorrect.");
    }
  });
});
