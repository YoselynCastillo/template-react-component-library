import { useEffect, useState } from "react";
import classnames from "classnames";
import "./SaveCarButton.scss";
import CircularProgress from "../../../CircularProgress/CircularProgress";
import React from "react";

const SaveCarButton = ({
  stockNumber,
  isFavorite,
  onFavorite,
  onUnfavorite,
}: any) => {
  const [savingUnsaving, setSavingUnsaving] = useState(false);

  const onFavoriteClick = () => {
    setSavingUnsaving(true);
    if (isFavorite) {
      onUnfavorite({ stockNumber: stockNumber });
    } else {
      onFavorite(stockNumber);
    }
  };

  useEffect(() => {
    if (savingUnsaving) {
      setSavingUnsaving(false);
    }
  }, [isFavorite]);

  return (
    <button
      className={classnames("sc--save-car-button", {
        "sc--save-car-button--saved": isFavorite,
      })}
      onClick={onFavoriteClick}
      aria-label="Save this car"
      data-clickprops={`Element type: Car Tile Save Car,StockNumber: ${stockNumber},Is selected: ${isFavorite}`}
      data-testid={"favorite-button"}
    >
      {savingUnsaving ? ( <></>
        // <CircularProgress className={undefined} />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className="sc--save-car-button--heart"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};

export default SaveCarButton;
