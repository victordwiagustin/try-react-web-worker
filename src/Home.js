import React, { useEffect } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() => import("./worker"));

function Home() {
  const worker = useWorker(createWorker);
  const [message, setMessage] = React.useState(null);
  const [imageStr, setImageStr] = React.useState("");

  const compRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!
      const webWorkerMessage = await worker.hello("Tobi");
      setMessage(webWorkerMessage);
    })();
  }, [worker]);

  useEffect(() => {
    (async () => {
      const webWorkerMessage = await worker.getImage(compRef.current);
      setImageStr(webWorkerMessage);
    })();
  }, [worker, compRef]);

  return (
    <div ref={compRef}>
      <div title="Home">{message}</div>
      <textarea style={{ width: 500, height: 200 }} value={imageStr}></textarea>
    </div>
  );
}

export default Home;
