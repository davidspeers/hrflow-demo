import profilePicture from "@assets/david-speers-profile-photo.png";

function About() {
  return (
    <div className="flex flex-grow bg-gray-50">
      <div className="container mx-auto flex flex-col justify-center space-y-8 px-4 py-8 text-center lg:px-8 lg:py-32 xl:max-w-7xl">
        <img
          src={profilePicture}
          alt="Profile picture of David Speers"
          className="mx-auto h-24 w-24 rounded-full"
        />
        <h2 className="mb-4 text-4xl font-black">
          Hi, I&rsquo;m David Speers 👋
        </h2>
        <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-800 lg:w-2/3">
          Welcome to my demo for HrFlow.ai&rsquo;s API.
          <br />
          You can find the source code on{" "}
          <a
            href="https://github.com/davidspeers/hrflow-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            GitHub
          </a>{" "}
          and my resumé on{" "}
          <a
            href="https://davidspeers.notion.site/David-Speers-Curriculum-Vitae-e394325abc6d48489c70eee8aac3dbc4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Notion
          </a>
          .
        </h3>
      </div>
    </div>
  );
}

export default About;
