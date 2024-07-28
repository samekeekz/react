import React from "react";
import { RootState } from "../../store";
import { unselectAll } from "../../store/slices/movieSlice.ts";
import { hideFlyout } from "../../store/slices/flyoutSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import "./Flyout.css";

const Flyout = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state: RootState) => state.flyout.visible);
  const selectedItems = useAppSelector(
    (state: RootState) => state.movies.selectedItems
  );

  const handleUnselectAll = () => {
    dispatch(unselectAll());
    dispatch(hideFlyout());
  };

  const handleDownload = () => {
    const csvRows = [];
    // Add CSV headers
    csvRows.push(["ID", "Title", "Release Date", "Poster Path"].join(","));

    selectedItems.forEach((item) => {
      csvRows.push(
        [
          item.id,
          item.name || item.original_title,
          item.release_date,
          item.poster_path,
        ].join(",")
      );
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedItems.length}_items.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!visible) return null;

  return (
    <div className="flyout">
      <p>{`${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} are selected`}</p>
      <div>
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default Flyout;
