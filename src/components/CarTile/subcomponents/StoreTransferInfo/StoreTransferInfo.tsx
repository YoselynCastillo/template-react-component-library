import React from "react";
import { memo } from "react";
import { IStoreTransferInfo } from "../types";
import "./StoreTransferInfo.scss";

const StoreTransferInfo = ({ transferText }: IStoreTransferInfo) => {
  return (
    <p className="sc--store-transfer-info kmx-typography--fine-print">
      <span className="sc--store-transfer-info--transfer">
        &#8288;{transferText}
      </span>
    </p>
  );
};

export default memo(StoreTransferInfo);
