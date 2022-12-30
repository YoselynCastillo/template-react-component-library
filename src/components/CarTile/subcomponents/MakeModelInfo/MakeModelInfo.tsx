import React, { memo } from "react";
import { IMakeModelInfo } from "../types";
import "./MakeModelInfo.scss";

const MakeModelInfo = ({ href, make, model, year, trim }: IMakeModelInfo) => {
  return (
    <h3 className="sc--make-model-info kmx-typography--body-2">
      <a
        className="make-model-link kmx-list-item-link"
        href={href}
        rel="nofollow"
      >
        <span className="sc--make-model-info--year-make">
          {year} {make}
        </span>
        <span className="sc--make-model-info--model-trim">
          {model} {trim}
        </span>
      </a>
    </h3>
  );
};

export default memo(MakeModelInfo);