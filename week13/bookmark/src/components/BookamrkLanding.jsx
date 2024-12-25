import { useState } from "react";
import { ChevronDown } from "lucide-react";

const BookmarkLanding = () => {
  const [selectedFeature, setSelectedFeature] = useState("Simple Bookmarking");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { question: "What is Bookmark?", answer: "" },
    { question: "How can I request a new browser?", answer: "" },
    { question: "Is ther a mobile app?", answer: "" },
    { question: "What about other Chromium browsers", answer: "" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
              B
            </div>
            BOOKMARK
          </div>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600">
          <a href="#features">FEATURES</a>
          <a href="#download">DOWNLOAD</a>
          <a href="#faq">FAQ</a>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            LOGIN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-5xl font-bold mb-6">A Simple Bookmark Manager</h1>
          <p className="text-gray-600 mb-8">
            A clean and simple interface to organize your favourite websites.
            Open a new browser tab and see your sites load instantly. Try it for
            free.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
              Get It On Chrome
            </button>
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md">
              Get It On Firefox
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src="/api/placeholder/600/400"
            alt="Browser UI"
            className="rounded-lg"
          />
          <div className="absolute right-0 top-16 -z-10 w-3/4 h-3/4 bg-blue-600 rounded-l-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Our aim is to make it quick and easy for you to access your
              favourite websites. Your bookmarks sync between your devices so
              you can access them on the go.
            </p>
          </div>

          <div className="border-b mb-8">
            <div className="flex justify-center space-x-10">
              {["Simple Bookmarking", "Speedy Searching", "Easy Sharing"].map(
                (feature) => (
                  <button
                    key={feature}
                    className={`pb-4 relative ${
                      selectedFeature === feature
                        ? "text-gray-800 border-b-4 border-red-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    {feature}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 relative">
              <img
                src="/api/placeholder/600/400"
                alt="Feature illustration"
                className="rounded-lg"
              />
              <div className="absolute left-0 top-16 -z-10 w-3/4 h-3/4 bg-blue-600 rounded-r-full"></div>
            </div>
            <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
              <h3 className="text-2xl font-bold mb-4">Bookmark in one click</h3>
              <p className="text-gray-600 mb-6">
                Organize your bookmarks however you like. Our simple
                drag-and-drop interface gives you complete control over how you
                manage your favourite sites.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
                More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Download the extension</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              We have got more browsers in the pipeline. Please do let us know
              if you have got a favourite you would like us to prioritize.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              {
                name: "Chrome",
                version: "62",
                logo: "/api/placeholder/100/100",
              },
              {
                name: "Firefox",
                version: "55",
                logo: "/api/placeholder/100/100",
              },
              {
                name: "Opera",
                version: "46",
                logo: "/api/placeholder/100/100",
              },
            ].map((browser, index) => (
              <div
                key={browser.name}
                className={`bg-white rounded-lg shadow-lg p-8 text-center md:transform ${
                  index * 2 === 0 ? "" : `md:translate-y-${index * 2}`
                }`}
              >
                <img
                  src={browser.logo}
                  alt={browser.name}
                  className="mx-auto mb-4 w-20 h-20"
                />
                <h3 className="text-xl font-bold mb-2">
                  Add to {browser.name}
                </h3>
                <p className="text-gray-500 mb-6">
                  Minimum Version {browser.version}
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md w-full">
                  Add & Install Extension
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Here are some of our FAQs. If you have any other questions you'd
              like answered please feel free to email us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b">
                <button
                  className="w-full py-4 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="uppercase tracking-wider mb-6">
            35,000+ ALREADY JOINED
          </p>
          <h2 className="text-3xl font-bold mb-8">
            Stay up-to-date with what we are doing
          </h2>
          <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md text-gray-800"
            />
            <button className="bg-red-500 text-white px-6 py-3 rounded-md whitespace-nowrap">
              Contact Us
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookmarkLanding;
