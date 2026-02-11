import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Client Portal Coming Soon",
      description: "Our client dashboard is currently under development. Contact us for access.",
    });
    navigate("/");
  }, [navigate, toast]);

  return null;
};

export default Login;
