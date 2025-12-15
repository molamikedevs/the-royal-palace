import Spinner from "@/components/common/Loader";

const Loading = () => {
  return (
    <div className="grid items-center justify-center">
      <p>Loading account details...</p>
      <Spinner />
    </div>
  );
};

export default Loading;
