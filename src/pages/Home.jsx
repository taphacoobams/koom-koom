import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPiggyBank, FaChartPie, FaCheckCircle, FaWallet } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === "demba@gmail.com" && loginPassword === "123456") {
      navigate("/dashboard");
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className="bg-white text-gray-800 relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <img src="/logo.png" alt="Logo KOOM-KOOM" className="h-12 cursor-pointer" />
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          Se connecter
        </button>
      </nav>

      {/* Hero */}
      <header className="text-center px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mx-auto">
          Imaginez pouvoir gérer chaque <span className="text-blue-600">franc</span> <br />
          <span className="bg-yellow-200 px-2">sans stress ni culpabilité</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-xl mx-auto">
          KOOM-KOOM vous aide à répartir automatiquement vos revenus entre dépenses, envies et épargnes.
        </p>

        <button
          onClick={() => setShowSignup(true)}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Commencer maintenant
        </button>
      </header>

      {/* How it works */}
      <section className="text-center px-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">Comment ça fonctionne ?</h2>
        <div className="space-y-4 max-w-2xl mx-auto text-left">
          {[
            "1. Déclarez vos revenus (salaire, ventes, transferts...)",
            "2. Définissez votre plan de répartition (Général, Loisirs, Épargne...)",
            "3. KOOM-KOOM répartit automatiquement votre solde",
            "4. Enregistrez vos dépenses et suivez l'évolution de chaque boîte",
            "5. Visualisez vos finances simplement et efficacement"
          ].map((step, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-md shadow-sm">
              {step}
            </div>
          ))}
        </div>
      </section>

      {/* Features avec icônes */}
      <section className="px-6 mb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Fonctionnalités clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <FaPiggyBank className="text-5xl text-blue-600 mb-3" />
            <p>Planification d'épargne automatisée</p>
          </div>
          <div className="flex flex-col items-center">
            <FaChartPie className="text-5xl text-blue-600 mb-3" />
            <p>Visualisation de vos finances en temps réel</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-5xl text-blue-600 mb-3" />
            <p>Gestion intuitive et rapide des dépenses</p>
          </div>
          <div className="flex flex-col items-center">
            <FaWallet className="text-5xl text-blue-600 mb-3" />
            <p>Plusieurs comptes : Wave, banque, espèces...</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <details className="bg-white p-4 rounded-lg shadow-sm">
            <summary className="cursor-pointer font-medium">Dois-je connecter mon compte bancaire ?</summary>
            <p className="text-sm mt-2 text-gray-600">Non, vous saisissez manuellement vos revenus et dépenses.</p>
          </details>
          <details className="bg-white p-4 rounded-lg shadow-sm">
            <summary className="cursor-pointer font-medium">Puis-je modifier mon plan à tout moment ?</summary>
            <p className="text-sm mt-2 text-gray-600">Oui, vous pouvez ajuster vos boîtes et pourcentages comme vous voulez.</p>
          </details>
          <details className="bg-white p-4 rounded-lg shadow-sm">
            <summary className="cursor-pointer font-medium">Est-ce gratuit ?</summary>
            <p className="text-sm mt-2 text-gray-600">Oui, l'utilisation est gratuite sans frais cachés.</p>
          </details>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Connexion</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Adresse e-mail</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="ex: vous@exemple.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Créer un compte</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowSignup(false);
                navigate("/dashboard");
              }}
            >
              <div>
                <label className="text-sm text-gray-600 block mb-1">Nom complet</label>
                <input type="text" className="w-full px-4 py-2 border rounded" placeholder="ex: Demba Koné" required />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Adresse e-mail</label>
                <input type="email" className="w-full px-4 py-2 border rounded" placeholder="ex: vous@exemple.com" required />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Mot de passe</label>
                <input type="password" className="w-full px-4 py-2 border rounded" placeholder="••••••••" required />
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
