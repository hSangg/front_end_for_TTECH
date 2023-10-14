import Image from "next/image";

const AdminNavigator = ({ route, onRouteChange }) => {
  return (
    <div className="mx-4 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/0.5x/Asset_9@0.5x.png"}
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-[1.7rem] font-[800]">T-TECH</h1>
        </div>
        <ul className=" flex capitalize text-[1.4rem] gap-3 items-center">
          {["dashboard", "product", "order"].map((x, i) => (
            <li
              style={{ color: route === x ? "#db2777" : "black" }}
              onClick={() => {
                onRouteChange(x);
              }}
              className="cursor-pointer"
              key={i}
            >
              {x}
            </li>
          ))}
        </ul>
        <div>information</div>
      </div>
    </div>
  );
};

export default AdminNavigator;
