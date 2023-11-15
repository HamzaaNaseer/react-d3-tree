import React, {
  useCallback,
  useState,
  useRef,
  RefObject,
  useEffect,
} from "react";
import "./App.css";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import Attacker from "./assets/Attacker.svg";
import Cytomate from "./assets/CytomateLogo.svg";
import Group from "./assets/Group.svg";
import Laptop from "./assets/LaptopShield.svg";
import Router from "./assets/Router.svg";
import { Button } from "antd";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
const dummy = {
  name: "Cytomate",
  attributes: {
    icon: Cytomate,
  },
  children: [
    {
      name: "Saraab",
      attributes: {
        icon: Router,
      },
      children: [
        {
          name: "Group#1",
          attributes: {
            icon: Group,
          },
          children: [
            {
              name: "RDP",
              attributes: {
                icon: Attacker,
              },
              children: [],
            },
          ],
        },
        {
          name: "VM-98989-1",
          attributes: {
            icon: Group,
          },
          children: [
            {
              name: "SSH",
              attributes: {
                icon: Attacker,
              },
              children: [],
            },
            {
              name: "SMB",
              attributes: {
                icon: Laptop,
              },
              children: [],
            },
          ],
        },
        {
          name: "mas",
          attributes: {
            icon: Group,
          },
          children: [],
        },
        {
          name: "hello",
          attributes: {
            icon: Group,
          },
          children: [],
        },
      ],
    },
  ],
};
function App() {
  const renderForeignObjectNode = (
    d3: CustomNodeElementProps,
    foreignObjectProps: any
  ) => (
    <g>
      <image
        href={(d3?.nodeDatum?.attributes?.icon as string) || Attacker}
        height={50}
        width={50}
        x={-50}
        y={-30}
        onClick={d3.toggleNode}
      />
      <foreignObject {...foreignObjectProps} x={10} y={-30}>
        {d3?.nodeDatum?.attributes?.icon === Laptop && (
          <>
            <Button icon={<PlayCircleFilled />} />
            <Button icon={<PauseCircleFilled />} />
          </>
        )}
      </foreignObject>
    </g>
  );
  const nodeSize = { x: 100, y: 100 };

  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const onContainerResize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y };

  useEffect(() => {
    // Call the resize callback when the component mounts
    onContainerResize();

    // Attach a resize event listener to the window
    window.addEventListener("resize", onContainerResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", onContainerResize);
    };
  }, [onContainerResize]);

  return (
    // treee will take the height and width of it's parent
    <div
      style={{ width: "100vw", height: "100vh", border: "1px solid black" }}
      ref={containerRef}
    >
      <Tree
        data={dummy}
        translate={translate}
        orientation="vertical"
        initialDepth={3}
        nodeSize={nodeSize}
        separation={{ siblings: 2, nonSiblings: 2 }}
        enableLegacyTransitions={true}
        renderCustomNodeElement={(rd3NodeProps: CustomNodeElementProps) =>
          renderForeignObjectNode(rd3NodeProps, foreignObjectProps)
        }
        pathFunc={"diagonal"}
      ></Tree>
    </div>
  );
}

export default App;
