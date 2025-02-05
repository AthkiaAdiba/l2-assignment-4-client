import { IoMdStar } from "react-icons/io";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import footerIcons from "../../assets/footericons.png";

// flex justify-evenly
const Footer = () => {
  return (
    <div className="bg-[#1e2525] text-[#f4eee0] pt-10 px-4 md:px-10 lg:px-14 xl:px-28 pb-16 mt-28">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 md:gap-10 lg:gap-0">
        {/* 1st column */}
        <div className="text-start flex flex-col space-y-3">
          <p className="font-medium text-lg">Papier</p>
          <a href="" className="link link-hover hover:underline">
            Designers
          </a>
          <a href="" className="link link-hover hover:underline">
            Gift Cards
          </a>
          <a href="" className="link link-hover hover:underline">
            Business & Bulk Orders
          </a>
          <a href="" className="link link-hover hover:underline">
            Wholesale
          </a>
          <a href="" className="link link-hover hover:underline">
            Online Magazine
          </a>
        </div>

        {/* 2nd column */}
        <div className="text-start flex flex-col space-y-3">
          <p className="font-medium text-lg">Resources</p>
          <a href="" className="link link-hover hover:underline">
            Promotions
          </a>
          <a href="" className="link link-hover hover:underline">
            Student & Graduate Discount
          </a>
          <a href="" className="link link-hover hover:underline">
            Refer a Friend: Get $10 off
          </a>
          <a href="" className="link link-hover hover:underline">
            Email: Sign up for 10% off
          </a>
          <a href="" className="link link-hover hover:underline">
            Black Friday
          </a>
          <a href="" className="link link-hover hover:underline">
            Advent Calendar
          </a>
        </div>

        {/* 3rd column */}
        <div className="text-start flex flex-col space-y-3">
          <p className="font-medium text-lg">Company</p>
          <a href="" className="link link-hover hover:underline">
            About Us
          </a>
          <a href="" className="link link-hover hover:underline">
            Store Locator
          </a>
          <a href="" className="link link-hover hover:underline">
            Careers
          </a>
          <a href="" className="link link-hover hover:underline">
            Sustainability
          </a>
          <a href="" className="link link-hover hover:underline">
            Sitemap
          </a>
        </div>

        {/* 4th column */}
        <div className="text-start flex flex-col space-y-3">
          <p className="font-medium text-lg">Contact Us</p>
          <a href="" className="link link-hover hover:underline">
            FAQ
          </a>
          <a href="" className="link link-hover hover:underline">
            Contact Us
          </a>
          <a href="" className="link link-hover hover:underline">
            Shipping
          </a>
          <a href="" className="link link-hover hover:underline">
            Returns
          </a>
          <a href="" className="link link-hover hover:underline">
            Terms & Conditions
          </a>
        </div>

        {/* 5th column */}
        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
          </div>
          <p className="pb-3">4.75 rating 16,000+ reviews</p>
          <a href="" className="link link-hover hover:underline">
            Read all our reviews
          </a>
        </div>
      </div>

      {/* image row */}
      <div className="mt-14">
        <img src={logo} alt="" className="h-20 w-20 mx-auto" />
      </div>

      {/* last row */}
      <div className="flex flex-col md:flex-col lg:flex-row justify-around items-center gap-8 mt-14">
        <div className="flex items-center gap-4">
          <FaInstagram />
          <IoLogoTiktok />
          <FaPinterest />
          <FaFacebookF />
        </div>

        <div className="flex items-center gap-3">
          <p>© 2025 Papier</p>
          <div className="space-x-5">
            <a href="" className="link link-hover hover:underline">
              Privacy
            </a>
            <a href="" className="link link-hover hover:underline">
              Ts&Cs
            </a>
            <a href="" className="link link-hover hover:underline">
              Cookies
            </a>
          </div>
        </div>
        <div>
          <img src={footerIcons} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
