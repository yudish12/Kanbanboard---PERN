import { useState } from "react";
import { useAuthContext } from "../../context/hooks";
import { Oval } from "react-loader-spinner";

const GoogleBtn = () => {
  const { googleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await googleLogin();
    setLoading(false);
  };
  return (
    <button
      style={{
        padding: "10px 20px",
      }}
      className="bg-primary text-white rounded-lg mt-2 font-semibold flex justify-center items-center gap-2"
      onClick={handleGoogleLogin}
    >
      Sign in with Google
      {loading && (
        <Oval
          visible={true}
          height="30"
          width="30"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </button>
  );
};

export default GoogleBtn;
