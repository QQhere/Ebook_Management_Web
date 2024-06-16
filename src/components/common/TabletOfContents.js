import React from "react";
import Chapter from "./Chapter";

const TabletOfContents = (props) => {
  return (
    <div className="listcolumn">
      {props.data?.map((item, index) => {
        return (
          <Chapter
            data={item}
            type={props.type}
            bookId={props.bookId}
          ></Chapter>
        );
      })}
    </div>
  );
};

export default TabletOfContents;
