import { Button, Card, I, cn } from "../common/UiPrimitives";

export function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full max-h-[92vh] overflow-y-auto",
          wide ? "max-w-3xl" : "max-w-xl",
        )}
      >
        <Card className="shadow-2xl border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <I.X />
            </Button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </Card>
      </div>
    </div>
  );
}

export function ConfirmDelete({ job, onClose, onConfirm }) {
  return (
    <Modal open={!!job} onClose={onClose} title="Delete Job Posting">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
          <span className="text-red-500 mt-0.5">
            <I.AlertCircle />
          </span>
          <p className="text-sm text-red-800">
            Permanently delete <strong>"{job?.title}"</strong>? All applicant data will be
            lost and this cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Permanently
          </Button>
        </div>
      </div>
    </Modal>
  );
}
