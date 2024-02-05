
import image from "../../assets/images/weather2.jpg"
import BannerCard from "./BannerCard";
const Banner = () => {

    return (
      <div>
        <div className="relative">
          <img src={image} alt="" />
          <div className="absolute flex items-center h-full top-0 left-0 right-5 bottom-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00) 100%)] "></div>
  
          <div>
            {/* Banned Text */}
            <div className="absolute top-14 ml-28 lg:top-[200px]  lg:ml-12 font-semibold">
                    <h1 className="text-xl lg:text-5xl text-white">
                    <p>Weather Forecasting</p>
                    </h1>
            </div>

            {/* BannerCard */}
            <div className="hidden lg:flex absolute top-5 right-0">
                <BannerCard></BannerCard>
            </div>
          </div>

        </div>
      </div>
    );
  };
  
  export default Banner;
  