import Header from "./Header";

// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={mainStyle}>{children}</main>
    </div>
  );
};

const mainStyle = {
  padding: "20px",
};

export default AppLayout;
