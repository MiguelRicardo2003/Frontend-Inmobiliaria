// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { authService } from "@/modules/auth/services/auth.services";
// import type { RegisterCandidateDto, RegisterCompanyDto, Role } from "@/modules/auth/types/Auth.types";

// export const useFormRegister = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   // Candidate form with confirmPassword for local validation
//   const [candidateForm, setCandidateForm] = useState<RegisterCandidateDto & { confirmPassword?: string }>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     country: "",
//     city: "",
//     birthDate: "",
//     gender: "male" as const,
//     available: false,
//     experienceYears: 0,
//   });

//   // Company form with confirmPassword for local validation
//   const [companyForm, setCompanyForm] = useState<RegisterCompanyDto & { confirmPassword?: string }>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     nit: "",
//     description: "",
//     country: "",
//     city: "",
//     address: "",
//     sector: "",
//   });

//   const updateCandidateField = (field: keyof (RegisterCandidateDto & { confirmPassword?: string }), value: any) => {
//     setCandidateForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const updateCompanyField = (field: keyof (RegisterCompanyDto & { confirmPassword?: string }), value: any) => {
//     setCompanyForm((prev) => ({ ...prev, [field]: value }));
//   };

//   // Validation functions for candidate steps
//   const canContinueCandidateStep1 = () =>
//     candidateForm.firstName.trim().length >= 2 &&
//     candidateForm.firstName.trim().length <= 50 &&
//     candidateForm.lastName.trim().length >= 2 &&
//     candidateForm.lastName.trim().length <= 50 &&
//     /.+@.+\..+/.test(candidateForm.email) &&
//     !!candidateForm.phone;

//   const canContinueCandidateStep2 = () =>
//     candidateForm.password.length >= 6 &&
//     candidateForm.password === candidateForm.confirmPassword &&
//     !!candidateForm.country &&
//     !!candidateForm.city &&
//     !!candidateForm.birthDate &&
//     !!candidateForm.gender &&
//     candidateForm.available !== undefined;

//   const canContinueCandidateStep3 = () =>
//     candidateForm.experienceYears >= 0;

//   // Validation functions for company steps
//   const canContinueCompanyStep1 = () =>
//     companyForm.name.trim().length >= 2 &&
//     companyForm.nit.trim().length >= 5 &&
//     /.+@.+\..+/.test(companyForm.email) &&
//     companyForm.password.length >= 6 &&
//     companyForm.password === companyForm.confirmPassword;

//   const canContinueCompanyStep2 = () =>
//     !!companyForm.country &&
//     !!companyForm.city &&
//     !!companyForm.address &&
//     companyForm.description.trim().length >= 20;

//   const canContinueCompanyStep3 = () =>
//     !!companyForm.sector;

//   // Steps 4 and 5 are optional for both flows
//   const canContinueOptionalStep = () => true;

//   // Determine which validation function to use based on current step and role
//   const getCanContinue = (step: number, role: Role) => {
//     if (role === 'candidate') {
//       switch(step) {
//         case 1: return canContinueCandidateStep1();
//         case 2: return canContinueCandidateStep2();
//         case 3: return canContinueCandidateStep3();
//         case 4: case 5: return canContinueOptionalStep();
//         default: return true;
//       }
//     } else if (role === 'company') {
//       switch(step) {
//         case 1: return canContinueCompanyStep1();
//         case 2: return canContinueCompanyStep2();
//         case 3: return canContinueCompanyStep3();
//         default: return true;
//       }
//     }
//     return true;
//   };

//   const resetForms = () => {
//     setCandidateForm({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       firstName: "",
//       lastName: "",
//       country: "",
//       city: "",
//       birthDate: "",
//       gender: "male" as const,
//       available: false,
//       experienceYears: 0,
//     });
//     setCompanyForm({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       nit: "",
//       description: "",
//       country: "",
//       city: "",
//       address: "",
//       sector: "",
//     });
//     setAcceptedTerms(false);
//   };

//   const handleSubmit = async (role: Role) => {
//     // Validar términos y condiciones
//     if (!acceptedTerms) {
//       toast.error("Términos y condiciones requeridos", {
//         description: "Debes aceptar los términos y condiciones para continuar con el registro."
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);

//       if (role === 'candidate') {
//         // Extract confirmPassword from candidate payload
//         const { confirmPassword, ...payload } = candidateForm;
//         const res = await authService.registerCandidate(payload);
//         if (res.success) {
//           toast.success("¡Registro exitoso!", {
//             description: "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión."
//           });
//           navigate("/auth");
//         } else {
//           toast.error("Error en el registro", {
//             description: res.message || "Hubo un error al registrar tu cuenta. Intenta nuevamente."
//           });
//         }
//       } else if (role === 'company') {
//         // Extract confirmPassword from company payload
//         const { confirmPassword, ...payload } = companyForm;
//         const res = await authService.registerCompany(payload);
//         if (res.success) {
//           toast.success("¡Registro exitoso!", {
//             description: "Tu empresa ha sido registrada correctamente. Ahora puedes iniciar sesión."
//           });
//           navigate("/auth");
//         } else {
//           toast.error("Error en el registro", {
//             description: res.message || "Hubo un error al registrar la empresa. Intenta nuevamente."
//           });
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     // Loading state
//     isLoading,
//     setIsLoading,

//     // Terms acceptance
//     acceptedTerms,
//     setAcceptedTerms,

//     // Forms
//     candidateForm,
//     setCandidateForm,
//     companyForm,
//     setCompanyForm,

//     // Form updaters
//     updateCandidateField,
//     updateCompanyField,

//     // Validation functions
//     getCanContinue,
//     canContinueCandidateStep1,
//     canContinueCandidateStep2,
//     canContinueCandidateStep3,
//     canContinueCompanyStep1,
//     canContinueCompanyStep2,
//     canContinueCompanyStep3,
//     canContinueOptionalStep,

//     // Utilities
//     resetForms,
//     handleSubmit,
//   };
// };
