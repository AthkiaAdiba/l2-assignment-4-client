import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Newsletter = () => {
  return (
    <div className="px-2 md:px-6 xl:px-28 mt-28 mb-5 py-16 bg-[#f3d5c2]">
      <div className="space-y-7">
        <p className="text-lg text-center">LET’S KEEP IN TOUCH</p>
        <h1 className="text-5xl font-bold text-center ">
          Enjoy 10% OFF your first order
        </h1>
        <p className="text-center ">
          Occasionally we like non-paper post too. Sign up below and we promise
          you'll like it too – look out in your inbox <br /> for a lovely promo
          code.
        </p>
        <div className="flex flex-col items-start max-w-sm mx-auto">
          <Label htmlFor="email" className="pb-2 text-lg">
            Sign up to our emails:
          </Label>
          <div className="flex w-full">
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md rounded-r-none"
            />
            <Button className="rounded-l-none">Sign me up</Button>
          </div>
        </div>
        <p className="text-center">
          By signing up, you agree to receive promotional marketing messages
          from <br /> Papier. View Terms & Privacy. Offer cannot be combined
          with any other promotion or discount.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
