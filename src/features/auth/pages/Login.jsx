import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane } from "lucide-react"; 
import Google from "@/assets/icons/google.svg?react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const authenticateViaOAuth = () => {
    setLoading(true);

    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google?redirect=${redirect}`;

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-5">
      <Card className="w-full max-w-[450px] mx-auto md:p-10 p-5 rounded-4xl">
        <CardHeader className="flex flex-col items-center">
          <Plane
            size={32}
            className="gradient-btn box-content p-3 rounded-4xl mb-2"
          />
          <CardTitle className="text-2xl gradient-text font-bold mb-2">
            Journey Craft 
          </CardTitle>
          <CardDescription className="mb-3">
            Plan your perfect trip with AI
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col items-center gap-2 bg-transparent md:pb-10 pb-5">
          <CardDescription className="mt-[15px]">
            Sign in to continue
          </CardDescription>
          <Button
            variant="outline"
            className={`${loading ? "opacity-60" : "opacity-100"} w-full mt-3 py-1.5 cursor-pointer box-content rounded-2xl`}
            onClick={authenticateViaOAuth}
          >
            <Google />
            <p>{loading ? "Signing in..." : "Continue with Google"}</p>
          </Button>
          <p className="text-center text-xs mt-4 text-muted-foreground font-medium">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
