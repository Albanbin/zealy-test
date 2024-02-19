import LayoutClickable from "@/components/layout/clickable";

export default function Home() {
  return (
    <LayoutClickable>
      <h1 className="text-4xl font-bold py-12 text-center">
        Click anywhere to comment 😁
      </h1>
    </LayoutClickable>
  );
}
