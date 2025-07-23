import { Plus } from "lucide-react";
import  Button  from "../Button";

const NewItemButton = ({ label = "Nuevo", onClick, className = "" }) => {
  return (
    <Button onClick={onClick} className={className}>
      <Plus className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default NewItemButton;
