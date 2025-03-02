import CountingPage from "../CountingPage/CountingPage";

export default function WelcomeText() {
  return (
    <div className="container mx-auto text-center">
      {/* Welcome Text Container */}
      <div className="bg-[#17549A] w-11/12 md:w-11/12 lg:w-10/12 xl:w-[75%] 2xl:w-7/12 min-h-20 rounded-xl flex justify-center items-center mx-auto py-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.1rem] 2xl:text-6xl font-bold text-white whitespace-nowrap px-4">
          Welcome To Career Builder
        </h1>
      </div>
      <CountingPage />

      {/* Video Section */}
      <div className="mt-10  flex flex-col lg:flex-row justify-center items-center gap-8 my-10 px-4 w-full max-w-screen-xl mx-auto">
        <div className="w-full lg:w-2/5 aspect-[16/9] rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/d4dLKSnumkU"
            title="YouTube Video Player"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full lg:w-2/5 aspect-[16/9] rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/6wIuE_kdw7E"
            title="YouTube Video Player"
            allowFullScreen
          ></iframe>
        </div>
      </div>

    </div>
  );
}