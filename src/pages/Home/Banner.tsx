import { Button } from "@/components/ui/button";
import banner from "../../assets/banner.avif";

const Banner = () => {
  return (
    <div className="bg-[#f4eee0] px-2 md:px-6 xl:pl-52 flex items-center gap-52">
      <div className="text-center space-y-6">
        <h4 className="text-lg font-medium">Notebook</h4>
        <h1 className="text-4xl font-semibold">
          Handwritten words <br /> have HEART
        </h1>
        <p className="">
          Available in landscape and portrait, our notecards are ideal for mini
          love <br /> letters, life updates and dinner party invites.
        </p>
        <Button>Shop Notebook</Button>
      </div>
      <div className="">
        <img src={banner} alt="" className="h-[500px]" />
      </div>
    </div>
  );
};

export default Banner;
