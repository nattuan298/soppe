import { useCallback, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@material-ui/core";

import { RootState } from "src/state/store";
import { ScrollToRight, ScrollToTop } from "src/components/svg";
import { Tree, TreeNode } from "src/components";
import { TreeNodeType } from "src/feature/organization/types";
import { NodeEmpty, NodeUserDetail } from "./node";
import cls from "../organization.module.css";

const createEmptyRoot = (memberId?: string, parentMemberId?: string) => {
  return { memberId, parentMemberId, child: [], memberName: "Empty" } as TreeNodeType;
};

const getChildNode = (rootTree: TreeNodeType, treeData: Array<TreeNodeType>, level: number) => {
  if (level === 6) {
    return rootTree;
  }
  const leftNode =
    (rootTree.memberId &&
      treeData?.find(
        (item) => item.parentMemberId === rootTree.memberId && item.team === "Left",
      )) ||
    createEmptyRoot(undefined, rootTree.memberId);
  const leftTree = getChildNode(leftNode, treeData, level + 1) as TreeNodeType;

  const rightNode =
    (rootTree.memberId &&
      treeData?.find(
        (item) => item.parentMemberId === rootTree.memberId && item.team === "Right",
      )) ||
    createEmptyRoot(undefined, rootTree.memberId);
  const rightTree = getChildNode(rightNode, treeData, level + 1) as TreeNodeType;

  return { ...rootTree, child: [leftTree, rightTree] };
};

const NodeUser = ({ node, isRoot }: { node: TreeNodeType; isRoot?: boolean }) => {
  if (!node.memberId) {
    return <NodeEmpty />;
  }
  return <NodeUserDetail node={node} isRoot={isRoot} />;
};

enum Destination {
  TOP = "Top",
  RIGHT = "Right",
  LEFT = "Left",
  BOTTOM = "Bottom",
}

export default function TreeView({
  destination,
  changeDestination,
}: {
  destination: string;
  changeDestination: (destination: string) => void;
}) {
  const refContainer = useRef<HTMLDivElement>(null);
  const { keyword, organizationTree, loading } = useSelector(
    (state: RootState) => state.organization,
  );
  const { userInfor } = useSelector((state: RootState) => state.user);
  const { treeData } = organizationTree;

  const rootId = useMemo(() => {
    if (keyword) {
      return keyword;
    }
    return userInfor?.memberId || "";
  }, [keyword, userInfor]);

  const rootTree = useMemo(() => {
    if (destination && treeData?.length > 0) {
      return treeData[0];
    }
    const root = treeData?.find((item) => item.memberId === rootId);
    return root || createEmptyRoot(rootId);
  }, [rootId, treeData, destination]);

  const treeFull = useMemo(() => {
    const treeViesw = getChildNode(rootTree, treeData, 1);
    return treeViesw;
  }, [rootTree, treeData]);

  useEffect(() => {
    const { current } = refContainer;
    if (current) {
      const [viewEl] = current.getElementsByTagName("ul");
      const [rootEl] = current.getElementsByTagName("li");
      current.scrollTo(rootEl.offsetWidth / 2 - viewEl.offsetWidth / 2, 0);
    }
  }, [refContainer, destination]);

  const renderNode = (node: TreeNodeType) => {
    return (
      <TreeNode key={node.memberId || uuidv4()} label={<NodeUser node={node} />}>
        {node && node?.child?.map((item: TreeNodeType) => renderNode(item))}
      </TreeNode>
    );
  };

  // const scrollToLeft = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const { current } = refContainer;
  //   if (current) {
  //     const left = current.scrollLeft;
  //     current.scrollTo(left - 100, 0);
  //   }
  // };

  // const scrollToRight = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const { current } = refContainer;
  //   if (current) {
  //     const left = current.scrollLeft;
  //     current.scrollTo(left + 100, 0);
  //   }
  // };

  // const scrollToTop = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const { current } = refContainer;
  //   if (current) {
  //     const top = current.scrollTop;
  //     const left = current.scrollLeft;
  //     current.scrollTo(left, top - 50);
  //   }
  // };

  // const scrollToBottom = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const { current } = refContainer;
  //   if (current) {
  //     const top = current.scrollTop;
  //     const left = current.scrollLeft;
  //     current.scrollTo(left, top + 50);
  //   }
  // };

  const scrollTo = useCallback(
    (to: string) => () => {
      if (destination !== to) {
        changeDestination(to);
      }
    },
    [destination, changeDestination],
  );

  const scrollToTop = scrollTo(Destination.TOP);
  const scrollToLeft = scrollTo(Destination.LEFT);
  const scrollToRight = scrollTo(Destination.RIGHT);
  const scrollToBottom = scrollTo(Destination.BOTTOM);
  const scrollToMiddle = scrollTo("");

  return (
    <div className={classNames(cls.maxWidthTreeView, "relative")}>
      <div className="absolute top-5 left-5 z-10">
        <div className="flex flex-col items-center justify-center p-1">
          <div className={classNames("cursor-pointer", cls.control)} onClick={scrollToTop}>
            <ScrollToTop />
          </div>
          <div className="my-3 flex items-center">
            <div
              className={classNames("cursor-pointer rotate-180", cls.control)}
              onClick={scrollToLeft}
            >
              <ScrollToRight />
            </div>
            <div
              className={classNames("mx-3 cursor-pointer", cls.control)}
              onClick={scrollToMiddle}
            />
            <div className={classNames("cursor-pointer", cls.control)} onClick={scrollToRight}>
              <ScrollToRight />
            </div>
          </div>
          <div
            className={classNames("cursor-pointer rotate-180", cls.control)}
            onClick={scrollToBottom}
          >
            <ScrollToTop />
          </div>
        </div>
      </div>
      {loading && (
        <div className="bg-lighterGray h-full w-full z-10 flex items-center justify-center absolute top-0 left-0 bg-opacity-75">
          <CircularProgress />
        </div>
      )}
      <div className={classNames("p-5 h-full w-full", cls.container)} ref={refContainer}>
        <Tree label={<NodeUser node={treeFull} isRoot />}>
          {treeFull.child?.map((item: TreeNodeType) => renderNode(item))}
        </Tree>
      </div>
    </div>
  );
}
