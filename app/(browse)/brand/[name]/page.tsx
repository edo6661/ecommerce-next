import React from "react";

const page = ({ params }: { params: { name: string } }) => {
  return (
    <section className="container py-4">
      <h2>{params.name}</h2>
    </section>
  );
};

export default page;
