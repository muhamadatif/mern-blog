import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and JavaScript
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
