// import { useState } from "react";
// import type { StepCandidateProps } from "@/modules/auth/types/Auth.types";
// import type { Country } from "@/shared/utils/phone.utils";
// import { useMemo, useEffect } from "react";
// import { getCountriesList, validatePhoneNumber, formatPhoneNumber } from "@/shared/utils/phone.utils";

// export const useStepsCandidates = (form: StepCandidateProps["form"], updateField: StepCandidateProps["updateField"]) => {
//         // Step 1
//         const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
//         const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
//         const [phoneError, setPhoneError] = useState<string>("");
//         const [searchQuery, setSearchQuery] = useState<string>("");

//         // Step 2
//         const [showPassword, setShowPassword] = useState(false);
//         const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//         // Step 4
//         const [newSkill, setNewSkill] = useState("");
//         const [newLanguage, setNewLanguage] = useState({ language: "", level: "" });

//         // Step 5
//         const [newEducation, setNewEducation] = useState({
//             institution: "",
//             degree: "",
//             startDate: "",
//             endDate: "",
//             description: ""
//         });

//         // Step 1
//         const countries = useMemo(() => getCountriesList(), []);

//         const filteredCountries = useMemo(() => {
//           if (!searchQuery) return countries;
//           return countries.filter(country =>
//             country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             country.callingCode.includes(searchQuery)
//           );
//         }, [countries, searchQuery]);

//         // Set default country (CO) on component mount
//         useEffect(() => {
//           const defaultCountry = countries.find(country => country.code === 'CO');
//           if (defaultCountry) {
//             setSelectedCountry(defaultCountry);
//           }
//         }, [countries]);

//         // Close dropdown when clicking outside
//         useEffect(() => {
//           const handleClickOutside = (event: MouseEvent) => {
//             const target = event.target as Element;
//             if (!target.closest('.country-dropdown')) {
//               setIsCountryDropdownOpen(false);
//               setSearchQuery("");
//             }
//           };

//           if (isCountryDropdownOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//             return () => document.removeEventListener('mousedown', handleClickOutside);
//           }
//         }, [isCountryDropdownOpen]);

//         useEffect(() => {
//           const handleEscape = (event: KeyboardEvent) => {
//             if (event.key === 'Escape' && isCountryDropdownOpen) {
//               setIsCountryDropdownOpen(false);
//               setSearchQuery("");
//             }
//           };

//           if (isCountryDropdownOpen) {
//             document.addEventListener('keydown', handleEscape);
//             return () => document.removeEventListener('keydown', handleEscape);
//           }
//         }, [isCountryDropdownOpen]);

//         const handlePhoneChange = (value: string) => {
//           updateField("phone", value);

//           if (value && selectedCountry) {
//             const validation = validatePhoneNumber(value, selectedCountry.code);
//             if (!validation.isValid) {
//               setPhoneError(validation.error || "Invalid phone number");
//             } else {
//               setPhoneError("");
//               // Auto-format the phone number
//               const formatted = formatPhoneNumber(value, selectedCountry.code, 'NATIONAL');
//               if (formatted && formatted !== value) {
//                 updateField("phone", formatted);
//               }
//             }
//           } else {
//             setPhoneError("");
//           }
//         };

//         const handleCountrySelect = (country: Country) => {
//           setSelectedCountry(country);
//           setIsCountryDropdownOpen(false);
//           setSearchQuery("");
//           setPhoneError("");

//           if (form.phone) {
//             const validation = validatePhoneNumber(form.phone, country.code);
//             if (!validation.isValid) {
//               setPhoneError(validation.error || "Invalid phone number");
//             } else {
//               setPhoneError("");
//             }
//           }
//         };

//         const [newWork, setNewWork] = useState({
//             company: "",
//             position: "",
//             startDate: "",
//             endDate: "",
//             description: ""
//         });

//         const [showEducationForm, setShowEducationForm] = useState(false);
//         const [showWorkForm, setShowWorkForm] = useState(false);


//         // Step 4
//         const handleAddSkill = () => {
//             if (newSkill.trim()) {
//                 const updatedSkills = [...(form.skills || []), newSkill.trim()];
//                 updateField("skills", updatedSkills);
//                 setNewSkill("");
//             }
//         };

//         const handleRemoveSkill = (index: number) => {
//             const updatedSkills = (form.skills || []).filter((_, i) => i !== index);
//             updateField("skills", updatedSkills);
//         };

//         const handleAddLanguage = () => {
//             if (newLanguage.language.trim() && newLanguage.level) {
//                 const updatedLanguages = [...(form.languages || []), { ...newLanguage }];
//                 updateField("languages", updatedLanguages);
//                 setNewLanguage({ language: "", level: "" });
//             }
//         };

//         const handleRemoveLanguage = (index: number) => {
//             const updatedLanguages = (form.languages || []).filter((_, i) => i !== index);
//             updateField("languages", updatedLanguages);
//         };

//         // Step 5
//         const handleAddEducation = () => {
//           if (newEducation.institution && newEducation.degree && newEducation.startDate && newEducation.endDate) {
//             const updatedEducation = [...(form.education || []), { ...newEducation }];
//             updateField("education", updatedEducation);
//             setNewEducation({
//               institution: "",
//               degree: "",
//               startDate: "",
//               endDate: "",
//               description: ""
//             });
//             setShowEducationForm(false);
//           }
//         };

//         const handleRemoveEducation = (index: number) => {
//           const updatedEducation = (form.education || []).filter((_, i) => i !== index);
//           updateField("education", updatedEducation);
//         };

//         const handleAddWork = () => {
//           if (newWork.company && newWork.position && newWork.startDate && newWork.endDate) {
//             const updatedWork = [...(form.workExperience || []), { ...newWork }];
//             updateField("workExperience", updatedWork);
//             setNewWork({
//               company: "",
//               position: "",
//               startDate: "",
//               endDate: "",
//               description: ""
//             });
//             setShowWorkForm(false);
//           }
//         };

//         const handleRemoveWork = (index: number) => {
//           const updatedWork = (form.workExperience || []).filter((_, i) => i !== index);
//           updateField("workExperience", updatedWork);
//         };

//         // Step 6
//         const formatGender = (gender: string) => {
//           const genders: Record<string, string> = {
//             male: "Masculino",
//             female: "Femenino",
//             other: "Otro"
//           };
//           return genders[gender] || gender;
//         };

//         const maskPassword = (password: string) => '•'.repeat(password.length);


//     return {
//         // Step 1
//         selectedCountry,
//         setSelectedCountry,
//         isCountryDropdownOpen,
//         setIsCountryDropdownOpen,
//         phoneError,
//         setPhoneError,
//         searchQuery,
//         setSearchQuery,
//         filteredCountries,
//         handleCountrySelect,
//         handlePhoneChange,

//         // Step 2
//         showPassword,
//         setShowPassword,
//         showConfirmPassword,
//         setShowConfirmPassword,

//         // Step 4
//         newSkill,
//         setNewSkill,
//         newLanguage,
//         setNewLanguage,
//         handleAddSkill,
//         handleRemoveSkill,
//         handleAddLanguage,
//         handleRemoveLanguage,

//         // Step 5
//         newEducation,
//         setNewEducation,
//         newWork,
//         setNewWork,
//         showEducationForm,
//         setShowEducationForm,
//         showWorkForm,
//         setShowWorkForm,
//         handleAddEducation,
//         handleRemoveEducation,
//         handleAddWork,
//         handleRemoveWork,

//         // Step 6
//         formatGender,
//         maskPassword,
//     };
// };
