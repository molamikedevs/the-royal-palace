import Spinner from "@/components/common/Loader";

const Loading = () => {
  return (
    <div className="grid items-center justify-center">
      <p>Loading suites...</p>
      <Spinner />
    </div>
  );
};

export default Loading;
