import { Button, I } from "../common/UiPrimitives";

export default function Header({ onNewJob }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Button onClick={onNewJob}>
          <I.Plus />
          Post a Job
        </Button>
      </div>
    </header>
  );
}
