import domtoimage from "dom-to-image-improved";

export function hello(name) {
  return `Hello, ${name}`;
}

function domToImageSlow(node) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const img = await domtoimage.toPng(node, { scale: 0.6 });
      resolve(img);
    }, 2000);
  });
}

export async function getImage(node) {
  console.log("node", node);
  // const image = await domtoimage.toPng(node, { scale: 0.6 });
  const image = await domToImageSlow(node);
  return image;
}
