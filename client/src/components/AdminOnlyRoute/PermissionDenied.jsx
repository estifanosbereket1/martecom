import { Link } from "react-router-dom";
import img403 from "../../assets/403img.svg";
import forbidden from "../../assets/forbidden-two.png";

import ButtonPrimary from "../Button/ButtonPrimary";
import { PiHouseLineBold } from "react-icons/pi";

const PermissionDenied = () => {
  return (
    <div>
      <div className="flex grow items-center px-6 xl:px-10 my-10">
        <div className="mx-auto text-center">
          <div className="relative mx-auto max-w-[370px]">
            <img
              src={img403}
              alt="forbidden"
              className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
            />
            <img
              src={forbidden}
              alt="forbidden"
              className="absolute right-10 top-10 aspect-auto max-w-[100px] dark:right-0 dark:top-5 dark:invert "
            />
          </div>
          <h1 className="text-2xl font-bold leading-normal text-gray-1000 lg:text-3xl">
            Access Denied
          </h1>
          <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
            You do not have permission to access this page.
            <br className="hidden xs:inline-block" />
            Please contact your site administrator to request access.
          </p>
          <Link to="/">
            <ButtonPrimary className="mt-8 h-12 px-4 xl:h-14 xl:px-6">
              <PiHouseLineBold className="mr-1.5 text-lg" />
              Back to home
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PermissionDenied;
