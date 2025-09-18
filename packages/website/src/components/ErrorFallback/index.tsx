import Button from "@mui/material/Button";

export default function ErrorFallback() {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">エラーが発生しました</h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        更新
      </Button>
    </div>
  );
};
