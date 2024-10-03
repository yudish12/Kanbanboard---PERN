import { Oval } from "react-loader-spinner";

const FullPageLoader = () => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default FullPageLoader;
