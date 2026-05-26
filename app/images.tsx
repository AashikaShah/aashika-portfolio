import Image from "next/image";

// Then anywhere in your JSX:
<Image
  src="/images/melcher-lab.jpg"
  alt="Melcher Lab fieldwork"
  width={600}
  height={400}
  style={{ borderRadius: 16, objectFit: "cover" }}
/>