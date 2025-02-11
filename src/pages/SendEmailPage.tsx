import TaskAltIcon from "@mui/icons-material/TaskAlt"; // Assurez-vous que cette icône est installée et utilisée correctement
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import VantaBackground from "../components/VantaBackground";
import { sendEmail } from "../services/api/send_email";

// Interface pour les valeurs du formulaire
interface FormValues {
  email: string;
}

export default function SendEmailPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Validation du schéma avec Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'adresse email est requise"),
  });

  // Gestion de la soumission du formulaire
  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await sendEmail({ email: values.email });
      if (!response.error) {
        console.log("Password reset email request sent:", response);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/login");
        }, 5000);
      } else {
        console.error("Failed to send password reset email:", response.error);
      }
    } catch (error) {
      console.error("Failed to send password reset email:", error);
    }
  };
  return (
    <>
      <VantaBackground />

      <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-base-200">
        <div className="hero min-h-screen">
          <div className="hero-content  flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">SportEvents</h1>
              <p className="py-6">
                Connectez vous pour accéder au événements sportifs de votre club
                et de votre entourage
              </p>
            </div>
            <div className="card glass w-full max-w-sm shrink-0 shadow-2xl">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="card-body">
                    <div>
                      <h2 className="text-center text-white">
                        Veuillez renseigner votre adresse mail
                      </h2>
                      <div className="mt-10">
                        <label
                          htmlFor="email"
                          className="block mb-2 font-medium text-white"
                        >
                          Email
                        </label>
                        <Field
                          className="input input-bordered w-full "
                          type="email"
                          id="email"
                          name="email"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-red-500 "
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="mt-10">
                      <button type="submit" className="btn btn-primary w-full">
                        Envoyer
                      </button>
                      <p>
                        Si votre email est bien enregistré vous recevrez un
                        email de réinitialisation!
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className=" bg-base-100 p-8 text-center rounded-lg shadow-md w-full max-w-md">
            <p className="text-lg font-medium">
              Si votre email est bien enregistré, vous recevrez un email de
              réinitialisation !
            </p>
            <div className="flex justify-center mt-5">
              <TaskAltIcon
                className="text-green-500"
                style={{ fontSize: 40 }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
