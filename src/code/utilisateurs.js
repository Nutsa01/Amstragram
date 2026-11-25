import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { authFirebase, authGoogle, bd, collUtilisateurs } from "./init";
import { doc, setDoc, getDoc } from "firebase/firestore";


export async function connexion(ouvreNotification) {
  try {
    await signInWithPopup(authFirebase, authGoogle);
    // Envoie une notification de succes de connexion
    ouvreNotification('success', 'Connecté', 'Vous êtes connecté !', 2);
    // console.log("Utilisateur connecter");
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
  }
}

export async function deconnexion(ouvreNotification) {
  try {
    await signOut(authFirebase);
    // Envoie une notification de succes de deconnexion
    ouvreNotification('success', 'Déconnecté', 'Vous êtes déconnecté !', 2);
    // console.log("Utilisateur deconnecter");
  } catch (error) {
    console.error("Erreur lors de la deconnexion", error);
  }
}

export function observerEtatConnexion(mutateurUtil) {
  onAuthStateChanged(authFirebase, async (u) => {
    if (u) {
      // console.log("Uutil connecter:", u);
      try {
        const utilDocRef = doc(bd, collUtilisateurs, u.uid);
        const utilDoc = await getDoc(utilDocRef);
        if (!utilDoc.exists()) {
          // console.log("Cree nouveau document pour :", u.uid);
          await setDoc(
            utilDocRef,
            {
              nomComplet: u.displayName,
              avatar: u.photoURL,
              dcc: (new Date()).getTime(),
              courriel: u.email,
              // Initialise la ou on va mettre les informations supplementaires
              bio: "",
              dateNaissance: null,
              genre: null,
            },
            { merge: true }
          );
          // console.log("Document creer pour :", u.uid);
        } else {
          // console.log("Utilisateur existe deja :", u.uid);
          await setDoc(
            utilDocRef,
            {
              nomComplet: u.displayName,
              avatar: u.photoURL,
              dcc: (new Date()).getTime(),
              courriel: u.email,
              // On remet pas les info pour ne pas les reintialiser
            },
            { merge: true }
          );
          // console.log("Document mis a jour pour :", u.uid);
        }

        const utilDocAJour = await getDoc(utilDocRef);
        if (utilDocAJour.exists()) {
          const utilData = utilDocAJour.data();
          // console.log("Data de utilisateur :", utilData);
          mutateurUtil({
            ...utilData,
            uid: u.uid,
          });
        } else {
          // console.error("Document non existant apres creation pour :", u.uid);
        }
      } catch (error) {
        console.error("Erreur pendant le chargement de donnee", error);
      }
    } else {
      // console.log("Utilisateur non connecter");
      mutateurUtil(null);
    }
  });
}
