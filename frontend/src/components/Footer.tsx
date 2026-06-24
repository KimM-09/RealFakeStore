
const Footer = () => {
  return (
    <footer className="px-6 py-6 bg-gray-100 text-gray-800">
      <div className="max-w-275 mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="m-0 text-sm font-semibold">Connect with us</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12">
              <img src="https://img.icons8.com/color/48/twitterx--v2.png" alt="twitterx--v2"/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12">
              <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram-new--v1"/>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12">
              <img src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="m-0 text-sm">
            © {new Date().getFullYear()} RealFakeStore. All rights reserved.
          </p>
          <p className="m-0 text-xs leading-6">
            This site is provided for informational purposes only. Products on this site are not real, they aren't real here anyway, and are not for sale.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <p className="m-0 text-xs leading-6">About Us</p>
            <p className="m-0 text-xs leading-6">Contact us</p>
            <p className="m-0 text-xs leading-6">Conditions of Use</p>
            <p className="m-0 text-xs leading-6">Privacy Notice</p>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
