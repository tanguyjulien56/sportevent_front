import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../services/api/auth";
import { useUser } from "../services/Context/UserContext";
import LoginInterface from "../services/interfaces/Login";

const LoginPage: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [errorAuthentification, setErrorAuthentification] =
    useState<boolean>(false);
  const { setUser } = useUser();

  // Vérifier les informations de connexion enregistrées
  const rememberMeCredentials = localStorage.getItem("rememberMeCredentials");
  const initialValues: LoginInterface = {
    email: rememberMeCredentials ? JSON.parse(rememberMeCredentials).email : "",
    password: "",
    rememberMe: rememberMeCredentials ? true : false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'adresse email est requise"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  const handleSubmit = async (values: LoginInterface) => {
    console.log("handleSubmit appelé avec les valeurs :", values);
    try {
      const response = await login(values);
      console.log("API response:", response);
      if (response && response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }
        setUser(response.user);
        console.log("Connexion réussie :", response.user);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Gérer "Se souvenir de moi"
        if (values.rememberMe) {
          localStorage.setItem(
            "rememberMeCredentials",
            JSON.stringify({
              email: values.email,
            })
          );
        } else {
          localStorage.removeItem("rememberMeCredentials");
        }

        // Rediriger vers la page d'accueil
        setRedirectUrl("/");
      } else {
        setErrorAuthentification(true);
      }
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setErrorAuthentification(true);
    }
  };

  if (redirectUrl) {
    console.log("🚀 ~ redirectUrl:", redirectUrl);
    return <Navigate to={redirectUrl} />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-base-200 ">
        <div className="hero min-h-screen">
          <div className="hero-content  flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl  font-bold">SportEvents</h1>
              <p className="py-6 ">
                Connectez vous pour accéder au événements sportifs de votre club
                et de votre entourage
              </p>
            </div>
            <div className="card glass w-full max-w-sm shrink-0 shadow-2xl">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="card-body">
                  <div className="form-control">
                    <label htmlFor="email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Field
                      className="input input-bordered w-full"
                      type="email"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      component="div"
                      className="text-red-500"
                      name="email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="label">
                      <span className="label-text">Mot de passe</span>
                    </label>
                    <Field
                      className="input input-bordered w-full"
                      type="password"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      component="div"
                      className="text-red-500"
                      name="password"
                    />
                  </div>

                  {errorAuthentification && (
                    <p className="text-red-500">Vous n'êtes pas autorisé.</p>
                  )}
                  <NavLink
                    className="label-text-alt link link-hover"
                    to="/send_email"
                  >
                    Mot de passe oublié ?
                  </NavLink>
                  <div className="flex  items-center my-2">
                    <Field type="checkbox" id="rememberMe" name="rememberMe" />
                    <label className="label-text-alt ml-2" htmlFor="rememberMe">
                      Se souvenir de moi ?
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Se connecter
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
