import React from "react";

const Page = ({
  content,
  pageNumber,
}: {
  content: string;
  pageNumber: number;
}) => {
  return (
    <div className="page">
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="page-number">{pageNumber}</div>
    </div>
  );
};

export default Page;
