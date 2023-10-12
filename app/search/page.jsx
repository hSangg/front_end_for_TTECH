const page = ({ params, searchParams }) => {
  const { query } = searchParams;
  return <div>{query}</div>;
};

export default page;
