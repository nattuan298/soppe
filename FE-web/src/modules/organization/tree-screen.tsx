import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/state/store";
import paramsSerializer from "src/lib/paramsSerializer";
import { fetchOrganizationTree } from "src/feature/organization/organization.action";
import SummaryTree from "./components/summary-tree";
import TreeView from "./components/tree-view";

export default function TreeScreen() {
  const { keyword } = useSelector((state: RootState) => state.organization);
  const [destination, setDestination] = useState<string>("");
  const [params, setParams] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const params = paramsSerializer({ memberId: keyword, destination });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [keyword, destination]);

  useEffect(() => {
    setDestination("");
    const params = paramsSerializer({ memberId: keyword });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [keyword]);

  useEffect(() => {
    dispatch(fetchOrganizationTree(params));
  }, [dispatch, params]);

  return (
    <div className="w-full">
      <SummaryTree />
      <div className="mt-5"></div>
      <TreeView destination={destination} changeDestination={setDestination} />
    </div>
  );
}
