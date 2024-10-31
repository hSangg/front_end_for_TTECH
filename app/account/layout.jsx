import Header from "../../components/uncategory/Header";
import Navigator from "../../components/uncategory/Navigator";

export default function LoginLayout({ children }) {
  return (
    <>
      <div className="h-[70px]"></div>

      <div>
        <Header />
      </div>
      <div>
        <Navigator />
      </div>

      {children}
    </>
  );
}
